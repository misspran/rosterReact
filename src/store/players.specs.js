import { expect } from 'chai';
import reducer from '../store/players'
import {CREATE_PLAYER} from '../store/players'


describe('players reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, [])).toEqual([])
});

it('should handle CREATE_PLAYER', () => {
    expect(
      reducer([], {
        type: types.CREATE_PLAYER,
        text: 'Run the tests'
      })
    ).toEqual([
      {
        text: 'Run the tests',
        completed: false,
        id: 0
      }
])

const initialState = [];
const action = {
   type: ‘CREATE_PLAYER’,
   data: {first_name: 'Monkey', last_name: 'Tran', handedness:'left', rating:'180000'}
};
const nextState = reducer(initialState, action);
expect(nextState).to.deep.equal([{first_name: 'Monkey', last_name: 'Tran', handedness:'left', rating:'180000'}]);
