import axios from 'axios';

const FETCH_PLAYERS = 'FETCH_PLAYERS';
const CREATE_PLAYER = 'CREATE_PLAYER';
const DELETE_PLAYER = 'DELETE_PLAYER';

const fetch = players => ({ type: FETCH_PLAYERS, players });
const create = player => ({ type: CREATE_PLAYER, player });
const remove = id => ({ type: DELETE_PLAYER, id });

let token = localStorage.getItem('Authorization');
token = 'Bearer '.concat(token);
const config = { 'Content-Type': 'application/json', Authorization: token };

export default function reducer(players = [], action) {
  switch (action.type) {
    case FETCH_PLAYERS:
      return action.players;
    case CREATE_PLAYER:
      return [action.players, ...players];
    case DELETE_PLAYER:
      return players.filter(player => player.id !== action.id);
    default:
      return players;
  }
}

export const fetchPlayers = () => async (dispatch) => {
  let res;
  try { 
    let instance = axios.create();
    instance.defaults.headers.common = {};
    instance.defaults.headers.common['Authorization'] = token;
    instance.defaults.headers.post['Content-Type'] = 'application/json';
    instance.defaults.headers.get['Content-Type'] = 'application/json';
    await console.log(instance.defaults.headers)
    await instance.get('https://players-api.developer.alchemy.codes/api/players');
    await console.log(res.data, 'data');
    //dispatch(fetch(res.data));
  } catch (err) {
    console.error('Fetching players unsuccesful.', err);
  }

};

// export const fetchPlayers  = () => (dispatch) => {
//   return axios({
//     method: 'get',
//     url: 'https://players-api.developer.alchemy.codes/api/players',
//     headers: {
//       Accept: 'application/json',
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type': 'application/json',
//       Authorization: token,
//     },
//   })
//     .then(res => dispatch(fetch(res.data)))
//     .catch(err => console.error("Unsuccesful", err));
// };

export const addPlayer = player => async (dispatch) => {
  let res;
  try {
    await axios.post('https://players-api.developer.alchemy.codes/api/players', player, config);
    dispatch(create(res.data));
  } catch (err) {
    console.error(`Adding player: ${player} unsuccesful.`, err);
  }
};

export const deletePlayer = id => async (dispatch) => {
  let res;
  try {
    await axios.delete(`https://players-api.developer.alchemy.codes/api/players/${id}`, id, config);
    dispatch(remove(res.data));
  } catch (err) {
    console.error('deleting player unsuccesful.', err);
  }
};