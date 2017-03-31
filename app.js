var express = require('express');
var oracledb = require('oracledb');
var fs = require('file-system');
var app = express();
var path = require('path');
var sqlFile;
var sqlStatements;
var bodyParser = require('body-parser');

console.log("booty");
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
    res.render('index');
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
                    "SELECT fname, lname "
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
                        res.contentType('application/json').status(200);
                        res.render("index", {headers: result.metaData,
                                             values: result.rows});
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

                connection.execute("select matchID " +
                    "from plays " +
                    "inner join team on team.teamid=plays.awayteamid " +
                    "WHERE team.teamname = " + "'" + teamName + "'",
                    [],
                    {outFormat: oracledb.ARRAY },

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
                        res.contentType('application/json').status(200);
                        res.render("index", {rows: result});
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
                        res.contentType('application/json').status(200);
                        res.render("index", {rows: result});
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
                    "SELECT fname, lname "
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
                        res.contentType('application/json').status(200);
                        res.render("index", {headers: result.metaData,
                                             values: result.rows});
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

                connection.execute("select matchID " +
                    "from plays " +
                    "inner join team on team.teamid=plays.awayteamid " +
                    "WHERE team.teamname = " + "'" + teamName + "'",
                    [],
                    {outFormat: oracledb.ARRAY },

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
                        res.contentType('application/json').status(200);
                        res.render("index", {rows: result});
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
                        res.contentType('application/json').status(200);
                        res.render("index", {rows: result});
                        doRelease(connection);
                    });
            });
        }
        searchTeam(teamName);
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