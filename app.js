let express = require("express");
let app = express();
let fetch = require("node-fetch")
let path = require('path');
app.use(express.json());

app.post("/token_receiver_server", (req,res1) => {
    var requested_query = "login=" + req.query.login +"&password=" + req.query.password
    const options = {
        method: 'POST',
        // body:    JSON.stringify(body),
        body: "",
        headers: { 'Content-Type': 'application/json' },
    }
    console.log(requested_query)
    fetch('https://customerservice.rusal.com/client/v1/authorization' + '?' + requested_query, options)
        .then((res2) => res2.json())
        .then((data) => {
        console.log(data);
        let token = data.Result
        console.log(token)
        return token
        })
        //やはり次の行を通じてtoken_receiver.jsに戻せない。
        .then((token) => res1.status(200).token)
    }
);


app.use('/', express.static(path.join( __dirname, '/private')));

app.listen(3009)

