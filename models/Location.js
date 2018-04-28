const mongoose = require('mongoose');

function msUntilExpire() {
  const threeHours = 10800000;
  var midnight = new Date();
  midnight.setHours( 24 );
  midnight.setMinutes( 0 );
  midnight.setSeconds( 0 );
  midnight.setMilliseconds( 0 );
  return ( midnight.getTime() - new Date().getTime() ) + threeHours;
}


const Location = new mongoose.Schema({
  id: String,
  rsvpd: Array,
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: () => new Date(msUntilExpire()) }
})

module.exports = mongoose.model('Location', Location);

