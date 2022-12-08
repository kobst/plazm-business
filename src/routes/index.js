import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from '../containers/Login-Register/Login';
import Register from '../containers/Login-Register/Register';
import ForgotPassword from '../containers/Login-Register/Forgot-Password';
import Dashboard from '../containers/Dashboard/Dashboard';
import EditProfile from '../containers/Profile/';
import ConsumerDashboard from '../containers/Consumer/Dashboard/Dashboard';

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

      <Redirect exact from="/" to="/home" />
      <Route
        path="/home"
        exact
        render={(props) => <ConsumerDashboard view={'my_feed'} {...props} />}
      />
      <Route
        path="/explore"
        exact
        render={(props) => <ConsumerDashboard view={'explore'} {...props} />}
      />
      <Route
        path="/lists"
        exact
        render={(props) => (
          <ConsumerDashboard view={'list_explore'} {...props} />
        )}
      />

      <Redirect exact from="/" to="/home" /> 
      <Route path="/home" exact render={(props) => <ConsumerDashboard view={"my_feed"} {...props} />} />
      <Route path="/user-profile" exact render={(props) => <ConsumerDashboard view={"user_profile"} {...props} />} />
      <Route path="/u/:id" exact render={(props) => <ConsumerDashboard view={"user_profile"} {...props} />} />
      <Route path="/explore" exact render={(props) => <ConsumerDashboard view={"explore"} {...props} />} />
      <Route path="/lists" exact render={(props) => <ConsumerDashboard view={"list_explore"} {...props} />} />
     
      <Route path="/b/:id" exact render={(props) => <ConsumerDashboard view={"business_detail"} isBusinessOpen={true} isUserOpen={false} {...props} />} />
      {/* <Route path="/u/:id" exact render={(props) => <ConsumerDashboard view={"user_detail"} isUserOpen={true} isBusinessOpen={false} {...props}/>} /> */}
      <Route path="/list/:id" exact render={(props) => <ConsumerDashboard view={"list_detail"} {...props} />} />


      {/* <Route path="/b/:id" exact render={(props) => <ConsumerDashboard view={"business_detail"} {...props} />} /> */}

      <Route path="/edit-profile" component={EditProfile} />
      <Redirect exact from="/*" to="/business/login" />
    
    </Switch>
  </Router>
);

export default Routes;
