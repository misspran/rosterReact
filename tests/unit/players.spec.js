import { expect } from 'chai';
import reducer from '../../src/store/players';

describe('players reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, [])).toEqual([])
});


