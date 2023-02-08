import express from 'express';
import { routerApp } from './routes/routes';

const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( '', routerApp );

export { app };