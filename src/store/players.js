import axios from 'axios';

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const CREATE_PLAYER = 'CREATE_PLAYER';
const DELETE_PLAYER = 'DELETE_PLAYER';

const fetch = players => ({ type: FETCH_PLAYERS, players });
const create = player => ({ type: CREATE_PLAYER, player });
const remove = id => ({ type: DELETE_PLAYER, id });

export default function reducer(players = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS:
      return action.players;
    case CREATE_PLAYER:
      return [action.player, ...players];
    case DELETE_PLAYER:
      return players.filter(player => player.id !== action.id);
    default:
      return players;
  }
}

export const fetchPlayers = token => (dispatch) => {
  console.log(token);
  if (token) {
    return axios({
      method: 'GET',
      url: 'https://cors-anywhere.herokuapp.com/https://players-api.developer.alchemy.codes/api/players',
      headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })
      .then(res => dispatch(fetch(res.data)))
      .catch(err => console.error('Unsuccesful', err));
  }
};

export const addPlayer = (player, token) => dispatch => axios({
  method: 'POST',
  url: 'https://cors-anywhere.herokuapp.com/https://players-api.developer.alchemy.codes/api/players',
  data: player,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: 'Bearer '.concat(token),
  },
})
  .then((res) => {
    console.log(res.data, '<<<<<');
    dispatch(create(res.data.player));
  })
  .catch(err => console.error('Adding player unsuccesful.', err));

export const deletePlayer = (id, token) => dispatch => axios({
  method: 'DELETE',
  url: `https://cors-anywhere.herokuapp.com/https://players-api.developer.alchemy.codes/api/players/${id}`,
  data: id,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Authorization: token,
  },
})
  .then((res) => {
    console.log(res, id, '<<<<<print');
    if (res.data.success === true) dispatch(remove(id));
  })
  .catch(err => console.error('Deleting player unsuccesful.', err));
