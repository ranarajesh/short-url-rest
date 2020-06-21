const express = require('express');
const { json } = require('express');

const dbConnection = require('./config/db');

const app = express();

//connection to db
dbConnection();

app.use(express.json());

//routes handlers

app.use('/v1/api', require('./routes/url'));
app.use('/', require('./routes/index'));

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Url Shorten Service is running on ${PORT}`);
});
