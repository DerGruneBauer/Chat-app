const express = require('express');
const cors = require("cors");
const pool = require("./database");
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', pool);

app.get('/test', function (req, res) {
    res.send({express: 'Test data'});
});

app.listen(process.env.PORT || 8080);
