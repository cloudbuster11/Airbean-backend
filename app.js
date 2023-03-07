const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const guestRouter = require('./routes/guestRoutes');
const menuRouter = require('./routes/menuRoutes');
const adminRouter = require('./routes/adminRoutes');
const authRouter = require('./routes/authRoutes');

const corsOptions = {
  origin: 'http://localhost:8000',
};

// 1) Middleware

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log('Hello from the middleware 🥸!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/menu', menuRouter);
app.use('/api/guest', guestRouter);
app.use('/api/test', adminRouter);
app.use('/api/user', authRouter);

module.exports = app;
