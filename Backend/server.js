const app = require('./src/app');
const cors = require('cors');
require('dotenv').config();
app.use(cors()); // Enable CORS for all routes
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});