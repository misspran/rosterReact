import { expect, assert } from 'chai';
import { creatStore } from 'redux';
import reducer, { fetchPlayers, addPlayer, deletePlayer } from '../../src/store/players';

const PLAYER = {
  first_name: 'Caleb',
  last_name: 'Smith',
  handedness: 'right',
  rating: 523,
};

const PLAYERS = [];

describe('Players Store', () => {
  describe('Action Creators', () => {
    describe('fetch', () => {
      it('returns properly formatted action', () => {
        const action = fetchPlayers(PLAYER);

        assert.equal(action.type, 'FETCH_PLAYERS');
        assert.equal(action.players, PLAYER);
      });
    });
    describe('add players', () => {
      it('returns properly formatted action', () => {
        const action = addPlayer(PLAYER);

        assert.equal(action.type, 'ADD_PLAYER');
        assert.equal(action.player, PLAYER);
      });
    });
    describe('delete players', () => {
      it('returns properly formatted action', () => {
        const action = deletePlayer(PLAYER);

        assert.equal(action.type, 'DELETE_PLAYER');
        assert.equal(action.id, PLAYER);
      });
    });
  });
});

describe('Reducers', () => {
  describe('players reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, [])).toEqual([]);
    });
  });
  describe('reduces on FETCH_PLAYERS action', () => {
    it('dispatch an action to fetch players', () => {
      const nextState = reducer([], { type: 'FETCH_PLAYERS', PLAYERS });
      assert.equal(nextState, PLAYERS);
    });
  });
  describe('reduces on ADD_PLAYERS action', () => {
    it('should dispatch an action to add player ', () => {
      const nextState = reducer([{
        first_name: 'Caleb',
        last_name: 'Smith',
        handedness: 'right',
        rating: 523,
      }], { type: 'ADD_PLAYERS', PLAYER });
      assert.equal(nextState, PLAYERS);
    });
  });
  describe('reduces on DELETE_PLAYERS action', () => {
    it('should dispatch an action to delete player ', () => {
      const nextState = reducer([], { type: 'DELETE_PLAYERS', PLAYER });
      assert.equal(nextState, PLAYERS);
    });
  });
});
