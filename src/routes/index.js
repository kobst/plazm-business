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
import CustomerDashboard from "../containers/Customer/Dashboard/Dashboard";
const Routes = () => (
  <Router>
    <Switch>
      <Route path="/business/login" component={Login} />
      <Route path="/customer/login" component={Login} />
      <Route
        path="/business/register"
        render={(props) => <Register userType="business" {...props} />}
      />
      <Route
        path="/customer/register"
        render={(props) => <Register userType="customer" {...props} />}
      />
      <Route
        path="/business/forgot-password/:code/:id"
        component={ForgotPassword}
      />
      <Route path="/business/forgot-password" component={ForgotPassword} />
      <Route path="/customer/forgot-password" component={ForgotPassword} />
      <Route path="/" exact component={Dashboard} />
      <Route path="/customer" exact component={CustomerDashboard} />
      <Route path="/edit-profile" component={EditProfile} />
      <Redirect exact from="/*" to="/business/login" />
    </Switch>
  </Router>
);

export default Routes;
