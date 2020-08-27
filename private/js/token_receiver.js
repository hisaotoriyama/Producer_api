var app = new Vue({
    el: "#app",
    data: {
      login: "",
      password: "",
    },
  
    methods: {
      createtoken: function () {
        console.log("tokenreceiver GO!!")
        const data = "";
        console.log(JSON.stringify(data))
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        const d = {
          headers: headers,
          method: "POST",
          // body: JSON.stringify(data)
          body: ""
        };
        var self = this;
        console.log(this.login)
        console.log(this.password)
        return fetch("/token_receiver_server?login=" + self.login + "&password=" + self.password, d)
        // .then(e => e.json().then(j => j.result))
        .then((e) => console.log(e))
      }
    }})