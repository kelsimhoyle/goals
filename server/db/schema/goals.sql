CREATE DATABASE goals;
USE goals;

CREATE TABLE goal (
	id int NOT NULL AUTO_INCREMENT,
	title VARCHAR(50),
    created_date DATE,
	target_date DATE,
    completed BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

create TABLE user_goal (
    id INT NOT NULL AUTO_INCREMENT,
    category_id INT,
    user_id INT NOT NULL,
    goal_id INT NOT NULL,
    CONSTRAINT cat FOREIGN KEY (category_id)
    REFERENCES category(id)
    ON DELETE CASCADE,
    CONSTRAINT user FOREIGN KEY (user_id)
    REFERENCES user(id)
    ON DELETE CASCADE,
    CONSTRAINT goal FOREIGN KEY (goal_id)
    REFERENCES goal(id)
    ON DELETE CASCADE,
    PRIMARY KEY(id)
);