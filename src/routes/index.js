import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/Login-Register/Login'
import Register from '../containers/Login-Register/Register'
import ForgotPassword from '../containers/Login-Register/Forgot-Password'
import Dashboard from '../containers/Dashboard/Dashboard'
import EditProfile from '../containers/Profile/'



const Routes = () => (
  <Router>
    <Switch>
          <Route path="/business/login" component={Login} />
          <Route path="/curator/login" component={Login} />
          <Route path="/business/register" component={Register} />
          <Route path="/curator/register" component={Register} />
          <Route path="/business/forgot-password" component={ForgotPassword} />
          <Route path="/curator/forgot-password" component={ForgotPassword} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/edit-profile" component={EditProfile} />
          <Redirect exact from="/*" to="/business/login" />
      </Switch>
    
  </Router>
)

export default Routes