const express = require('express');
const mongoose = require('mongoose');
const corsMiddleWare = require('./middlewares/cors');
const deviceRouter = require('./routes/devices');
const app = express();

mongoose.connect('mongodb://localhost:27017/smartHome');

app.use(corsMiddleWare);
app.use(express.json());
app.use('/devices', deviceRouter);

app.get('/', (req, res) => {
  res.send('hi world!');
})

app.listen(3005);