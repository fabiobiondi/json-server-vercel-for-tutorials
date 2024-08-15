const fs = require('fs')
const path = require('path')

const db = JSON.parse(fs.readFileSync(path.join("db.json")))


// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const server = jsonServer.create()

// Uncomment to allow write operations

const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");

// Comment out to allow write operations
const router = jsonServer.router(db)

const middlewares = jsonServer.defaults()

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    // '/todos/*': '/$1',
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
