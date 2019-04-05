// var mysql = require('mysql');
// var connection = mysql.createPool({
//     host: 'kbihm.com',
//     user: 'node_api',
//     database: 'node_api',
//     password: 'nodeapi123'
// });

// module.exports = connection

var mysql = require('mysql');
var connection = mysql.createPool({
    // host: 'sql9.freemysqlhosting.net',
    // user: 'sql9271664',
    // database: 'sql9271664',
    // password: 'yFB6c5Jvv8'
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'csp'
});

module.exports = connection