const express = require('express');
// ENV
const dotenv = require('dotenv');
dotenv.config();
// Environment configuration
const config = require('./src/config');
// Routes
const router = require('./src/routes');

const PORT = config.PORT ?? 3001;

const app = express();
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`🚀 Server running in: http://localhost:${PORT}/api`);
})
