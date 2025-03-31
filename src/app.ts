import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import rateLimit from 'express-rate-limit';
import routes from './routes';
// import errorHandler from './middlewares/error-handler.middleware';
// import requestLogger from './middlewares/request-logger.middleware';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors());

// Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100 // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Parsing Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logging
// app.use(requestLogger);

// Routes
app.use('/api', routes);

// // Global Error Handler
// app.use(errorHandler);

export default app;