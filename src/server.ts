import express from 'express';
import { createServer } from 'http';
import { port } from './config';
import bodyParser from 'body-parser';
import Logger from './utils/logger';
import cors, { CorsOptions } from 'cors';
import './database'; // Databse Initialization

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

const corsOptions: CorsOptions = {
	origin: '*',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const server = createServer(app);

server.listen(port, () => {
	Logger.info(`Server is running on port ${port}`);
});
