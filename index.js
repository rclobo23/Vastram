
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').set('debug', true);
const path = require('path');
require('dotenv').config();
require('./services/passport.js')
const compression = require('compression')
const config = require('./config');

const env = process.env.NODE_ENV || 'development';

mongoose.connect(env === 'development' ? config.DB_URI_DEV : config.DB_URI, {useUnifiedTopology: true, useNewUrlParser: true})

const app = express()
app.use(compression())

env !== 'development' && app.use(express.static(path.join(__dirname, 'client/build')));


env === 'development' && app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api', require('./routes/router'))
app.use('/mail', require('./routes/mailRouter'))

env !== 'development' && app.get('*', (req, res) => {
  res.set('Cache-Control', 'public, max-age="31557600"') //onji varsha 
  res.header('Cache-Control', 'public, max-age="31557600"') //onji varsha 
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(process.env.PORT || 5000)
