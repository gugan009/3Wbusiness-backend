require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const submissionRoutes = require('./routes/submissions');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/api/submissions', submissionRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
