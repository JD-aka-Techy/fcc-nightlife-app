import axios from 'axios';
import * as constants from './constants';

export const login = (res) => dispatch => {
  return axios.post('/api/auth/register', { accessToken: res.accessToken })
  .then((res) => {
    dispatch({
      type: constants.USER_LOG_IN,
      payload: { token: res.data }
    });
  })
  .catch((err) => {
    alert('log in failure');
    console.error('log in failure', err)
  });
}

export const logOut = () => ({ type: constants.USER_LOG_OUT });
  