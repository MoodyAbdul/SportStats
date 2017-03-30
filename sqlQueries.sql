-- Join Query
"SELECT fname, lname "
                       + "FROM managers "
                       + "INNER JOIN team ON team.teamID=managers.teamID "
                       + "WHERE team.teamname = " + "'" + teamName + "'",


-- Selection & Projection Query
"SELECT teamID FROM team WHERE teamname=" + "'" + teamName + "'",

-- Division Query
-- Find the team that has played an away game against all other teams

  SELECT
  FROM T1
  WHERE B IN ( SELECT B FROM T2 )
  GROUP BY A
  HAVING COUNT(*) =
  ( SELECT COUNT (*) FROM T2 )"


-- Select all matches where team X, has played an away game.
"select matchID " +
"from plays " +
"inner join team on team.teamid=plays.awayteamid " +
"WHERE team.teamname = " + "'" + teamName + "'",


