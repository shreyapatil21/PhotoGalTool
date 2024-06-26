import { query } from '../config/db';

const findUserById = (id, callback) => {
    query('SELECT * FROM users WHERE id = ?', [id], (error, results) => {
        if (error) return callback(error);
        return callback(null, results[0]);
    });
};

export default { findUserById };
