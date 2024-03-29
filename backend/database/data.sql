CREATE DATABASE IF NOT EXISTS TASKOPIA;

USE TASKOPIA;

CREATE TABLE users(
                      id BIGINT PRIMARY KEY AUTO_INCREMENT,
                      username VARCHAR(255) NOT NULL
);

CREATE TABLE boards(
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       user_id BIGINT,
                       FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE task_lists(
                           id BIGINT PRIMARY KEY AUTO_INCREMENT,
                           board_id BIGINT,
                           positionInBoard INT NOT NULL,
                           FOREIGN KEY (board_id) REFERENCES boards(id)
);

CREATE TABLE tasks(
                      id BIGINT PRIMARY KEY AUTO_INCREMENT,
                      task_list_id BIGINT,
                      title VARCHAR(255) NOT NULL,
                      description VARCHAR(255) NOT NULL,
                      positionInTaskList INT NOT NULL,
                      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      done_at TIMESTAMP,
                      FOREIGN KEY (task_list_id) REFERENCES task_lists(id)
);