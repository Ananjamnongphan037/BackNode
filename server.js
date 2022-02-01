const express   =   require('express');
const mysqlConnection  =   require('./config/mysqlConnection');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());
app.use(cors());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers','Content-Type, Option, Authorization');

    return next();
 });
 

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));
// -----------------------------------------------------------------------------------------

app.get("/",(req,res)=>{

    res.sendFile(path.join(__dirname+'/public/index.html'));

});


// -----------------------------------------------------------------------------------------
//Creating GET Router to fetch all the user details from the MySQL Database
app.get('/users' , (req, res) => {
    mysqlConnection.query('SELECT * FROM `users` ', (err, result, fields) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to GET ID specific user detail from the MySQL database
app.get('/users/:id' , (req, res) => {
        
    var sql = "SELECT `ID`, `FirstName`, `LastName`, `Age` FROM `users` WHERE `users`.`ID` = ?"
    mysqlConnection.query(sql,  [req.params.id], (err, result, fields) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to INSERT specific user detail from the MySQL database
app.post('/users' , (req, res) => {
    const  AdID =   [
        FirstName   =   req.body.FirstName,
        LastName    =   req.body.LastName,
        Age         =   req.body.Age 
    ]
    var sql =   "INSERT INTO `users` (`FirstName`, `LastName`, `Age`) VALUES ( ?, ?, ?)"
    mysqlConnection.query( sql, AdID,
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

// Router to DELETE User WHERE ID specific user detail from the MySQL database
app.delete('/users/:id' , (req, res) => {

    var sql =   "DELETE FROM `users` WHERE `users`.`ID` = ?"
    mysqlConnection.query(sql, [req.params.id],
    (err, result) =>{
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

// Router to DELETE ALL specific user detail from the MySQL database
app.delete('/users' , (req, res) => {
    mysqlConnection.query('DELETE FROM `users` ',
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );

//Router to Update specific user detail from the MySQL database
app.put('/users/:id' , (req, res) => {
    const   firstname   =   req.body.FirstName,
            lastname    =   req.body.LastName,
            age         =   req.body.Age

    mysqlConnection.query(' UPDATE `users` SET `FirstName` = ? , `LastName` = ? , `Age` = ? WHERE `ID` = ? ',
    [ firstname, lastname, age,req.params.id ],
    (err, result) => {
        if (!err)
        res.send(result);
        else
        console.log(err);
    })
} );
