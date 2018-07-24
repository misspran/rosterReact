import axios from 'axios';
import { login } from '../store';
import history from '../history';

const CREATE_USER = 'CREATE_USER';

const create = user => ({ type: CREATE_USER, user });

export default function reducer(users = [], action) {
  switch (action.type) {
    case CREATE_USER:
      return [action.user, ...users];
    default:
      return users;
  }
}

export const createUser = user => async (dispatch) => {
  let res;
  try {
    await axios.post('https://players-api.developer.alchemy.codes/api/user', user);
    dispatch(create(res.data));  
  } catch (err) {
    console.error(`Creating user: ${user} unsuccesful`, err);
  }
};
