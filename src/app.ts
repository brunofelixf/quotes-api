import 'express-async-errors';
import express, { Application } from 'express';
import { routerApp } from './routes/routes';
import { errorMiddleware } from './middlewares/errorHandling.middleware';

const app: Application = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( '', routerApp );
app.use( errorMiddleware );

export { app };