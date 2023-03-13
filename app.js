const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();
const { AppError } = require('./utils');

const globalErrorHandler = require('./controllers/errorController');
const menuRouter = require('./routes/menuRoutes');
const guestRouter = require('./routes/guestRoutes');
const signRouter = require('./routes/signRoutes');
const adminRouter = require('./routes/adminRoutes');
const userRouter = require('./routes/userRoutes');

const corsOptions = {
  origin: 'http://localhost:8000',
};

// 1 Global Middleware

app.use(cors(corsOptions));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in a hour.',
});

app.use('/api', limiter);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/menu', menuRouter);
app.use('/api/guest', guestRouter);
app.use('/api/sign', signRouter);
app.use('/api/auth/admin', adminRouter);
app.use('/api/auth/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
