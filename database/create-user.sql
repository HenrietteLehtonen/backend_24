CREATE USER 'testi'@'localhost' IDENTIFIED BY 'testi';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'testi'@'localhost';
FLUSH PRIVILEGES;