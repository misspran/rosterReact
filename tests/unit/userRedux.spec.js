import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../../src/history';
import { expect } from 'chai';
import { login, logout } from '../../src/store/user';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = { user: {} };

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('login', () => {
    it('eventually dispatches the LOGIN_USER action', () => {
      const fakeUser = { email: 'jim@jim.com', password: 123 };
      mockAxios.onGet('https://players-api.developer.alchemy.codes/api/login').replyOnce(200, fakeUser);
      return store.dispatch(login())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('LOGIN_USER');
          expect(actions[0].user).to.be.deep.equal(fakeUser);
          expect(history.location.pathname).to.be.equal('/roster');
        });
    });
  });

  describe('logout', () => {
    it('logout: eventually dispatches the LOGOUT_USER action', () => {
      return store.dispatch(logout())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('LOGOUT_USER');
          expect(history.location.pathname).to.be.equal('/');
        });
    });
  });
});
