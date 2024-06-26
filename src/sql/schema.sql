-- Create Users Table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create PhotoDetails Table
CREATE TABLE PhotoDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    tags VARCHAR(255) NOT NULL,
    upload_date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert initial users
INSERT INTO Users (username, password) VALUES 
('user1', 'password1'), 
('user2', 'password2'), 
('user3', 'password3');
