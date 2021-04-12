import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import PrivateRoute from './hocs/privateRoute'
import UnPrivateRoute from './hocs/unPrivateRoute'

import UserLayout from 'containers/layouts/UserLayout'

import Welcome from 'containers/pages/Welcome'
import HomePage from 'containers/pages/userPages/Home'
import ProfilePage from 'containers/pages/userPages/Profile'
import FriendsPage from 'containers/pages/userPages/Friends'

function App() {
  return (
    <Router>
      <Switch>
        <UnPrivateRoute exact path="/" component={Welcome} />
        <UserLayout>
          <PrivateRoute path='/profile' roles={["User"]} component={ProfilePage} />
          <PrivateRoute path="/home" roles={["User", "Admin"]} component={HomePage} />
          <PrivateRoute path="/friends" roles={["User"]} component={FriendsPage} />
        </UserLayout>
      </Switch>


    </Router>
  );
}

export default App;
