
var mysql = require('mysql');

var pool  = mysql.createPool({
    //host will be the name of the service from the docker-compose file. 
    host     : 'mysql',
    user     : 'root',
    password : 'password',
    database : 'DB_Lab'
});

module.exports={pool}