import axios from 'axios';
import * as constants from './constants';

const jwtSecret = 'mysecretjwttokenythingy';


export const getLocations = input => dispatch => {
  const searchTerm = input.replace(/\s/g, '').toLowerCase();
  return axios.get(`/api/locations/${searchTerm}`)
    .then(res => dispatch({
      type: constants.REPLACE_LOCATIONS,
      payload: {
        results: res.data,
        searchTerm
      }
    })
  );
}


export const toggleRSVP = location => (dispatch, getState) => {
  const { token } = getState().user;
  return axios.post('/api/locations/togglersvp',
    { location },
    { headers: { Authorization: token } }
  )
  .then((res) => {
    dispatch({
      type: constants.UPDATE_LOCATIONS,
      payload: {
        results: [res.data]
      }
    });
  })
  .catch((err) => {
    console.error('failed to grab data', err)
  });
}

