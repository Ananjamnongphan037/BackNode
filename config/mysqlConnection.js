const mysql = require('mysql2');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    multipleStatements: true
    });

    mysqlConnection.connect((err)=> {
        if(!err)
        console.log('Connection Established Successfully');
        else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });
module.exports  =   mysqlConnection;