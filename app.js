const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware! 👋🏻');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
