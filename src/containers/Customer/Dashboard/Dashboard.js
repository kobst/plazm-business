import React, { useEffect, useState } from "react";
import Dashboard from "../../../component/Customer/Dashboard/Dashboard";
import "./style.css";
import { Auth } from "aws-amplify";
import { getUserProfile } from "../../../Api";
import history from "../../../utils/history";
import ValueLoader from "../../../utils/loader";

const DashboardContainer = (props) => {
  const [profile, setProfile] = useState();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    /* to get loggedIn user profile */
    let getProfile = async () => {
      try {
        const value = await Auth.currentAuthenticatedUser();
        if (value.attributes["custom:type"] === "curator" || value.attributes["custom:type"] === "customer") {
          const res = await getUserProfile(value.attributes.sub);
          if (res.data.getUser.success === true) {
            setProfile(res.data.getUser.user);
          }
        } else {
          history.push("/");
          window.location.reload();
        }
      } catch {
        /* if not authenticated then redirect to login customer page */
        history.push("/customer/login");
        window.location.reload();
      }
    };
    getProfile();
    setFlag(false);
  }, [flag]);
  return profile ? (
    <Dashboard profile={profile} setFlag={setFlag} />
  ) : (
    <div style={{ textAlign: "center", margin: " 40px auto 0" }}>
      <ValueLoader height="100" width="100" />
    </div>
  );
};

export default DashboardContainer;