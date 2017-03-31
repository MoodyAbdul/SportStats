var express = require('express');
var oracledb = require('oracledb');
var fs = require('file-system');
var app = express();
var path = require('path');
var sqlFile;
var sqlStatements;
var bodyParser = require('body-parser');
var jsonToHtml = require('./jsonToHtml');

var connAttrs = {
    user: "ora_i2a0b",
    password: "a18986142",
    connectString: "localhost:1522/ug"
};
app.set('views', './public');
app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'pug');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res){
    res.render('index', {
        getResults: function() {
            return "Results will show here!"
        }
    });
})

app.get('/add', function(req, res){
    res.render('add', {
        getResults: function() {
            return " "
        }
    });
})

app.post('/aggregationQuery', function (req, res){
    var results;
    var statVar = req.body.statVar;
    var filterBy = req.body.radios;
    console.log(filterBy);

// The aggregation queries
// -- Finds the player with the max (any variable in stats)
// -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
// -- count the number of players on a given team


// -- Nested Aggregation Query
// --Find the team with the most players on it.

// filterby button 1 should be max
// filterby button 2 should be min
// filterby button 3 should be count
    if (filterBy == 3){
    // count the number of players on a given team
        function countPlayersOnTeam(statVar){
            console.log('Counting Players On the ------ ' + statVar);
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                // count the number of players on a given team
                connection.execute(
                    "select count(playerid) as NumberOfPlayers from player inner join team on team.teamid=player.teamid " +
                    "where team.teamname = " + "'" + statVar + "' " +
                    "group by player.teamid",
                    [],
                    {outFormat: oracledb.Object},

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', '', '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        countPlayersOnTeam(statVar);

    } else if (filterBy == 2){
    // -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
        function worstPlayer(statVar){
            console.log(statVar);
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

// -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
                connection.execute("select fname, lname from player inner join stats on stats.playerid=player.playerid where "+ statVar +" "+
                                   "= (select min("+ statVar +") from stats)",
                    [],
                    {outFormat: oracledb.OBJECT },

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result);
                        console.log(result.metaData);
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', '', '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        worstPlayer(statVar);



    } else if (filterBy == 1) {
// -- Finds the player with the max (any variable in stats)
// filterby button 1 should be max

        function bestPlayer(statVar){
         console.log('Finding the player with the best ' + statVar + ' of the team specified!');
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
// -- Finds the player with the max (any variable in stats)
                connection.execute("select fname, lname from player " +
                "inner join stats on stats.playerid=player.playerid where "+ statVar +" = " +
                "(select max("+ statVar +") from stats)",
                    [],

                    {outFormat: oracledb.OBJECT},

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.metaData);
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', '', '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        bestPlayer(statVar);
    }
});

app.post('/specialQueries', function (req, res){
    var results;

    var FName = req.body.firstName;
    var LName = req.body.lastName;
    var filterBy = req.body.radios;

// The aggregation queries
//-- Special Query 1: True Shooting % of a SPECIFIC Player
//-- TS% = PTS / 2(FGA + (0.44 * FTA))   x   100


// filterby button 1 should be true shooting
// filterby button 2 should be effective shooting


//-- Special Query 2: Effective Shooting % of a SPECIFIC Player
//-- ES% = (FGM + 0.5(ThreeMade)) / FGA
    if (filterBy == 1){
   //-- Special Query 1: True Shooting % of a SPECIFIC Player
   //-- TS% = PTS / 2(FGA + (0.44 * FTA))   x   100
        function trueShootingSingle(FName, LName){
            console.log('Special Query 1: True Shooting % of a SPECIFIC Player');
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                // count the number of players on a given team
                connection.execute(
                    "SELECT (CAST (s.Points AS FLOAT) / (2 * (s.FGAtt + (CAST (0.44 AS FLOAT)* s.FTAtt)))) as True Shooting % "
                    + "FROM stats s "
                    + "JOIN player p ON p.PlayerID = s.PlayerID "
                    + "WHERE p.LName=" + "'" + LName + "'" + "AND p.FName=" + "'" + FName + "'",
                    [],
                    {outFormat: oracledb.Object},

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.contentType('application/json').status(200);
                        res.render("index", {headers: result.metaData,
                                             values: result.rows});
                        doRelease(connection);
                    });
            });
        }
        trueShootingSingle(FName, LName);
// filterby button 2 should be effective shooting
    } else if (filterBy == 2){

    //-- Special Query 2: Effective Shooting % of a SPECIFIC Player
    //-- ES% = (FGM + 0.5(ThreeMade)) / FGA
    function effectiveShootingSingle(FName, LName){
            console.log('Effective Shooting % of a SPECIFIC Player');

            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

// -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
                connection.execute("SELECT ((CAST (s.FGMade AS FLOAT) + 0.5 * (CAST (s.ThreeMade AS FLOAT))) / s.FGAtt) as Effective Shooting % "
                                   + "FROM stats s "
                                   + "JOIN player p ON p.PlayerID = s.PlayerID "
                                   + "WHERE p.LName=" + "'" + LName + "'" + "AND p.FName=" + "'" + FName + "'",
                    [],
                    {outFormat: oracledb.OBJECT },

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.render("index", {rows: result.rows});
                        doRelease(connection);
                    });
            });
        }
        effectiveShootingSingle(FName, LName);



    } else if (filterBy == 1) {
// -- Finds the player with the max (any variable in stats)
// filterby button 1 should be max

        function bestPlayer(statVar){
         console.log('Finding the player with the best ' + statVar + ' of the team specified!');
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
// -- Finds the player with the max (any variable in stats)
                connection.execute("select fname, lname from player " +
                "inner join stats on stats.playerid=player.playerid where points = " +
                "(select max("+ statVar +") from stats)",
                    [],

                    {outFormat: oracledb.ARRAY },

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', null, '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        bestPlayer(statVar);
    }
});

app.post('/searchTeam', function (req, res){
    var results;
    var teamName = req.body.teamName;
    var filterBy = req.body.radios;
    console.log(filterBy);
    console.log(teamName);

// Making this query to "find the name of the manager belonging to a teamname
// What we are hoping to do is merge the manager and team tables.
    if (filterBy == 3){
        function findTeamManager(teamName){
            console.log('Finding the teams manager');
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                // Finds the First Name of the manager belonging to the teamName provided by joining the managers table and team table.
                connection.execute(
                    "SELECT fname, lname, salary "
                    + "FROM managers "
                    + "INNER JOIN team ON team.teamID=managers.teamID "
                    + "WHERE team.teamname = " + "'" + teamName + "'", //  DO NOT ADD A SEMI COLON AT THE END OF THE SQL STATEMENT
                    [],
                    {outFormat: oracledb.OBJECT},

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', null, '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        findTeamManager(teamName);
    } else if (filterBy == 2){
        function findMatchesofTeam(teamName){
            console.log('Finding matches of the team specified!');
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

               // -- Show all the games team X has played as away games. Show their score, the team they played and the other teams score.
                connection.execute("select t1.teamname, match.awayscore, t2.teamname, match.homescore " +
                    "from plays " +
                    "inner join team t1 on t1.teamid=plays.awayteamid " +
                    "inner join team t2 on t2.teamid=plays.hometeamid " +
                    "inner join match on match.matchid=plays.matchid " +
                    "WHERE t1.teamname = " + "'" + teamName + "'",
                    [],
                    {outFormat: oracledb.OBJECT},

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', null, ' ');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        findMatchesofTeam(teamName);



    } else if (filterBy == 1) {

        function searchPlayersOnTeam(teamName){
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

                connection.execute("SELECT fname as FirstName, lname as LastName "
                                                          + "FROM player "
                                                          + "INNER JOIN team ON team.teamID=player.teamID "
                                                          + "WHERE team.teamname = " + "'" + teamName + "'",
                    [],
                    {outFormat: oracledb.OBJECT },

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return jsonToHtml.convert(result.rows, 'jsonTable', '', '');
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        searchPlayersOnTeam(teamName);
    }
});

app.post('/update', function (req, res){
    var managerFirstName = req.body.managerFirstName;
    var managerLastName = req.body.managerLastName;
    var salary = parseInt(req.body.managerSalary);
    console.log(salary);
    console.log(managerFirstName);
    console.log(managerLastName);

    oracledb.getConnection(connAttrs, function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }

        connection.execute(
            "UPDATE managers "
            + "SET salary = :yeezus"
            + " WHERE fname = " + "'" + managerFirstName + "'" + " AND lname = " + "'" +  managerLastName + "'",
            [salary],
            {outFormat: oracledb.OBJECT,
              autoCommit: true},


            function(err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }


                console.log(result.rowsAffected);
                res.render("add", {
                    getResults: function() {
                        if (result.rowsAffected > 0){
                            return managerFirstName + " " + managerLastName + " salary updated to " + salary + ".";
                        } else {
                            return "No rows were affected. Invalid input.";
                        }
                    }
                });
                res.status(200);
                doRelease(connection);
            });
    });
});

app.post('/addMatch', function (req, res){
    var matchID = parseInt(req.body.matchID);
    var matchDate = req.body.matchDate;
    var sportID = req.body.sportID;
    var hometeamID = req.body.hometeamID;
    var awayteamID = parseInt(req.body.awayteamID);
    var homeScore = parseInt(req.body.homeScore);
    var awayScore = parseInt(req.body.awayScore);

    oracledb.getConnection(connAttrs, function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }

        connection.execute(
            "INSERT INTO MATCH "
            + "VALUES (:matchID, to_date(:matchDate,'dd-mm-yy'), :homeScore, :awayScore)",
            { matchID: matchID,
                matchDate: matchDate,
                homeScore: homeScore,
                awayScore: awayScore},
            {outFormat: oracledb.OBJECT,
                autoCommit: true},


            function(err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }


                console.log(result.rowsAffected);
                res.render("add", {
                    getResults: function() {
                        return "Match inserted!";
                    }
                });
                res.status(200);
                doRelease(connection);
            });
    });
});

function doRelease(connection) {
    connection.release(
        function(err) {
            if (err) { console.error(err.message); }
        }
    );
}

console.log('Server running...');
app.listen(8080);
exports = module.exports = app;