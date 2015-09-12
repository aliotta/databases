CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  
  userName VARCHAR(100),
  message VARCHAR(100),
  roomName VARCHAR(100)
  /* Describe your table here.*/
);
CREATE TABLE users (
  
  userName VARCHAR(100)
  /* Describe your table here.*/
);



/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

