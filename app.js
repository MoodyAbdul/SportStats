// app.js

var oracledb = require('oracledb');
var fs = require('file-system');

var sqlFile;
var sqlStatements;

fs.readFile("create_tables.sql", function(err, data) {
    if (err) {
        throw err;
    }

    sqlFile = data.toString();
    sqlStatements = sqlFile.split(",");
});


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
     /*
     connection.execute( "CREATE TABLE User_Profile" +
                              "(managerID  VARCHAR2(30)," +
                              "name VARCHAR2(30)," +
                              "PRIMARY KEY (managerID))",
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
         });*/
         connection.execute( "SELECT managerID FROM user_profile",
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

         connection.execute( "insert into user_profile values +
                                                     "(moody123, 'moody');",
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

function doRelease(connection) {
     connection.release(
          function(err) {
               if (err) {console.error(err.message);}
          }
     );
}