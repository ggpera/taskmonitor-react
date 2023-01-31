const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 3010;
const cors = require('cors');


server.use(middlewares);
server.use('/api/', router);
server.use(cors());

server.listen(PORT, () => {
  console.log(`Backend is listening on port ${PORT}`);
});