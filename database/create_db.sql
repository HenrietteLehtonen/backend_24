DROP DATABASE IF EXISTS mediashare;
CREATE DATABASE mediashare;
USE mediashare;

CREATE TABLE Users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  user_level_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE MediaItems (
  media_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  filename VARCHAR(255) NOT NULL,
  filesize INT NOT NULL,
  media_type VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (media_id),
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Kommentit ja tykkäykset

CREATE TABLE Comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Likes (
    like_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    likes_count INT,
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) 
);
-- likes_count INT NOT NULL,

INSERT INTO Users VALUES (260, 'VCHar', 'secret123', 'vchar@example.com', 1, null  );
INSERT INTO Users VALUES (305, 'Donatello', 'secret234', 'dona@example.com', 1, null);


-- Inserting multiple records at once
INSERT INTO MediaItems (filename, filesize, title, description, user_id, media_type) 
VALUES 
  ('ffd8.jpg', 887574, 'Favorite drink', null, 305, 'image/jpeg'),
  ('dbbd.jpg', 60703, 'Miika', 'My Photo', 305, 'image/jpeg'),
  ('2f9b.jpg', 30635, 'Aksux and Jane', 'friends', 260, 'image/jpeg');
-- 

-- Insert Comments
INSERT INTO Comments (media_id, user_id, comment_text)
VALUES 
  (1, 305, 'Hieno limu'),
  (2, 305, 'Miikalla on kiva paita'),
  (3, 260, 'Kivat kamut');


-- Insert Likes

INSERT INTO Likes (media_id, user_id, likes_count) 
VALUES  (1, 305, 10),
        (2, 305, 5),
        (3, 260, 2);


SELECT * FROM MediaItems WHERE user_id = 305;  
SELECT * FROM MediaItems WHERE user_id = 260;

SELECT 
  Users.user_id, 
  Users.username, 
  MediaItems.media_id, 
  MediaItems.title, 
  MediaItems.filename
FROM 
  Users
LEFT OUTER JOIN MediaItems 
  ON Users.user_id = MediaItems.user_id;

-- Näytä "kuva" ja kuvan kommentit

SELECT

    MediaItems.media_id,
    MediaItems.filename,
    MediaItems.description,
    MediaItems.title,
    Comments.comment_text,
    Comments.comment_id
    
FROM 
    MediaItems
LEFT JOIN 
    Comments ON MediaItems.media_id = Comments.media_id;

-- lisää myös tykkäykset

SELECT 
    Users.username,
    MediaItems.media_id, 
    MediaItems.title, 
    Comments.comment_text,
    Likes.likes_count
FROM 
    MediaItems 
JOIN 
    Users ON MediaItems.user_id = Users.user_id
JOIN 
    Comments ON MediaItems.media_id = Comments.media_id
LEFT JOIN
    Likes ON MediaItems.media_id = Likes.media_id;

-- Kommentin poisto

DELETE FROM Comments WHERE comment_id = 2;

-- Tykkäyksien lisääminen

UPDATE Likes SET likes_count = likes_count + 20 WHERE like_id = 3;


SELECT 
    Users.username,
    MediaItems.media_id, 
    MediaItems.title, 
    Comments.comment_text,
    Likes.likes_count
FROM 
    MediaItems 
JOIN 
    Users ON MediaItems.user_id = Users.user_id
JOIN 
    Comments ON MediaItems.media_id = Comments.media_id
LEFT JOIN
    Likes ON MediaItems.media_id = Likes.media_id;