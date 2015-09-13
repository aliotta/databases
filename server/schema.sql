CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  userName VARCHAR(100),
  message VARCHAR(100),
  roomName VARCHAR(100),
  PRIMARY KEY (id)
  /* Describe your table here.*/
);
CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  userName VARCHAR(100),
  PRIMARY KEY (id)
  /* Describe your table here.*/
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

