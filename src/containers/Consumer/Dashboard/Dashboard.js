import React, { useEffect, useState } from "react";
import Dashboard from "../../../component/Consumer/Dashboard/Dashboard";
import "./style.css";
import { Auth } from "aws-amplify";
import history from "../../../utils/history";
import ValueLoader from "../../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import {
  checkBusiness,
  setFlagReducer,
} from "../../../reducers/businessReducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchUserDetails, setWs } from "../../../reducers/userReducer";
import useStore from "../../../component/Consumer/useState";
// import BuisinessProfileDetails from "../../../component/Consumer/BuisinessView/BuisinessProfileDetails";


const DashboardContainer = (props) => {

  const [businessExists, setBusinessExists] = useState(false);

  const filters = useSelector((state) => state.business.filters);
  const user = useSelector((state) => state.user.user);
  const sideFilterForLikes = useSelector(
    (state) => state.business.filterByMostLiked
  );
  const globalLoader = useSelector((state) => state.consumer.globalLoader);


  const dispatch = useDispatch();
  const [businessId, setBusinessId] = useState("");

  const businessDetailProfile = useStore((state) => state.businessDetailProfile)
  const setBusinessDetailProfile = useStore((state) => state.setBusinessDetailProfile)
  const detailId = useStore((state) => state.detailId)
  const setDetailId = useStore((state) => state.setDetailId)
  const profile = useStore((state) => state.profile)
  const setProfile = useStore((state) => state.setProfile)
  const setSelectedTab = useStore((state) => state.setTabSelected)
  const setSelectedListId = useStore((state) => state.setSelectedListId)
  const view = useStore((state)=> state.view)
  const setView = useStore((state)=> state.setView)

  
  // const [profile, setProfile] = useState();
  const [flag, setFlag] = useState(false);



  useEffect(() => {

    setView(props.view)
    
    if (props.view === "business_detail" || props.view === "user_detail" ) {
      setDetailId(props.match.params.id ? props.match.params.id : "");
      setSelectedTab(-1)
    }

    if (props.view === "list_detail") {
      setSelectedListId(props.match.params.id ? props.match.params.id : "")
      setSelectedTab(-1)
    }

    if (props.view === "my_feed") {
        console.log("my feed route")
        setSelectedTab(2)
      }

    if (props.view === "explore") {
        console.log("my explore route")
        setSelectedTab(1)
      }
    if (props.view === "list_explore") {
       console.log("my list explore route")
        setSelectedTab(5)
      }
  },[props.view])


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
          console.log("fetching user details")
          console.log(value.attributes)
          const data = await dispatch(fetchUserDetails(value.attributes.sub));
          const res = await unwrapResult(data);
          const ws = new WebSocket(
            `${process.env.REACT_APP_WEBSOCKET}/?userId=${res.data.getUser.user._id}`
          );
          if (res.data.getUser.success === true) {
            console.log("setting user")
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
    // let findBusiness = async (isOpen) => {
    //   if (isOpen === true) {
    let findBusiness = async (view) => {
      if (view === "business_detail") {
        // setBusinessId(props.match.params.id ? props.match.params.id : "");
        /** to check if business exists or not */
        const response = await dispatch(
          checkBusiness({
            businessId: props.match.params.id,
            filters: {
              PostsByMe: filters.PostsByMe
                ? filters.PostsByMe
                : !filters.Business &&
                  !filters.PostsByMe &&
                  !filters.MySubscriptions &&
                  !filters.Others
                ? true
                : false,
              Business: false,
              MySubscriptions: filters.MySubscriptions
                ? filters.MySubscriptions
                : false,
              Others: filters.Others ? filters.Others : false,
            },
            value: 0,
            ownerId: user ? user._id : null,
            sideFilters: { likes: sideFilterForLikes },
          })
        );
        const data = await unwrapResult(response);
        if (data.success === true && data.place.length > 0) {
          /** fetch business images */
          dispatch(setFlagReducer());
          setBusinessDetailProfile(data.place[0])
          setBusinessExists(true);
          console.log("business data" + JSON.stringify(data.place))
        } else {
          dispatch(setFlagReducer());
          setBusinessExists(false);
          // set error business does not exist
        }
      }
    };

    // if (user._id) findBusiness(props.isBusinessOpen);
    if (user._id) findBusiness(props.view);

  }, [props.view, props.isBusinessOpen, props.match.params.id, dispatch, user]);

  return profile && !globalLoader ? (
    <Dashboard view={props.view}/>
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


{/* <Dashboard
// profile={profile}
// setFlag={setFlag}
// isBusinessOpen={props.isBusinessOpen}
// isUserOpen={props.isUserOpen}
// businessExists={businessExists}
// businessId={props.match.params.id ? businessId : null}
// userId={props.isUserOpen ? props.match.params.id : null}
// listId={props.isListOpen ? props.match.params.id : null}
// detailId={detailId}
view={props.view}

/> */}