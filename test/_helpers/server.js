/* eslint-disable no-console */
// Server
const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const serverSetup = () => {
  // Server Setup
  const server = express();
  server.set('port', process.env.PORT || 8123);
  server.set('ip', process.env.IP || '127.0.0.1');

  // Setup sessions.
  server.use(session({
    secret: 'auth-simple',
    name: 'session',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
      sameSite: true,
      secure: true,
    },
    store: new MemoryStore({
      checkPeriod: 3600000, // prune expired entries every hour
    }),
  }));

  // process.title (for stopping after)
  if (process.argv[2] && process.argv[2] !== 'undefined') {
    console.log('Setting process.title:', typeof process.argv[2], process.argv[2]);
    // eslint-disable-next-line prefer-destructuring
    process.title = process.argv[2];
  }

  // Is this a require()?
  if (require.main === module) {
    console.log('Starting test server...');
    server.listen(server.get('port'), server.get('ip'));
  }

  return server;
};

module.exports = { serverSetup };
