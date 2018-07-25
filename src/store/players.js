import axios from 'axios';
import history from '../history';

require('babel-polyfill');

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const CREATE_PLAYER = 'CREATE_PLAYER';
const DELETE_PLAYER = 'DELETE_PLAYER';


const fetch = players => ({ type: FETCH_PLAYERS, players });
const create = player => ({ type: CREATE_PLAYER, player });
const remove = id => ({ type: DELETE_PLAYER, id });
const intitialState = [];

export const fetchPlayers = token => (dispatch) => {
  if (token) {
    return axios({
      method: 'GET',
      url: 'https://players-api.developer.alchemy.codes/api/players',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => dispatch(fetch(res.data.players)))
      .catch(err => console.error('Unsuccesful', err));
  }
};

export const addPlayer = (player, token) => dispatch => axios({
  method: 'POST',
  url: 'https://players-api.developer.alchemy.codes/api/players',
  data: player,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '.concat(token),
  },
})
  .then(res => dispatch(create(res.data.player)))
  .catch(err => console.error('Adding player unsuccesful.', err));

export const deletePlayer = (id, token) => dispatch => axios({
  method: 'DELETE',
  url: `https://players-api.developer.alchemy.codes/api/players/${id}`,
  data: id,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: token,
  },
})
  .then((res) => {
    if (res.data.success === true) dispatch(remove(id));
  })
  .catch(err => console.error('Deleting player unsuccesful.', err));

export default function reducer(players = intitialState, action) {
  switch (action.type) {
    case FETCH_PLAYERS:
      return action.players;
    case CREATE_PLAYER:
      return [...players, action.player];
    case DELETE_PLAYER:
      return players.filter(player => player.id !== action.id);
    default:
      return players;
  }
}
