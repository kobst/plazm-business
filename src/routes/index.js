import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/login/index'
import Register from '../containers/register/index'
import ForgotPassword from '../containers/forgot-password/index'




const Routes = () => (
  <Router>
    <Switch>
          <Route path="/business/login" component={Login} />
          <Route path="/curator/login" component={Login} />
          <Route path="/business/register" component={Register} />
          <Route path="/curator/register" component={Register} />
          <Route path="/business/forgot-password" component={ForgotPassword} />
          <Route path="/curator/forgot-password" component={ForgotPassword} />
          <Redirect exact from="/*" to="/business/login" />
        </Switch>
    
  </Router>
)

export default Routes