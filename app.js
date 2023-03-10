const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const toursRouter = require('./routes/tourRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development nodemon server.js') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

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
