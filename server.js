const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.json()); 

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// DMTrackGo route
const dmtrackgoRoutes = require('./router'); 
app.use('/api', dmtrackgoRoutes);                
// SPA fallback
app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.sendFile(path.join(publicPath, 'index.html'));
  } else {
    next();
  }
});

app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});