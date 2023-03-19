const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const { AppError } = require('./utils');
const globalErrorHandler = require('./controllers/errorController');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const orderRouter = require('./routes/orderRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.enable('trust proxy');

// Globala Middleware
// Security HTTP headers
app.use(cors());

app.options('*', cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(helmet());

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
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/orders', orderRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
