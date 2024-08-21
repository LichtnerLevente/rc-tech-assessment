INSERT INTO enrollments (student_id, subject_name, grade)
VALUES (1, 'Algebra', 3),
       (1, 'Biology', 2),
       (1, 'World History', 5),
       (2, 'Algebra', 4),
       (2, 'Biology', 3),
       (2, 'World History', 2),
       (3, 'Algebra', 5),
       (3, 'Biology', 4),
       (3, 'World History', 3);

--Average grade of students by subject name:
SELECT AVG(grade) AS average_algebra_grade
FROM enrollments
WHERE subject_name = 'Algebra';

--Average grade by student_id:
SELECT AVG(grade) AS average_grade_of_john
FROM enrollments
WHERE student_id = 1;
