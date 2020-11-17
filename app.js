const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const errorRoutes = require('./routes/error');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', userRoutes);
app.use('/', cardsRoutes);
app.use('/', errorRoutes);

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
