import Logger from '../utils/logger';
import { db } from '../config';
import mongoose, { ConnectOptions } from 'mongoose';

// Build the connection string
const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}/?connectTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10&appName=blogs`;

Logger.debug(`MongoDB URI: ${dbURI}`);

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	Logger.info(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	Logger.error(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	Logger.warn('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
// Gracefully shutdown handler
const gracefulShutdown = async (signal: string) => {
	try {
		await mongoose.connection.close();
		Logger.info('Mongoose connection closed through application termination');
		process.exit(0); // Exit the process with success
	} catch (error) {
		Logger.error(
			`Error while closing Mongoose connection: ${(error as { message: string }).message}`
		);
		process.exit(1); // Exit the process with failure
	}
};

// Listen for termination signals
// This will handle both SIGINT (Ctrl+C) and SIGTERM (kill command)
['SIGINT', 'SIGTERM'].forEach((signal) => {
	process.on(signal, () => gracefulShutdown(signal));
});