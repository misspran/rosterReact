import React from 'react';
import Navbar from './Navbar';
import Roster from './Roster';
import { connect } from 'react-redux';
import Login from './Login';

const Home = ({isLoggedIn}) =>  (
  <div>
    {isLoggedIn ? 
      <div>
        <Navbar />
        <Roster />
      </div> : <Login /> }  
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.success,
  };
};

const mapDispatch = null;


export default connect(mapState, mapDispatch)(Home);
