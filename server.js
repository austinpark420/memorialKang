const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./router/api/auth'));
app.use('/api/user', require('./router/api/user'));
app.use('/api/notices', require('./router/api/notice'));
app.use('/api/emergencies', require('./router/api/emergency'));
app.use('/api/awards', require('./router/api/award'));
app.use('/api/scholarships', require('./router/api/scholarship'));
app.use('/api/videos', require('./router/api/video'));
app.use('/api/images', require('./router/api/image'));
app.use('/api/memorialHistories', require('./router/api/memorialHistory'));

//set static folder
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
