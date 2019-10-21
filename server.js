const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Runnig'));

// Define Routes
app.use('/api/posts', require('./router/api/posts'));
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/user', require('./router/api/user'));
app.use('/api/notices', require('./router/api/notice'));
app.use('/api/videos', require('./router/api/video'));
app.use('/api/images', require('./router/api/image'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
