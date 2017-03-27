create table student(
	snum number(9,0) PRIMARY KEY,
	sname varchar2(30),
	major varchar2(25),
	standing varchar2(2),
	age number(3,0)
	);
create table faculty(
	fid number(9,0) PRIMARY KEY,
	fname varchar2(30),
	deptid number(2,0)
	);
