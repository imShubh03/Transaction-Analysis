import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './utils/db.js';
import cookieParser from 'cookie-parser';
import transactionRoute from './routes/transaction.route.js';


const app = express();
const port = 3000;

dotenv.config();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/transactions', transactionRoute);

// Start the server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// Connect to the database
connectDB();
