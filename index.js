var express = require('express');
var cors = require('cors')
var app = express();

require('custom-env').env(app.get('env'));

const createError = require('http-errors'),
    path = require('path'),
    bodyParser = require('body-parser'),
    bookingRoutes = require('./routes/routes');


app.use(cors())
app.use(bodyParser.json({ limit: '5mb' }))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/booking', bookingRoutes);

const port = process.env['PORT'] || 3005;
app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app