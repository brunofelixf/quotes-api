"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const databaseUrl_1 = require("./utils/databaseUrl");
console.log('Environment: ' + process.env.NODE_ENV);
(0, databaseUrl_1.setDatabaseUrl)();
const port = 3000;
app_1.app.listen(port, () => console.log('Server running (Port): ' + port));
//# sourceMappingURL=server.js.map