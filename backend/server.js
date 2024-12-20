import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.post('/api/products', async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ message: 'Invalid product data' });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log(`Error in create product: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
})
app.listen(5000, ()=>{
    connectDB();
    console.log("Server started at http://localhost:5000");
});