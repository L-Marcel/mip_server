import express from "express";
import Jobs from "./controller/job";
import Products from "./controller/product";
import Users from "./controller/user";


const routes = express.Router();

routes.post('/products/create', Products.create);
routes.post('/products/update', Products.update);
routes.post('/products/:rt/check', Products.check);
routes.delete('/products/delete', Products.delete);
routes.get('/products', Products.list);

routes.post('/jobs/create', Jobs.create);
routes.post('/jobs/update', Jobs.update);
routes.post('/jobs/:rt/check', Jobs.check);
routes.delete('/jobs/delete', Jobs.delete);
routes.get('/jobs', Jobs.list);

routes.post('/users/create', Users.create);
routes.post('/users/update', Users.update);
routes.delete('/users/delete', Users.delete);
routes.get('/users', Users.list);

routes.post('/login', Users.login);

export default routes;