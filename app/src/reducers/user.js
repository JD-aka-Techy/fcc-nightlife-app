import * as constants from '../actions/constants';

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

const initialState = {
  Authorized: false,
  token: false,
  info: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case constants.USER_LOG_IN:
      return {
        Authorized: true,
        token: action.payload.token,
        info: parseJwt(action.payload.token)
      };
    case constants.USER_LOG_OUT:
      return initialState;
    default:
      return state;
  }
}