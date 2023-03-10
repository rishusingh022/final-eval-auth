const express = require('express');
const authRoutes = require('./routes/auth.routes.js');
const PORT = process.env.PORT || 8000;

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
