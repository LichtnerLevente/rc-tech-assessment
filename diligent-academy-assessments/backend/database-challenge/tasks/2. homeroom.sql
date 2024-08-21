CREATE TABLE IF NOT EXISTS homerooms
(
    name VARCHAR(255) UNIQUE PRIMARY KEY
);

INSERT INTO homerooms (name)
VALUES ('9A'),
       ('9B');


CREATE TABLE IF NOT EXISTS student_homeroom
(
    student_id    INT REFERENCES students (id),
    homeroom_name VARCHAR(255) REFERENCES homerooms (name),
    PRIMARY KEY (student_id, homeroom_name)
);

INSERT INTO student_homeroom (student_id, homeroom_name)
VALUES (1, '9A'), -- Assuming John's ID is 1
       (2, '9A'), -- Assuming Adam's ID is 2
       (3, '9B'); -- Assuming Lucy's ID is 3

