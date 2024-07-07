const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// Require the JSON data directly
const db = require('./db.json');

// Create a router using the loaded JSON data
const router = jsonServer.router(db);

server.use(middlewares);

// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
