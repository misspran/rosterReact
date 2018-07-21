import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Roster from './Roster';
import AddPlayer from './AddPlayer';

const Routes = () => (
  <main>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/home" component={Home} />
    <Route path="/roster" component={Roster} />
    <Route path="/player/new" component={AddPlayer} />
  </main>
);

export default Routes;
