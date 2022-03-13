const express = require('express');
const cors = require("cors");
const pool = require("./connection");
const app = express();
const sqlDb = express.Router();
app.use(cors());


app.get('/test', function (req, res) {
    res.send({express: 'Test data'});
});

app.listen(process.env.PORT || 8080);

sqlDb.get('/testdb', async (req, res) => {
    const account = await pool.query(
        'SELECT * FROM Tweeter'
    );
    console.log(account.rows);
    res.send({account});
    res.json(account.rows);
})