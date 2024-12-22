import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';
//npm run dev
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log(`Error in get products: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
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
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndRemove(req.params.id);
        res.status(200).json({success: true, data: deletedProduct});
    } catch (error) {
        console.log(`Error in delete product: ${error.message}`);
        res.status(500).json({success: false, message: error.message});
    }
});

app.put('/api/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No product with that id');
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
});

app.listen(7500, ()=>{
    connectDB();
    console.log("Server started at http://localhost:7500");
});