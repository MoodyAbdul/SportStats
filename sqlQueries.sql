-- Join Query
"SELECT fname, lname "
                       + "FROM managers "
                       + "INNER JOIN team ON team.teamID=managers.teamID "
                       + "WHERE team.teamname = " + "'" + teamName + "'",


-- Selection & Projection Query
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
"select fname, lname, max(points) " +
"from player"


