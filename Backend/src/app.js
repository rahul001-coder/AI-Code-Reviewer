const express = require('express');
const Cors = require('cors');
const app = express();
const aiRoutes = require('./routes/ai.routes');
app.use(express.json()); // Middleware to parse JSON bodies
app.use(Cors()); // Enable CORS
app.use("/ai", aiRoutes);
module.exports = app;