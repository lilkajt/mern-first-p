import express from 'express';
import { CreateProduct, DeleteProduct, GetProducts, UpdateProduct } from '../controllers/product.controller.js';
const router = express.Router();


router.get('/', GetProducts);

router.post('/', CreateProduct);

router.delete('/:id', DeleteProduct);

router.put('/:id', UpdateProduct);

export default router;