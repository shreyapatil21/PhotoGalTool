import { createConnection } from 'mysql2';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'photo_gallery',
    connectionLimit: 10
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

export default connection;


