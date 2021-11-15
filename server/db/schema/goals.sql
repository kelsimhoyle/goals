CREATE DATABASE goals;
USE goals;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(250) NOT NULL,
    token VARCHAR(500),
    PRIMARY KEY(id)
);

CREATE TABLE goal (
	id int NOT NULL AUTO_INCREMENT,
	title VARCHAR(250),
    created_date DATE,
	target_date DATE,
    completed BOOLEAN,
    PRIMARY KEY(id)
);

CREATE TABLE mini_goal (
    id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(250),
    description VARCHAR(250),
    goal_id INT NOT NULL,
    CONSTRAINT goal FOREIGN KEY (goal_id)
    REFERENCES goal(id)
    ON DELETE CASCADE,
    PRIMARY KEY(id)
)

CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE user_goal (
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

CREATE TABLE blacklist_token (
    id INT NOT NULL AUTO_INCREMENT,
    token VARCHAR(500),
    PRIMARY KEY(id)
);