const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDb = require("./config/config");
const productRoutes = require('./routes/productRoutes');
const userRoutes = require("./routes/userRoute");
const orderRoutes = require("./routes/orderRoute"); 

//dotnv configure
dotenv.config();

//connect to mongodb
connectDb();

const app = express();

//middleware bodyparser
app.use(express.json());

// CORS configuration - restrict to known origins
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://yourgarden.netlify.app',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to Node Server</h1>');
});

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`);
});