const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { limiters } = require('./middleware');

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
app.use(limiters.apiLimiter);

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

app.use('/api/menu', limiters.apiLimiter, menuRouter);
app.use('/api/guest', limiters.apiLimiter, guestRouter);
app.use('/api/admin', limiters.apiLimiter, adminRouter);
app.use('/api/user', authRouter);

module.exports = app;
