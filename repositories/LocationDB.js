// mongoose
const CONFIG = require('dotenv').config().parsed;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(CONFIG.DB_CONNECTION_STRING);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.error.bind(console, `connected successfully at : ${CONFIG.DB_CONNECTION_STRING}`));

module.exports = db;