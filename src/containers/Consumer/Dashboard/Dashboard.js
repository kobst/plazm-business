import React, { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import Dashboard from "@components/Consumer/Dashboard/Dashboard";
import useStore from "@components/Consumer/useState";
import { checkBusiness, setFlagReducer } from "@reducers/businessReducer";
import { setListData } from "@reducers/listReducer";
import { fetchUserDetails, setWs } from "@reducers/userReducer";
import ValueLoader from "@utils/loader";
import "./style.css";

const DashboardContainer = ({ view, match, isBusinessOpen }) => {
  const history = useHistory();

  const { filters, filterByMostLiked: sideFilterForLikes } = useSelector(
    (state) => state.business
  );
  const user = useSelector((state) => state.user.user);

  const globalLoader = useSelector((state) => state.consumer.globalLoader);

  const dispatch = useDispatch();

  const setBusinessDetailProfile = useStore(
    (state) => state.setBusinessDetailProfile
  );
  const setDetailId = useStore((state) => state.setDetailId);
  const profile = useStore((state) => state.profile);
  const setProfile = useStore((state) => state.setProfile);
  const setSelectedTab = useStore((state) => state.setTabSelected);
  const setSelectedListId = useStore((state) => state.setSelectedListId);
  const setView = useStore((state) => state.setView);

  useEffect(() => {
    setView(view);

    if (view === "business_detail" || view === "user_detail") {
      setDetailId(match.params.id || "");
      setSelectedTab(-1);
    }

    if (view === "list_detail") {
      setSelectedListId(match.params.id || "");
      setSelectedTab(-1);
    }

    if (view === "my_feed") {
      // console.log("my feed route");
      setSelectedTab(2);
    }

    if (view === "explore") {
      // console.log("my explore route");
      setSelectedTab(1);
    }
    if (view === "list_explore") {
      // console.log("my list explore route");
      setSelectedTab(5);
    }
  }, [view]);

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
          if (res.data.userCreateAndFollowList.success) {
            dispatch(
              setListData({
                list: res.data.userCreateAndFollowList.list,
                totalList: res.data.userCreateAndFollowList.totalLists,
              })
            );
          }
        } else {
          history.push("/business");
        }
      } catch (err) {
        console.log("Error", err);
        /* if not authenticated then redirect to login consumer page */
        history.push("/consumer/login");
      }
    };
    getProfile();
  }, [dispatch]);

  useEffect(() => {
    /** find business function */
    let findBusiness = async (view) => {
      if (view === "business_detail") {
        /** to check if business exists or not */
        const response = await dispatch(
          checkBusiness({
            businessId: match.params.id,
            filters: {
              PostsByMe:
                filters.PostsByMe ||
                (!filters.Business &&
                  !filters.PostsByMe &&
                  !filters.MySubscriptions &&
                  !filters.Others),
              Business: false,
              MySubscriptions: filters.MySubscriptions || false,
              Others: filters.Others || false,
            },
            value: 0,
            ownerId: user?._id || null,
            sideFilters: { likes: sideFilterForLikes },
          })
        );
        const data = await unwrapResult(response);
        if (data.success && data.place.length) {
          /** fetch business images */
          dispatch(setFlagReducer());
          setBusinessDetailProfile(data.place[0]);
          // console.log("business data" + JSON.stringify(data.place));
        } else {
          dispatch(setFlagReducer());
          // set error business does not exist
        }
      }
    };

    if (user._id) findBusiness(view);
  }, [view, isBusinessOpen, match.params.id, dispatch, user]);

  if (profile && !globalLoader) {
    return <Dashboard view={view} />;
  }

  return (
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
      <ValueLoader />
    </div>
  );
};

export default DashboardContainer;
