import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import { toggleRSVP } from '../../actions/locations';

// components
import LocationReview from './Review';
import RatingStars from '../RatingStars';


class Location extends Component {

  constructor(props) {
    super(props);
  }

  renderRVSPButton() {
    const { loggedin, location, toggleRSVP } = this.props;
    const rsvpd = location.rsvpd || 0;
    let text;
    if (!rsvpd) {
      text = `${loggedin ? 'B' : 'Log in to b'}e the first to RSVP`
    } else {
      const cta = loggedin ? 'Click to join them' : 'Log in to join them';
      const rsvpdText = rsvpd > 1 ? 'people have RSVP\'d.' : 'person has RSVP\'d.';
      text = `${rsvpd} ${rsvpdText} ${cta}`;
    }

    return (
      <button
        disabled={!loggedin}
        onClick={() => toggleRSVP(location)}
      >
        {text}
      </button>
    );
  }

  renderLocationImage() {
    const photo = this.props.location.photos[0];
    let styles = { backgroundImage: `url(${photo})` };
    if (photo.toLowerCase().includes('none')) {
      styles = { background: 'teal' };
    }
    return (
      <div
        className="location__image"
        style={styles}
      >
      </div>
    );
  }

  render() {
    const { toggleRSVP, location } = this.props;
    const reviewStats = location.reviews.reduce((result, review) => ({
      count: result.count + 1,
      total: result.total + review.rating
    }), { count: 0, total: 0 });

    return (
      <div className="location">

        {this.renderLocationImage()}

        <div>
          {location.name} -
          <RatingStars
            rating={Math.floor(reviewStats.total / reviewStats.count)}
          />
          ({reviewStats.count})

          <LocationReview
            review={location.reviews[0]}
          />

          {this.renderRVSPButton()}

        </div>




      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedin: state.user.Authorized
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleRSVP }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Location);
