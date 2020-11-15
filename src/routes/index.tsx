import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import NotFound from '../pages/NotFound'
import Signup from '../pages/Signup'
import AdPage from '../pages/AdPage'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/ad/:id" exact component={AdPage} />
    <Route>
      <NotFound />
    </Route>
  </Switch>
)
export default Routes
