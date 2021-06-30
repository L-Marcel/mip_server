import express from "express";
import Products from "./controller/product";


const routes = express.Router();

routes.post('/products/create', Products.create);
routes.post('/products/update', Products.update);
routes.delete('/products/delete', Products.delete);
routes.get('/products', Products.list);

export default routes;