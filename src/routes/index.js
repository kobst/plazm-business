import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "../containers/Login-Register/Login";
import Register from "../containers/Login-Register/Register";
import ForgotPassword from "../containers/Login-Register/Forgot-Password";
import Dashboard from "../containers/Dashboard/Dashboard";
import EditProfile from "../containers/Profile/";
import ConsumerDashboard from "../containers/Consumer/Dashboard/Dashboard";
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/business/login" component={Login} />
      <Route path="/consumer/login" component={Login} />
      <Route
        path="/business/register"
        render={(props) => <Register userType="business" {...props} />}
      />
      <Route
        path="/consumer/register"
        render={(props) => <Register userType="consumer" {...props} />}
      />
      <Route
        path="/user/forgot-password/:code/:id"
        component={ForgotPassword}
      />
      <Route path="/user/forgot-password" component={ForgotPassword} />
      {/* <Route path="/user/forgot-password" component={ForgotPassword} /> */}
      <Route path="/business" exact component={Dashboard} />
      <Route path="/" exact component={ConsumerDashboard} />
      <Route path="/edit-profile" component={EditProfile} />
      <Redirect exact from="/*" to="/business/login" />
    </Switch>
  </Router>
);

export default Routes;
