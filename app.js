let express = require("express");
let app = express();
let fetch = require("node-fetch")
let path = require('path');
app.use(express.json());

app.post("/token_receiver_server", (req,res) => {
    console.log("good")
    console.log(req.query.login)
    console.log(req.query.password)
    var requested_query = "login=" + req.query.login +"&password=" + req.query.password
    const options = {
        method: 'POST',
        // body:    JSON.stringify(body),
        body: "",
        headers: { 'Content-Type': 'application/json' },
    }
    console.log(requested_query)
    fetch('https://customerservice.rusal.com/client/v1/authorization' + '?' + requested_query, options)
        .then((res) => res.json())
        .then((data) => console.log(data))
        // 次からがわからないところ
        .then((data) => {res.status(200).data})
}
);


app.use('/', express.static(path.join( __dirname, '/private')));

app.listen(3009)

