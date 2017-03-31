-- Join Query
-- Selects the name of the manager belonging to team 'teamName'
"SELECT fname, lname "
                       + "FROM managers "
                       + "INNER JOIN team ON team.teamID=managers.teamID "
                       + "WHERE team.teamname = " + "'" + teamName + "'",


-- Selection & Projection Query
-- selects the teamid of the given teamName
"SELECT teamID FROM team WHERE teamname=" + "'" + teamName + "'",

-- Division Query
-- Find the team that has played an away game against all other teams

"select teamName " +
"from team " +
"where teamID in (select awayteamid " +
                    "from plays " +
                    "where hometeamID in (select team.teamid from team) " +
                    "group by awayteamid " +
                    "having count(*) = (select (count(*) - 1) from team))"


-- Select with multiple rows
-- Select all matches where team X, has played an away game.
"select matchID " +
"from plays " +
"inner join team on team.teamid=plays.awayteamid " +
"WHERE team.teamname = " + "'" + teamName + "'",


-- Aggregation Query
-- Finds the player with the max (any variable in stats)
"select playerid from stats where points = (select max("+ aggregateVar +") from stats)"

-- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
"select fname, lname from player inner join stats on stats.playerid=player.playerid where points "+
"= (select min("+ aggregateVar +") from stats)"

-- count the number of players on a given team
"select count(playerid) from player inner join team on team.teamid=player.teamid " +
"where team.teamname = " + "'" + teamName + "' " +
"group by player.teamid"



-- Nested Aggregation Query
-- Find the team which has the highest (MAX) average (AVG) homescore across their match history

select temp.teamname, temp.maxOrMin
from ()

-- Find the team which has the lowest (MIN) average (AVG) homescore across their match history


-- Find the team with the highest (MAX) overall homescore points (SUM)


--Find the team with the most players on it (Max & Count).

"select temp.teamname, temp.countofPlayers " +
"from (select team.teamname, count(playerid) as countofPlayers " +
"from player inner join team on team.teamid = player.teamid " +
"group by team.teamname) temp " +
"where countofPlayers = (select Max(countofPlayers) from (select team.teamname, count(playerid) as countofPlayers " +
                                                         "from player inner join team on team.teamid = player.teamid " +
                                                         "group by team.teamname))"


--Find the team with the least players on it (Min & Count).

"select temp.teamname, temp.countofPlayers " +
"from (select team.teamname, count(playerid) as countofPlayers " +
"from player inner join team on team.teamid = player.teamid " +
"group by team.teamname) temp " +
"where countofPlayers = (select min(countofPlayers) from (select team.teamname, count(playerid) as countofPlayers " +
                                                         "from player inner join team on team.teamid = player.teamid " +
                                                         "group by team.teamname))"

-- Special Query 1: True Shooting % of a SPECIFIC Player
-- TS% = PTS / 2(FGA + (0.44 * FTA))   x   100

"SELECT (CAST (s.Points AS FLOAT) / (2 * (s.FGAtt + (CAST (0.44 AS FLOAT)* s.FTAtt)))) as True Shooting % "
+ "FROM stats s "
+ "JOIN player p ON p.PlayerID = s.PlayerID "
+ "WHERE p.LName=" + "'" + LName + "'" + "AND p.FName=" + "'" + FName + "'" ";


-- Select Entire Table of TS% and order by DESC
"SELECT p.LName, p.FName, (CAST (s.Points AS FLOAT) / (2 * (s.FGAtt + (CAST (0.44 AS FLOAT)* s.FTAtt)))) as True Shooting % "
+ "FROM stats s "
+ "JOIN player p ON p.PlayerID = s.PlayerID "
+ "ORDER BY "True Shooting %" DESC ";

-- Special Query 2: Effective Shooting % of a SPECIFIC Player
-- ES% = (FGM + 0.5(ThreeMade)) / FGA
"SELECT ((CAST (s.FGMade AS FLOAT) + 0.5 * (CAST (s.ThreeMade AS FLOAT))) / s.FGAtt) as Effective Shooting % "
+ "FROM stats s "
+ "JOIN player p ON p.PlayerID = s.PlayerID "
+ "WHERE p.LName=" + "'" + LName + "'" + "AND p.FName=" + "'" + FName + "'" ";

-- Select Entire Table of ES% and order by DESC
"SELECT p.LName, p.FName, ((CAST (s.FGMade AS FLOAT) + 0.5 * (CAST (s.ThreeMade AS FLOAT))) / s.FGAtt) as Effective Shooting % "
+ "FROM stats s "
+ "JOIN player p ON p.PlayerID = s.PlayerID "
+ "ORDER BY "Effective Shooting %" DESC ";


