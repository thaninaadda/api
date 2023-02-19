/*

Nom fichier  server.js
Date creation :2023-02-9
detail: ce fichier sera le noyeau de l'api.

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


////////////////////////////////////////////////////////////////////////////////////////////////////


// permet d'obtenir la liste des parents dans la bd
app.get('/parent', function(req, res, next){ 
    res.locals.connection.query('Select * from parent', function(error, results, fields){
        if (error) throw error;
        res.json(results);
    })
});


// permet de creer un parent et inserer les donnees dans la table parent.
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// permet d'obtenir la liste des activites dans la bd

  app.get('/activite', function(req, res, next){ 
    res.locals.connection.query('Select * from activite', function(error, results, fields){
        if (error) throw error;
        res.json(results);
    })
});
// permet de creer une activite et inserer les donnees dans la table activite.
app.post('/creerActivite', (req, res) => {
    const { nomEvent, description, tarif, platforme, lieu, LienZoom } = req.body;
    const sql = 'INSERT INTO activite (nomEvent, description, tarif, platforme, lieu, LienZoom) VALUES (?, ?, ?, ?, ?, ?)';
    res.locals.connection.query(sql, [nomEvent, description, tarif, platforme, lieu, LienZoom], (err, result) => {
      if (err) {
        console.error('Error inserting data: ', err);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted');
      res.send('Data inserted');
    });
  });
/////////////////////////////////////////////////////////////////////////////////////////////////////


// permet d'obtenir la liste des benevoles dans la bd
  app.get('/benevole', function(req, res, next){ 
    res.locals.connection.query('Select * from benevole', function(error, results, fields){
        if (error) throw error;
        res.json(results);
    })
});


// permet de creer un benevole et inserer les donnees dans la table benevole.
app.post('/creerBenevole', (req, res) => {
    console.log('titi');
    const { nom, prenom, courriel, telephone, dateNaissance, lieuResidence, langue, dureeTotalAllaitement, experience, commentaire} = req.body;
    const sql = 'INSERT INTO benevole ( nom, prenom, courriel, telephone, dateNaissance, lieuResidence, langue, dureeTotalAllaitement, experience, commentaire) VALUES (?,?,?,?,?,?,?,?,?,?)';
    res.locals.connection.query(sql, [ nom, prenom, courriel, telephone, dateNaissance, lieuResidence, langue, dureeTotalAllaitement, experience, commentaire], (err, result) => {
      if (err) {
        console.error('Error inserting data: ', err);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted');
      res.send('Data inserted');
    });
  });