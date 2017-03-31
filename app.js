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
            return " "
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
    var playName = req.body.playName;
    var teamName = req.body.teamName;
    var filterBy = req.body.radios;
    console.log(filterBy);
    console.log(teamName);

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
        function countPlayersOnTeam(teamName){
            console.log('Counting Players On the ------ ' + teamName);
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
                // count the number of players on a given team
                connection.execute(
                    "select count(playerid) from player inner join team on team.teamid=player.teamid " +
                    "where team.teamname = " + "'" + teamName + "' " +
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
                        res.contentType('application/json').status(200);
                        res.render("index", {headers: result.metaData,
                                             values: result.rows});
                        doRelease(connection);
                    });
            });
        }
        findTeamManager(teamName);
    } else if (filterBy == 2){
    // -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
        function findMatchesofTeam(teamName){
            console.log('Finding the player with the lowest " +  of the team specified!');
            console.log(teamName);
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }
// -- Selects the players' first and last name who has the lowest (any variables) in the stats table. (Join and Aggregation)
                connection.execute("select matchID " +
                    "from plays " +
                    "inner join team on team.teamid=plays.awayteamid " +
                    "WHERE team.teamname = " + "'" + teamName + "'",
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
                        //res.contentType('application/json').status(200);
                        res.render("index", {rows: result.rows});
                        doRelease(connection);
                    });
            });
        }
        findMatchesofTeam(teamName);



    } else if (filterBy == 1) {

        function searchTeam(teamName){
            oracledb.getConnection(connAttrs, function(err, connection) {
                if (err) {
                    console.error(err.message);
                    return;
                }

                connection.execute("SELECT teamID FROM team WHERE teamname=" + "'" + teamName + "'",
                    [],

                    {outFormat: oracledb.ARRAY },

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
                                return " "
                            }
                        });
                        doRelease(connection);
                    });
            });
        }
        searchTeam(teamName);
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
                    {outFormat: oracledb.ARRAY},

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
                                return " "
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
            console.log(teamName);
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
                    {outFormat: oracledb.ARRAY },

                    function(err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            return;
                        }
                        results = result;
                        //console.log(result);
                        console.log(result.metaData);
                        console.log(result.rows);
                        res.render('index', {
                            getResults: function() {
                                return " "
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

                connection.execute("SELECT fname, lname "
                                                          + "FROM player "
                                                          + "INNER JOIN team ON team.teamID=player.teamID "
                                                          + "WHERE team.teamname = " + "'" + teamName + "'",
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
                                return "" + result.rows + "";
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

function doRelease(connection) {
    connection.release(
        function(err) {
            if (err) { console.error(err.message); }
        }
    );
}

function displayResults(result){

}

console.log('listening');
app.listen(8080);
exports = module.exports = app;