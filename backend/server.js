import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
//npm run dev
const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});