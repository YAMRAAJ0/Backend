import express from 'express';
import exampleRoutes from './routes/exampleRoutes'; 

const app = express();
app.use(express.json());

// Use Routes
app.use('/api', exampleRoutes);

export default app;
