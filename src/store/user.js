import axios from 'axios';
import history from '../history';

require('babel-polyfill');

const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

const defaultUser = {};

const loginUser = user => ({ type: LOGIN_USER, user });
const logoutUser = () => ({ type: LOGOUT_USER });

export const login = (email, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post('https://players-api.developer.alchemy.codes/api/login', { email, password });
    await localStorage.setItem('Authorization', res.data.token);
    await dispatch(loginUser(res.data));
    history.push('/roster');
  } catch (err) {
    return dispatch(loginUser({ error: err }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await history.push('/');
    localStorage.removeItem('Authorization');
    dispatch(logoutUser());
  } catch (err) {
    console.error(err);
  }
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

