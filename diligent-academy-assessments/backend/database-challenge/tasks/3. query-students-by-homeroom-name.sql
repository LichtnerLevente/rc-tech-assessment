SELECT s.name, s.email
FROM students s
         JOIN student_homeroom sh ON s.id = sh.student_id
WHERE sh.homeroom_name = '9A';
