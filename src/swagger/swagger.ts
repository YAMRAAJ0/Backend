import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User API',
            version: '1.0.0',
            description: 'User authentication API',
        },
    },
    apis: ['./src/routes/*.ts'], // Specify the paths for API documentation
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwaggerDocs = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
