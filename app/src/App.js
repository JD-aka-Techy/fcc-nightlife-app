import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import './css/main.css';

// components
import { Switch, Route } from 'react-router'

// components

// pages
import HomePage from './pages/HomePage';

function App({ loggedIn }) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.user.Authorized
})

export default withRouter(connect(mapStateToProps, null)(App));
