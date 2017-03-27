// app.js

var oracledb = require('oracledb');

oracledb.getConnection({
     user: "ora_i2a0b",
     password: "a18986142",
     connectString: "localhost:1522/ug"
     }, function(err, connection) {
     if (err) {
          console.error(err.message);
          return;
     }
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
     });
});

function doRelease(connection) {
     connection.release(
          function(err) {
               if (err) {console.error(err.message);}
          }
     );
}