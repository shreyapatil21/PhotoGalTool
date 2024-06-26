import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path'; 
import photoRoutes from './routes/photoRoutes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Middleware to parse JSON bodies
app.use(bodyParser.json());
// Middleware to serve static files (uploaded photos)
app.use('/uploads', express.static(join(__dirname, 'uploads')));
// Route handler for API routes related to photos
app.use('/api/photos', photoRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

