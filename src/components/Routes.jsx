import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Roster from './Roster';
import AddPlayer from './AddPlayer';
import { fetchPlayers } from '../store';


class Routes extends React.Component {
  componentDidMount() {
    if (localStorage.Authorization) {
      const token = 'Bearer '.concat(localStorage.Authorization);
      this.props.fetchPlayers(token);
    }
  }
  render() {
    return (
      <main>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/roster" component={Roster} />
        <Route path="/player/new" component={AddPlayer} />
      </main>);
  }
}

const mapState = null;

const mapDispatch = { fetchPlayers };

export default withRouter(connect(mapState, mapDispatch)(Routes));
