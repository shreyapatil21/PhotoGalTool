// photoController.js

import multer, { diskStorage } from 'multer';
import { extname } from 'path';
import connection from '../config/db.js';

const storage = diskStorage({
    destination: (req, file, cb) => {
        const dir = `./uploads/${req.user.id}`;
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + extname(file.originalname));
    }
});

const upload = multer({ storage });

const uploadPhoto = (req, res) => {
    const { tags } = req.body;
    const filePath = `uploads/${req.user.id}/${req.file.filename}`;
    const tagsArray = tags.split(',').map(tag => tag.trim());

    connection.query('INSERT INTO photos (user_id, file_path, uploaded_by, tags) VALUES (?, ?, ?, ?)',
        [req.user.id, filePath, req.user.username, JSON.stringify(tagsArray)],
        (error) => {
            if (error) return res.status(500).send('Database error');
            res.status(200).send('Photo uploaded successfully');
        }
    );
};

const getPhotos = async (req, res) => {
    try {
        const sql = 'SELECT * FROM photos';
        const [rows, fields] = await connection.query(sql);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching photos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deletePhoto = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM photos WHERE id = ? AND user_id = ?', [id, req.user.id], (error) => {
        if (error) return res.status(500).send('Database error');
        res.status(200).send('Photo deleted successfully');
    });
};

const updateTags = (req, res) => {
    const { id } = req.params;
    const { tags } = req.body;
    const tagsArray = tags.split(',').map(tag => tag.trim());

    connection.query('UPDATE photos SET tags = ? WHERE id = ? AND user_id = ?',
        [JSON.stringify(tagsArray), id, req.user.id],
        (error) => {
            if (error) return res.status(500).send('Database error');
            res.status(200).send('Tags updated successfully');
        }
    );
};

export { upload, uploadPhoto, getPhotos, deletePhoto, updateTags }; // Export each function individually
