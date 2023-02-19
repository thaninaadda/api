/*

Nom fichier  parent.js
Date creation :2023-02-9
detail: ce fichier contient le post et le get pour la table parent
createur : thanina
modification:
*/



const express = require('express');
const mysql = require('mysql');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 8080


app.listen(port, () => console.log('Listen on port ' + port))
//Mysql

app.use(function(req, res, next){
    res.locals.connection = mysql.createConnection({
    connectionLimit : 10,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'Allaitement'
});
    res.locals.connection.connect();
    next();
});
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// JSON body parser, there is no `extended` option here
app.use(express.json());

// URL-encoded body parser
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.get('/parent', function(req, res, next){ 
    res.locals.connection.query('Select * from parent', function(error, results, fields){
        if (error) throw error;
        res.json(results);
    })
});

app.post('/creerParent', (req, res) => {
    console.log('titi');
    const { nom, prenom, courriel, password } = req.body;
    const sql = 'INSERT INTO parent (nom, prenom, courriel, password) VALUES (?, ?, ?, ?)';
    res.locals.connection.query(sql, [nom, prenom, courriel, password], (err, result) => {
      if (err) {
        console.error('Error inserting data: ', err);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted');
      res.send('Data inserted');
    });
  });