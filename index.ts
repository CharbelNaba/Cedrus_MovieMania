import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import expressLoader from './loaders/express';

export async function startServer() {
    try {
        dotenv.config();
        const app = await (express)();
        const server = http.createServer(app);

        // Load everything related to express in separate module.
        expressLoader({ app });
        
        // Start the server.
        server.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

    } catch (error) {
        throw error;
    }
}

startServer();