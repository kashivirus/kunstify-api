\

TO start;



SELECT User, Host FROM mysql.user;


now delete and let only the default ones ..
try to make user and give them privillages;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin';



===========================================================================

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT CREATE, ALTER, DROP, INSERT, UPDATE, INDEX, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'admin'@'localhost' WITH GRANT OPTION;



GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;




FLUSH PRIVILEGES;
exit;



===========================================================================



show database;
use <database_name>;
show tables;
desc <table_name>;
select * from <value_here>;





CREATE TABLE eployee(name, email) ;
INSERT 


mysql -u root -p
CREATE USER 'username'@'localhost' IDENTIFIED BY 'password';    = CREATE USER 'lumishare'@'localhost' IDENTIFIED BY 'lumishare';
GRANT ALL PRIVILEGES ON exampledb.* TO 'username'@'localhost';  = GRANT ALL PRIVILEGES ON  lumishare.* TO "lumishare"@"localhost";
										or
							 GRANT ALL PRIVILEGES ON lumishare.* TO 'lumishare'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;						= FLUSH PRIVILEGES;
SHOW GRANTS FOR 'username'@'localhost';				= EXIT;
EXIT;





CREATE USER 'lumishare'@'localhost' IDENTIFIED BY 'lumishare';
GRANT ALL PRIVILEGES ON lumishare.* TO 'lumishare'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;


even after typing above im  getting this error ie 
Error connecting to the database: Access denied for user 'lumishare'@'localhost' (using password: YES)


ALTER USER 'lumishare'@'localhost' IDENTIFIED WITH mysql_native_password BY 'lumishare';

ALTER USER 'lumishare'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;




