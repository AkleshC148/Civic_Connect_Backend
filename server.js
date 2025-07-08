const http = require('http');
require('dotenv').config(); 
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Express app
const server = http.createServer(app);



server.listen(PORT, () => {
  console.log(`✅ CivicConnect backend running on port ${PORT}`);
});
