const router = require('express').Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const axios = require('axios');
const jwt = require('jsonwebtoken');

const CONFIG = require('dotenv').config().parsed;

// auth
router.post('/register', jsonParser, (req, res) => {

    const accessToken = req.body.accessToken;
    const googleAuthEndPoint = 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
    const url = `${googleAuthEndPoint}${accessToken}`;
    axios.get(url)
    .then((response) => {
      // token is valid
      const { email, expires_in, user_id } = response.data;
      const user = {
        email,
        expires: expires_in,
        googleId: user_id
      };
      const token = jwt.sign(user, CONFIG.JWT_SECRET);
      res.send(token);
    })
    .catch((error) => {
      // no not a real token
      res.send(error);
    });
  
  });

module.exports = router;