const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const RateLimit = require('express-rate-limit');

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

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
});

// apply rate limiter to all requests
app.use(limiter);

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
app.use('/api/admin', adminRouter);
app.use('/api/user', authRouter);

module.exports = app;
