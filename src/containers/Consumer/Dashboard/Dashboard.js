import React, { useEffect, useState } from "react";
import Dashboard from "../../../component/Consumer/Dashboard/Dashboard";
import "./style.css";
import { Auth } from "aws-amplify";
import history from "../../../utils/history";
import ValueLoader from "../../../utils/loader";
import { useDispatch } from "react-redux";
import { fetchAllPlaces } from "../../../reducers/placeReducer";
import { checkBusiness, getBusinessImages } from "../../../reducers/businessReducer";
import { unwrapResult } from '@reduxjs/toolkit';
import { fetchUserDetails,setWs } from "../../../reducers/userReducer";


const DashboardContainer = (props) => {
  const [profile, setProfile] = useState();
  const [flag, setFlag] = useState(false);
  const [businessExists, setBusinessExists] = useState();
  const [businessId, setBusinessId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    /* to get loggedIn user profile */
    let getProfile = async () => {
      try {
        const value = await Auth.currentAuthenticatedUser();
        if (value.attributes["custom:type"] === "curator" || value.attributes["custom:type"] === "customer" ||  value.attributes["custom:type"] === "consumer") {
          const data = await dispatch(fetchUserDetails(value.attributes.sub));
          const res = await unwrapResult(data)
          const ws = new WebSocket(`${process.env.REACT_APP_WEBSOCKET}/?userId=${res.data.getUser.user._id}`)
          if (res.data.getUser.success === true) {
            dispatch(setWs(ws))
            setProfile(res.data.getUser.user);
          }
          dispatch(fetchAllPlaces())
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
  }, [flag,dispatch]);
  useEffect(() => {
    /** find business function */
    let findBusiness = async (isOpen) => {
      if (isOpen === true) {
      setBusinessId(props.match.params.id?props.match.params.id:"")
      /** to check if business exists or not */
      const response =  await dispatch(checkBusiness({businessId:props.match.params.id,filters:{Business: true, PostsByMe: false, MySubscriptions:false}, value:0}));
      const data =  await unwrapResult(response);
      if(data.success === true && data.place.length > 0){
        /** fetch business images */
        await dispatch(getBusinessImages(props.match.params.id))
        setBusinessExists(true)
      }
      else {
        setBusinessExists(false)
      }
    }
    };
    findBusiness(props.isBusinessOpen);
  }, [props.isBusinessOpen,props.match.params.id,dispatch]);
  return profile ? (
    <Dashboard profile={profile} setFlag={setFlag} isBusinessOpen={props.isBusinessOpen} businessExists={businessExists} businessId={businessId}/>
  ) : (
    <div style={{ textAlign: "center", margin: " 40px auto 0", display: "flex", justifyContent: "center", alignItems: "center", height:"100%" }}>
      <ValueLoader height="100" width="100" />
    </div>
  );
};

export default DashboardContainer;
