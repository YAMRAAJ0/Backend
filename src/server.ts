import app from './app';
import { setupSwaggerDocs } from './config/swagger'; 
const port = process.env.PORT || 5000;
setupSwaggerDocs(app, Number(port));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



// import app from './app';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from 'swagger-jsdoc';

// const PORT = process.env.PORT ?? 5000;

// // Swagger definition
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Courses API',
//             version: '1.0.0',
//             description: 'API for managing courses',
//         },
//         servers: [
//             {
//                 url: `http://localhost:${PORT}/api`,
//             },
//         ],
//     },
//     apis: ['./src/routes/*.ts'], // Path to your route files for documentation
// };

// const swaggerSpecs = swaggerJSDoc(swaggerOptions);

// // Set up Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//     console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
// });
