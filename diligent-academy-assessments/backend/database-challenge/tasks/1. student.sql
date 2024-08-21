CREATE TABLE IF NOT EXISTS students
(
    id SERIAL PRIMARY KEY,
    name  VARCHAR(255),
    email VARCHAR(255) UNIQUE
);

INSERT INTO students (name, email)
VALUES ('John', 'john@school.com'),
       ('Adam', 'adam@school.com'),
       ('Lucy', 'lucy@school.com');

