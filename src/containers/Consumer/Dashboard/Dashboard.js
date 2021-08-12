import React, { useEffect, useState } from "react";
import Dashboard from "../../../component/Consumer/Dashboard/Dashboard";
import "./style.css";
import { Auth } from "aws-amplify";
import history from "../../../utils/history";
import ValueLoader from "../../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBusiness,
  getBusinessImages,
} from "../../../reducers/businessReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchUserDetails, setWs } from "../../../reducers/userReducer";

const DashboardContainer = (props) => {
  const [profile, setProfile] = useState();
  const [flag, setFlag] = useState(false);
  const [businessExists, setBusinessExists] = useState();
  const [businessId, setBusinessId] = useState("");
  const filters = useSelector(state => state.business.filters)
  const user = useSelector(state => state.user.user)
  const sideFilterForLikes = useSelector(state => state.business.filterByMostLiked)
  const dispatch = useDispatch();

  useEffect(() => {
    /* to get loggedIn user profile */
    let getProfile = async () => {
      try {
        const value = await Auth.currentAuthenticatedUser();
        if (
          value.attributes["custom:type"] === "curator" ||
          value.attributes["custom:type"] === "customer" ||
          value.attributes["custom:type"] === "consumer"
        ) {
          const data = await dispatch(fetchUserDetails(value.attributes.sub));
          const res = await unwrapResult(data);
          const ws = new WebSocket(
            `${process.env.REACT_APP_WEBSOCKET}/?userId=${res.data.getUser.user._id}`
          );
          if (res.data.getUser.success === true) {
            dispatch(setWs(ws));
            setProfile(res.data.getUser.user);
          }
        } else {
          history.push("/business");
          window.location.reload();
        }
      } catch {
        /* if not authenticated then redirect to login consumer page */
        history.push("/consumer/login");
        window.location.reload();
      }
    };
    getProfile();
    setFlag(false);
  }, [flag, dispatch]);
  useEffect(() => {
    /** find business function */
    let findBusiness = async (isOpen) => {
      if (isOpen === true) {
        setBusinessId(props.match.params.id ? props.match.params.id : "");
        /** to check if business exists or not */
        const response = await dispatch(
          checkBusiness({
            businessId: props.match.params.id,
            filters: {
              Business: filters.Business? filters.Business: !filters.Business && !filters.PostsByMe && !filters.MySubscriptions &&!filters.Others ? true: false,
              PostsByMe: filters.PostsByMe? filters.PostsByMe: false,
              MySubscriptions: filters.MySubscriptions? filters.MySubscriptions: false,
              Others: filters.Others? filters.Others: false,
            },
            value: 0,
            ownerId: user? user._id: null,
            sideFilters: {likes: sideFilterForLikes}
          })
        );
        const data = await unwrapResult(response);
        if (data.success === true && data.place.length > 0) {
          /** fetch business images */
          await dispatch(getBusinessImages(props.match.params.id));
          setBusinessExists(true);
        } else {
          setBusinessExists(false);
        }
      }
    };
    findBusiness(props.isBusinessOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isBusinessOpen, props.match.params.id, dispatch]);
  return profile ? (
    <Dashboard
      profile={profile}
      setFlag={setFlag}
      isBusinessOpen={props.isBusinessOpen}
      isUserOpen={props.isUserOpen}
      businessExists={businessExists}
      businessId={props.match.params.id? businessId: null}
      userId={props.isUserOpen? props.match.params.id: null}
    />
  ) : (
    <div
      style={{
        textAlign: "center",
        margin: " 40px auto 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ValueLoader height="100" width="100" />
    </div>
  );
};

export default DashboardContainer;
