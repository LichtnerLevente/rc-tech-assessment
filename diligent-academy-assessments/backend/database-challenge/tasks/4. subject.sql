CREATE TABLE subjects
(
    name VARCHAR(255) PRIMARY KEY
);


INSERT INTO subjects (name)
VALUES ('Algebra'),
       ('Biology'),
       ('World History');
CREATE TABLE enrollments
(
    student_id   INT,
    subject_name VARCHAR(255),
    grade        INT,
    PRIMARY KEY (student_id, subject_name),
    FOREIGN KEY (student_id) REFERENCES students (id),
    FOREIGN KEY (subject_name) REFERENCES subjects (name)
);

