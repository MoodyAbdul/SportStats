var express = require('express');
var oracledb = require('oracledb');
var fs = require('file-system');
var app = express();
var path = require('path');
var sqlFile;
var sqlStatements;
var bodyParser = require('body-parser')


var connAttrs = {
    user: "ora_i2a0b",
    password: "a18986142",
    connectString: "localhost:1522/ug"
};

app.use(express.static("public"));
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.post('/searchTeam', function (req, res){
    var teamName = req.body.teamName;
    console.log(teamName);

    function searchTeam(teamName){
        console.log('searchTeam button clicked!');
        console.log(teamName);
        oracledb.getConnection(connAttrs, function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            console.log(sqlFile);
            connection.execute("SELECT " + teamName + " FROM team",
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

});



function doRelease(connection) {
    connection.release(
        function(err) {
            if (err) { console.error(err.message); }
        }
    );
}
console.log('end test');
app.listen(8080);
exports = module.exports = app;