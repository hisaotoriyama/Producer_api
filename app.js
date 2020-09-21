let express = require("express");
let app = express();
let fetch = require("node-fetch")
let path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/token_receiver_server", (req,res1) => {
    var requested_query = "login=" + req.query.login +"&password=" + req.query.password
    const options = {
        method: 'POST',
        body: "",
        headers: { 'Content-Type': 'application/json' },
    }
    fetch('https://customerservice.rusal.com/client/v1/authorization' + '?' + requested_query, options)
    .then((res2) => res2.json())
    .then((data) => res1.json(data.Result))
    }
);

app.post("/rwb_receiver_server", (req,res1) => {
    const data =  {
        "Token": req.query.token,
        "StartDate": "2020-09-01T01:20:42.028Z",
        "EndDate": "2020-09-20T01:20:42.028Z"
      };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }
    fetch('https://customerservice.rusal.com/client/v1/rwb', options)
    .then((res2) => res2.json())
    .then((data) => res1.json(data))
    }
);

app.post("/chemcom_receiver_server", (req,res1) => {
    const data =  {
        "Token": req.query.token,
        "WagonUni": [req.query.wagonuni]
      };
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }
    fetch('https://customerservice.rusal.com/client/v1/chemicalcomposition', options)
    .then((res2) => res2.json())
    .then((data) => res1.json(data))
    }
);

app.get("/", (req, res) => {
    res.status(200).send("Hello World WORLDDDD");
});


app.use('/', express.static(path.join( __dirname, '/private')));

app.listen(3009)
