const express = require('express');
const app = express();
app.use(express.json());
const port = 5000;
const db = require('./connection/database');
const router = require('./routes/routes');
app.use('/',router)

db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})



db.sync().then(() => {
    app.listen(port, (err) => {
        if (err) {
            throw err
        } else {
            console.log(`your app is running on PORT : ${port}`)
          }
        })
    }).catch(err => console.log("Error: " + err));