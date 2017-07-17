# cpsc304-project

The team originally set out to create a website with a frontend/backend to
support the collection and archiving of statistical data across sports.

The team quickly realized that it would need to narrow the scope of the project,
as creating dummy data for the database for multiple sports would require
a lot of time. Thus, it was decided that the scope would be narrowed down to
only basketball, and the NBA.

This project accomplished numerous tasks: it allows for the calculation of the
true shooting % and effective shooting % of any player in the database.

It also accomplished all of the requirements of the demo, which included
nested aggregations, divisions, joins, selections, projections, and some special
queries.

Overall, this was a good project to learn how to implement SQL queries, as well
as to acclimate oneself to the full-stack development process.

The project is in good shape moving forward, with regards to extensibility.

One issue the team ran into during development was the fact that the node
module "OracleDB" does not support cascade-delete. Thus, we can only give some
examples of when cascade-delete would come into effect.

An example of this is when 'NBA' is deleted from the TABLE "league". This would
cause a cascade-deletion on all rows in the TABLE 'team' with the leagueID 'NBA'.
This is because the column 'LeagueID' in team cannot be NULL. Thus, when the
leagueID 'NBA' is deleted, all teams with the leagueID 'NBA' will be deleted.
