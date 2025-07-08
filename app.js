

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
// const candidateRoutes = require('./routes/candidateRoutes');
// const postRoutes = require('./routes/postRoutes');
// const volunteerRoutes = require('./routes/volunteerRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const reportRoutes = require('./routes/reportRoutes');

const app = express();

// === Middlewares ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// === Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/candidates', candidateRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/volunteers', volunteerRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/reports', reportRoutes);

// === Error Handling ===
app.use(errorHandler);

module.exports = app;
