import app from './app';
import { setupSwaggerDocs } from './config/swagger'; 
const port = process.env.PORT || 5000;
setupSwaggerDocs(app, Number(port));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


