
var express = require('express');
var oracledb = require('oracledb');
var fs = require('file-system');
var app = express();
var path = require('path');
var sqlFile;
var sqlStatements;

fs.readFile("create_tables.sql", function(err, data) {
    if (err) {
        throw err;
    }

    sqlFile = data.toString();
    sqlStatements = sqlFile.split(",");
});

var connAttrs = {
    user: "ora_i2a0b",
    password: "a18986142",
    connectString: "localhost:1522/ug"
}

app.use(express.static("public"));

app.listen(8080);

oracledb.getConnection(connAttrs, function(err, connection) {
    if (err) {
        console.error(err.message);
        return;
    }
    connection.execute("SELECT managerID FROM user_profile", [],
        function(err, result) {
            if (err) {
                console.error(err.message);
                doRelease(connection);
                return;
            }
            console.log(result.metaData);
            console.log(result.rows);
            doRelease(connection);
        });
});

function searchTeam(teamName, show){


    oracledb.getConnection({
        user: "ora_i2a0b",
        password: "a18986142",
        connectString: "localhost:1522/ug"
    }, function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(sqlFile);
        connection.execute("SELECT " + teamName + " FROM Teams",
            [],
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
                console.log(result.metaData);
                console.log(result.rows);
                doRelease(connection);
            });
    });
}



function doRelease(connection) {
    connection.release(
        function(err) {
            if (err) { console.error(err.message); }
        }
    );
}
