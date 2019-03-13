const express = require('express')
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');

//DB setup
mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true })
.then(() => console.log('DB connected'))
.catch (err => console.log(err))

//App setup
app.use(morgan('combined'));
//app.use(require('body-parser').urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on ', port)


