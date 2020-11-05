import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PrivateRoute from './hocs/privateRoute'
import UnPrivateRoute from './hocs/unPrivateRoute'

import UserLayout from 'containers/layouts/userLayout/userLayout'

import Welcome from 'containers/pages/welcome/welcome'
import HomePage from 'containers/pages/userPages/home/homePage'
import ProfilePage from 'containers/pages/userPages/profile/profilePage'

function App() {
  return (
    <Router>
      <Switch>
        <UnPrivateRoute exact path="/" component={Welcome} />
        <UserLayout>
          <PrivateRoute path='/profile' roles={["User"]} component={ProfilePage} />
          <PrivateRoute path="/home" roles={["User", "Admin"]} component={HomePage} />
        </UserLayout>
      </Switch>


    </Router>
  );
}

export default App;
