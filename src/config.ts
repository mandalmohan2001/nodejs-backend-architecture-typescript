export const environment = process.env.NODE_ENV;

export const port = process.env.PORT;

export const db = {
	name: process.env.DB_NAME as string,
	host: process.env.DB_HOST as string,
	port: process.env.DB_PORT as string,
	user: process.env.DB_USER as string,
	password: process.env.DB_PWD as string,
};

export const logDirectory = process.env.LOG_DIR as string;
const LOG_DIR = 'logs'; // Fixed missing semicolon and trailing whitespace
