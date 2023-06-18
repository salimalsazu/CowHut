import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import httpStatus from 'http-status';
import router from './app/routes';
import globalErrorHandler from './app/middlwares/globalErrorHandler';

const app: Application = express();

//cors
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All routes
app.use('/api/v1/', router);

//globalErrorHandler
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
