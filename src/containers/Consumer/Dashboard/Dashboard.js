import React, { useEffect, useState } from "react";
import Dashboard from "../../../component/Consumer/Dashboard/Dashboard";
import "./style.css";
import { Auth } from "aws-amplify";
import { getUserProfile } from "../../../Api";
import history from "../../../utils/history";
import ValueLoader from "../../../utils/loader";
import { useDispatch } from "react-redux";
import {findAllUsers} from '../../../reducers/consumerReducer';
import { findAllLists } from "../../../reducers/listReducer";
import { fetchAllPlaces } from "../../../reducers/placeReducer";
import { checkBusiness } from "../../../reducers/businessReducer";
import { unwrapResult } from '@reduxjs/toolkit';

const DashboardContainer = (props) => {
  const [profile, setProfile] = useState();
  const [flag, setFlag] = useState(false);
  const [businessExists, setBusinessExists] = useState(false);
  const [businessId, setBusinessId] = useState("");
  const dispatch = useDispatch();
 

  useEffect(() => {
    /* to get loggedIn user profile */
    let getProfile = async () => {
      try {
        const value = await Auth.currentAuthenticatedUser();
        if (value.attributes["custom:type"] === "curator" || value.attributes["custom:type"] === "customer" ||  value.attributes["custom:type"] === "consumer") {
          const res = await getUserProfile(value.attributes.sub);
          if (res.data.getUser.success === true) {
            setProfile(res.data.getUser.user);
          }
          dispatch(findAllUsers())
          dispatch(findAllLists())
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
  }, [flag]);
  useEffect(() => {
    let findBusiness = async (isOpen) => {
      if (isOpen === true) {
      setBusinessId(props.match.params.id?props.match.params.id:"")
      const response =  await dispatch(checkBusiness(props.match.params.id));
      const data =  unwrapResult(response);
      if(data.success === true && data.place.length > 0){
        setBusinessExists(true)
      }
      else {
        setBusinessExists(false)
      }
    }
    };
    findBusiness(props.isBusinessOpen);
  }, [props.isBusinessOpen]);
  return profile ? (
    <Dashboard profile={profile} setFlag={setFlag} isBusinessOpen={props.isBusinessOpen} businessExists={businessExists} businessId={businessId}/>
  ) : (
    <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
      <ValueLoader height="100" width="100" />
    </div>
  );
};

export default DashboardContainer;
