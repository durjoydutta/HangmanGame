DROP DATABASE IF EXISTS hangman_game;
CREATE DATABASE hangman_game;
USE hangman_game;

CREATE TABLE users (
    id VARCHAR(36) NOT NULL PRIMARY KEY, 
    username VARCHAR(10) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'player') DEFAULT 'player',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE words (
    id INT AUTO_INCREMENT PRIMARY KEY,
    word VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE game (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    word_id INT NOT NULL,
    score INT NOT NULL CHECK (score >= 0), 
    status ENUM('won', 'lost') NOT NULL,
    played_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (word_id) REFERENCES words(id) ON DELETE CASCADE
);

-- View for Leaderboard
CREATE VIEW leaderboard AS
SELECT 
    u.username, 
    COUNT(g.id) AS total_games, 
    IFNULL(AVG(g.score), 0) AS average_score
FROM users u
LEFT JOIN game g ON u.id = g.user_id
GROUP BY u.id
ORDER BY average_score DESC;
