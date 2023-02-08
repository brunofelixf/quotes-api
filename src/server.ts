import { app } from './app'
import { PrismaClient } from "@prisma/client";
import { setDatabaseUrl } from './utils/databaseUrl';

console.log('Environment: ' + process.env.NODE_ENV);

export const prisma = new PrismaClient();

setDatabaseUrl();

const port = 3000;

const server = app.listen( port, () => console.log( 'Server running (Port): ' + port ) );

export { server }