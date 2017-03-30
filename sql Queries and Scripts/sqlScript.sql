DROP TABLE plays;
DROP TABLE "MATCH";
DROP TABLE managers;
DROP TABLE player;
DROP TABLE team;
DROP TABLE league;
DROP TABLE sport;


CREATE TABLE sport (sportID number(10), sportName varchar(50), PRIMARY KEY(sportID));

CREATE TABLE league (leagueID number(10), leagueName varchar(50), sportID number(10),
PRIMARY KEY (leagueID), FOREIGN KEY (sportID) references sport);

CREATE TABLE team (teamID number(10), teamName varchar(50), teamCity varchar(50), leagueID number(10) NOT NULL,
PRIMARY KEY(teamID), FOREIGN KEY (leagueID) REFERENCES league);

CREATE TABLE player (playerID number(10), country varchar(20), jerseyNumber number(2),
teamID number(10),fName varchar(50), lName varChar(50), gamesPlayed varChar(10), fgPercentage number(10,10),
threePercentage number(10,10), ftPercentage number(10,10), assists number(10), rebounds number(10),
blks number(10), steals number(10), points number(10), PRIMARY KEY (playerID),
FOREIGN KEY (teamID) REFERENCES team);

CREATE TABLE managers (managerID number(10), salary number(20), fName varchar(50),
lName varchar(50), teamID number(10), PRIMARY KEY (managerID), FOREIGN KEY (teamID) REFERENCES team);

CREATE TABLE "MATCH" (matchID number(10), matchDate DATE NOT NULL, homeScore number(10),
awayScore number(10), PRIMARY KEY (matchID));

CREATE TABLE plays (matchID number(10), awayTeamID number(10), homeTeamID number(10),
PRIMARY KEY (matchID), FOREIGN KEY (matchID) REFERENCES "MATCH",
FOREIGN KEY (awayTeamID) REFERENCES team, FOREIGN KEY (homeTeamID) REFERENCES team);

INSERT ALL
  INTO sport (sportID, sportName)VALUES (1, 'Basketball')
  INTO league (leagueID, leagueName,sportID) VALUES (1, 'NBA', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (1, 'Lakers', 'LA', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (2, 'Magic', 'ORL', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (3, 'Raptors', 'TOR', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (4, 'Clippers', 'LA', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (5, 'Suns', 'PHX', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (6, 'Warriors', 'GS', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (7, 'Thunder', 'OKC', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (8, 'Cavaliers', 'CLE', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (9, 'Mavericks', 'DAL', 1)
  INTO team (teamID, teamName, teamCity, leagueID) VALUES (10, 'Spurs', 'SA', 1)
  INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (1, 'USA', 24, 1, 'Kobe', 'Bryant', 82, 0.54, 0.43, 0.93, 1000,500,120,150, 2500)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (2, 'France', 10, 2, 'Evan', 'Fournier', 50, 0.45, 0.43, 0.80, 300,200,40,80, 2000)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (3, 'USA', 10, 3, 'DeMar', 'DeRozan', 82, 0.54, 0.43, 0.93, 500,600,30,120, 2600)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (4, 'USA', 3, 4, 'Chris', 'Paul', 82, 0.54, 0.43, 0.98, 900,400,30,200, 2000)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (5, 'USA', 1, 5, 'Devin', 'Booker', 60, 0.42, 0.43, 0.82, 500,300,70,70, 2100)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (6, 'USA', 30, 6, 'Steph', 'Curry', 82, 0.54, 0.54, 0.96, 600,500,90,150, 2600)

INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
VALUES (7, 'USA', 0, 7, 'Russell', 'Westbrook', 82, 0.43, 0.35, 0.93, 900,900,100,100, 2700)

  INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
  threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
  VALUES (8, 'USA', 24, 8, 'Lebron', 'James', 82, 0.43, 0.35, 0.93, 700,750,220,130, 2200)

  INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
  threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
  VALUES (9, 'Germany', 24, 9, 'Dirk', 'Nowitzki', 82, 0.51, 0.42, 0.88, 400,600,130, 30, 2000)

  INTO player (playerID, country, jerseyNumber, teamID, fName, lname, gamesPlayed, fgPercentage,
  threePercentage, ftPercentage, assists, rebounds, blks, steals, points)
  VALUES (10, 'USA', 2, 10, 'Kawhi', 'Leonard', 82, 0.43, 0.35, 0.93, 550,650,200,130, 2400)

  INTO managers (managerID, salary, fName, lName, teamID) VALUES (1, 5000000, 'Phil', 'Jackson', 1)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (2, 2000000, 'Frank', 'Vogel', 2)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (3, 3000000, 'Dwane', 'Casey', 3)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (4, 4005000, 'Doc', 'Rivers', 4)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (5, 2000000, 'Earl', 'Watson', 5)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (6, 3040000, 'Steve', 'Kerr', 6)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (7, 2500000, 'Billy', 'Donovan', 7)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (8, 3500000, 'Tyronn', 'Lue', 8)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (9, 4520000, 'Rick', 'Carlisle', 9)
  INTO managers (managerID, salary, fName, lName, teamID) VALUES (10,3250000, 'Gregg', 'Popovich', 10)

  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(1, '2016-10-20', 100, 93)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(2, '2016-12-23', 80, 95)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(3, '2016-09-23', 95, 80)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(4, '2016-04-14', 90, 73)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(5, '2016-08-12', 120, 112)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(6, '2016-09-09', 108, 130)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(7, '2016-09-25', 83, 93)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(8, '2016-09-14', 84, 85)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(9, '2016-11-03', 91, 92)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(10, '2016-12-01', 130, 124)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(11, '2016-12-04', 90, 89)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(12, '2016-12-07', 103, 101)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(13, '2016-12-08', 107, 130)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(14, '2016-12-09', 102, 120)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(15, '2016-12-13', 99, 102)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(16, '2016-12-15', 140, 138)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(17, '2016-12-17', 90, 100)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(18, '2016-12-12', 100, 99)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(19, '2016-12-11', 111, 80)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(20, '2016-12-14', 80, 104)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(21, '2016-12-15', 93, 120)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(22, '2016-12-19', 98, 131)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(23, '2016-12-20', 104, 94)
  INTO "MATCH" (matchID, matchDate, homeScore, awayScore) VALUES(24, '2016-12-23', 132, 129)





  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (1, 1, 2)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (2, 1, 3)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (3, 4, 5)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (4, 3, 5)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (5, 6, 7)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (6, 8, 9)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (7, 10, 9)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (8, 3, 4)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (9, 9, 3)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (10, 1, 2)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (11, 1, 4)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (12, 1, 5)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (13, 1, 6)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (14, 1, 7)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (15, 1, 8)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (16, 1, 9)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (17, 1, 10)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (18, 3, 1)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (19, 3, 2)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (20, 3, 6)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (21, 3, 7)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (22, 3, 8)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (23, 3, 9)
  INTO plays (matchID, awayTeamID, homeTeamID) VALUES (24, 3, 10)







  SELECT 1 FROM DUAL;
