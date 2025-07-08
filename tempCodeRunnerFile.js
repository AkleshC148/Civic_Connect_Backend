const http = require('http');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = require('./app');

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Express app
const server = http.createServer(app);

// Future Socket.io integration? Use this server object
// const io = new Server(server); io.attach(...)

server.listen(PORT, () => {
  console.log(`✅ CivicConnect backend running on port ${PORT}`);
});
