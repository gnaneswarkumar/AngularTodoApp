const express = require('express');
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");
const cron = require("node-cron");
const config = require('config');

const { port }  = config.get('server');


const {
    database_name,
    database_collection,
    database_connection_string
    } = config.get('database');

/**
 * ENV variables
 */
const {
    node_env //Not used, just only for demo
 } = require("./config");

const app = express();
app.use(cors());


const {
    transporter,
    mailOptions
 } = require("./mail");


cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
    transporter.sendMail(mailOptions, function (err, info) {
        if(err) 
          console.log(err);
        else
          console.log(info);
        });
  });

var database;

app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
    mongoClient.connect(database_connection_string, (error, client)=>{
        
        if(error){
            console.log("error - major ", error);
        }
        console.log("DB connection success!");
        database = client.db(database_name);
        console.log("database selected");
    });
});

app.get('/api/todo', (req, res)=>{
    database.collection(database_collection).find({}).toArray((error, result)=>{
        res.send(result);
    });
});

app.post("/api/todo", multer().none(), (req, res)=>{
    database.collection(database_collection).count({}, function(error, numOfDocs){
        database.collection(database_collection).insertOne({
            id: (numOfDocs+1).toString(),
            title: req.body.title,
            details: req.body.details
        });

        res.json("Added Successfully");
    })
});

app.delete("/api/todo", (req, res)=>{
    database.collection(database_collection).deleteOne({
        id: req.query.id
    });
    res.json("Deleted Successfully");
});