import axios from 'axios';
import history from '../history';

require('babel-polyfill');

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

const defaultUser = {};

export const loginUser = user => ({ type: LOGIN_USER, user });
export const logoutUser = () => ({ type: LOGOUT_USER });

export const login = (email, password) => dispatch =>
  axios.post('https://players-api.developer.alchemy.codes/api/login', { email, password })
    .then((res) => {
      localStorage.setItem('Authorization', res.data.token);
      dispatch(loginUser(res.data));
      history.push('/roster');
    })
    .catch(err =>
      console.error(err));

export const logout = (dispatch) => {
  history.push('/login');
  localStorage.removeItem('Authorization');
  dispatch(logoutUser());
};

export default function reducer(state = defaultUser, action) {
  switch (action.type) {
    case LOGIN_USER:
      return action.user;
    case LOGOUT_USER:
      return defaultUser;
    default:
      return state;
  }
}

