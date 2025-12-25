import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
