import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import connectDB from './config/db.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://stock-sense-jz9yta5dj-aviral1511s-projects.vercel.app",   // your vercel domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Database
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
