import express from 'express';
import { createServer } from 'http';
import { port } from './config';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json({ limit: '10mb' }));

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));

const server = createServer(app);

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
