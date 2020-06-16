import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/login/index'
import Register from '../containers/register/index'
import ForgotPassword from '../containers/forgot-password/index'




const Routes = () => (
  <Router>
    <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Redirect exact from="/*" to="/login" />
        </Switch>
    
  </Router>
)

export default Routes