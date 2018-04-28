const router = require('express').Router();
const yelpHelp = require('../services/yelpService');
const Location = require('../models/Location');
const jsonParser = require('body-parser').json();
const jwt = require('jsonwebtoken');

const CONFIG = require('dotenv').config().parsed;

// TODO: refactor to services
// TODO: handle errors in centralised way

function mergeYelpResponseWithDb(yelpResponse, foundInDb) {
  const foundMap = foundInDb.reduce((acc, curr) => {
    acc[curr.id] = Object.assign({}, curr._doc,
      { rsvpd: curr._doc.rsvpd ? curr._doc.rsvpd.length : 0 });
    return acc;
  }, {});
  return yelpResponse.map((loc) =>
    foundMap[loc.id] ? Object.assign(loc, foundMap[loc.id]) : loc);
}

router.get('/:postcode', (request, response) => {
  const postcode = request.params.postcode.replace(/\s/g, '');
  if (!postcode || postcode == null) response.status(400).send('invalid postcode');
  // can probably provide more fine grained error handling here.
  yelpHelp.getBarsByPostCode(postcode)
    .then(inArea => {
      // check db for saved locations that match nearby
      const locationIds = inArea.reduce((ids, loc) => ids.concat(loc.id), []);
      return Location.find({ 'id': { '$in': locationIds } })
      .then(found => {
        response.status(200).send(mergeYelpResponseWithDb(inArea, found))
      });
    })

    .catch(err => {
      response.status(500).send('something went wrong')
    })
});


router.post('/togglersvp', jsonParser, (request, response) => {
  const { authorization } = request.headers;
  // TODO: handle expiry
  jwt.verify(authorization, CONFIG.JWT_SECRET, function(err, decoded) {
    if(err) response.status(401).send('You need to be logged in to do that');

    const userId = decoded.googleId;
    const location = request.body.location;

    Location.findOne({ 'id': location.id })
      .then(found => {
        // create new record if doesnt exist
        if (found == null) {
          const newLoc = new Location({
            id: location.id,
            rsvpd: [ userId ]
          });
          return newLoc.save();
        }
  
        const currRsvpd = found.rsvpd;
        const indexOfUser = currRsvpd.indexOf(userId)
        if (~indexOfUser) {
          // remove user if not already rsvpd
          found.rsvpd = [...found.rsvpd.slice(0, indexOfUser), ...found.rsvpd.slice(indexOfUser + 1)];
          if (found.rsvpd.length == 0) {
            // if no more people in array delete it from db for space
            return found.remove();
          }
        } else {
          // add user if not already in there
          found.rsvpd = [...found.rsvpd, userId];
          return found.save();
        }
      })
      .then(changed => {
        const filteredChanged = Object.assign({}, changed._doc, { rsvpd: changed.rsvpd.length });
        return response.status(200).send(filteredChanged)
      })
      .catch(err => {
        debugger
        response.status(500).send('oh no!');
      });

  });


});


module.exports = router;

