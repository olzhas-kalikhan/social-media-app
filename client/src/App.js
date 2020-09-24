import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './pages/welcome/welcome';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}></Route>
        {/* <Route path="/login" component={}></Route>
        <Route path="/signup" component={}></Route> */}
      </Switch>
    </Router>
  );
}

export default App;
