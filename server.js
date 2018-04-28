const path = require('path');
const express = require('express');

const app = express();
require('./repositories/LocationDB');

// Serve front end
app.use(express.static(path.join(__dirname, 'app/build')));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const locationsRoutes = require('./routes/locations');
app.use('/api/locations', locationsRoutes);

const PORT = 8080;
const server = app.listen(PORT, function () {
  console.log(`Listening on port: ${PORT}`);
});
