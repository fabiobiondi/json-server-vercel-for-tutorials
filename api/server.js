const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');

// Require the JSON data directly
const db = require('./db.json');

// See https://github.com/typicode/json-server#module
const server = jsonServer.create();

// Uncomment to allow write operations
const filePath = path.join('db.json');
const data = fs.readFileSync(filePath, 'utf-8');

// Comment out to allow write operations
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    // '/todos/*': '/$1',
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Export the Server API
module.exports = server;
