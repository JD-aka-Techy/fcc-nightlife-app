const axios = require('axios');

const CONFIG = require('dotenv').config().parsed;
const YELP_GRAPH_ENDPOINT = 'https://api.yelp.com/v3/graphql';

function getBarsByPostCode(postcode) {
  const query = `
  {
    search(
      location: "${postcode}"
    ) {
        business {
          id
          name
          photos
          reviews {
            text
            rating
            time_created
            url
            user {
              name
            }
          }
        }
      }
  }
  `;
  return axios.post(YELP_GRAPH_ENDPOINT,
    { query },
    {
      headers: {
        contentType: 'application/graphql',
        Authorization: CONFIG.YELP_API_KEY
      }
    })
    .then(res => {
      return res.data.data.search.business;
    })
    .catch(res => {
      return Promise.resolve([])
    });
}


module.exports = {
  getBarsByPostCode
};