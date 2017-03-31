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


--Find the team with the most players on it.
"select temp.teamname " +
"from (select teamid, count(playerid) as countofPlayers " +
        "from player group by teamid) temp " +
"inner join temp on temp.teamid = team.teamid "
"where temp.countofPlayers = (select Max(temp.countofPlayers) from temp)"

