import express from 'express';
import cors from 'cors';
import routes from './routes';
const app = express();

require('dotenv').config();

app.use(cors());

app.all('/*', function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '200mb' }));

app.use(routes);

export default app;