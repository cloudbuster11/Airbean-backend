const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
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

// Global Middleware
// Security HTTP headers
app.use(cors(corsOptions));
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP. Please try again in a hour.',
});

app.use('/api', limiter);

// Body parse. Läser data från body in i req.body. Begränsar storleken på body till 10kb.
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data sanitering mot NoSql injection. logIn {"email": "$gt": ""}
// Filtrerar bort $ och . m.m.
app.use(mongoSanitize());

// Data sanitering mot XSS. Förhindrar skadlig kod från att injeceras. Även validators i modells gör dettta.
app.use(xss());

// Förhindrar param pollution.
app.use(
  hpp({
    whitelist: ['price', 'ratingsAverage', 'userId', 'createdAt'],
  })
);

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
