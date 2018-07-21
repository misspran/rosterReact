import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../store';
import { Menu, Image } from 'semantic-ui-react';

const Navbar = ({ handleClick, userName }) => (
  <Menu size="large" color="violet" inverted secondary>
    <Menu.Item>
      <Image src="https://image.flaticon.com/icons/png/128/199/199780.png" style={{ height: '40px', width: '40px' }} />
    </Menu.Item>
    <Menu.Item name="title">
       Welcome back { userName }, time to roster it up!
    </Menu.Item>
    <Menu.Menu position="right">
      <Menu.Item
        name="logout"
        onClick={handleClick}
      />
    </Menu.Menu>
  </Menu>
);

const mapState = (state) => {
  return {
    userName: state.user.user.first_name,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);