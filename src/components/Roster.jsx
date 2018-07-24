import React from 'react';
import Navbar from './Navbar';
import RosterTable from './RosterTable';
import { connect } from 'react-redux';
import Login from './Login';

const Roster = ({ isLoggedIn }) => (
  <div>
    {isLoggedIn ? 
      <div>
        <Navbar />
        <RosterTable />
      </div> : <Login /> }  
  </div>
);

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.success,
  };
};

const mapDispatch = null;


export default connect(mapState, mapDispatch)(Roster);
