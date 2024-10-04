import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Data',
      version: '1.0.0',
      description: 'User API documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Make sure this matches your server URL
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // Points to your routes and models
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwaggerDocs = (app: Express, port: number) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/api-docs`);
};
