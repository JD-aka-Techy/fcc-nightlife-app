import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import { login, logOut } from '../actions/user';

// components
import GoogleLogin from 'react-google-login';


function GoogleLoginButton(login) {
  return (
    <GoogleLogin
      clientId={
        process.env.REACT_APP_GOOGLE_CLIENT_ID
      }
      buttonText="Login With Google to RSVP"
      onSuccess={login}
      onFailure={() => {}}
    />
  );
}

function LoggedIn(user, logOut) {
  return (
    <div>
      logged in as: {user.email}
      <button
        onClick={logOut}
      >
        Log out
      </button>
    </div>
  );
}

function LoginBar({ loggedIn, login, logOut, user }) {
  return !loggedIn ? GoogleLoginButton(login) : LoggedIn(user, logOut);
}

const mapStateToProps = state => ({
  loggedIn: state.user.Authorized,
  user: state.user.info
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login, logOut
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginBar);