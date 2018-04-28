import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

// actions
import { getLocations } from '../actions/locations';

// components
import LoginBar from '../components/LoginBar';
import SearchBar from '../components/SearchBar';
import Location from '../components/Location/';

// no longer needs to be Component
class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { results, toggleRSVP, getLocations } = this.props;
    return (
      <div>
        <div style={{ paddingBottom: '1rem' }}>
          
          <SearchBar onSearch={getLocations} searchBarPlaceHolder="Enter post code eg: WA3 3UL"/>

          <LoginBar />

        </div>

        <div
          className="location-list"
        >
          {
            results.map(location => (
              <Location location={location}/>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  results: state.locations.results
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getLocations
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
