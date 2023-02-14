import { app } from './app'
import { setDatabaseUrl } from './utils/databaseUrl';

console.log('Environment: ' + process.env.NODE_ENV);

setDatabaseUrl();

const port = 3000;

app.listen( port, () => console.log( 'Server running (Port): ' + port ) );
