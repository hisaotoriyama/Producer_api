// Vue.component("eachwagonunit", {
//   props: ["arg"],
//   template: "<tr><input type=\"checkbox\" id=\"checkbox\" v-model=\"arg.check\"><td>{{each_wagonuni}}</td></tr>"  
// })

var app = new Vue({
    el: "#app",
    data: {
      wagonuni_numbers:"",
      data_per_HeatNumber:"",
      chemcom:"",
      chemcom_per_wagonunit:"",
      rwb_info:"",
      wagonuni:"",
      login: "",
      password: "",
      token:"",
      select_wagonuni:"",
      alartMarkinSi:{
        color: "red",
        fontSize:"36px"
      }
    },

    // computed:{
    //   wagonunicheck: function(){
    //     if (this.wagonuni_numbers == true){
    //       this.toggle = true 
    //     }
    //   }
    // },
  
    methods: {
      createtoken: function () {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        const d = {
          headers: headers,
          method: "POST",
          body: ""
        };
        var self = this;
        fetch("/token_receiver_server?login=" + self.login + "&password=" + self.password, d)
        .then(res => res.json())
        .then(data => self.receive_rwb_info_with_data(data))
        // .then(data => self.token= data)
        // .then(this.receive_rwb_info())
      },

      receive_rwb_info: function () {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        const d = {
          headers: headers,
          method: "POST",
          body: ""
        };
        var self = this;
        fetch("/rwb_receiver_server?token=" + self.token , d)
        .then(res => res.json())
        .then(data => self.rwb_info= data.Result)
        .then(info => 
          self.wagonuni_numbers = info.map((v) => {
            return v.WagonUni
          })
          )
      },
      receive_rwb_info_with_data: function (data) {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        const d = {
          headers: headers,
          method: "POST",
          body: ""
        };
        var self = this;
        fetch("/rwb_receiver_server?token=" + data , d)
        .then(res => res.json())
        .then(data => self.rwb_info= data.Result)
        .then(info => 
          self.wagonuni_numbers = info.map((v) => {
            return v.WagonUni
          })
          )
      },
      receive_chemcom_per_unit: function () {
        const headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        };
        const d = {
          headers: headers,
          method: "POST",
          body: ""
        };
        var self = this;        
        fetch("/chemcom_receiver_server?token=" + self.token + "&wagonuni=" + self.wagonuni , d)
        .then(res => res.json())
        .then(data => self.chemcom = data.Result)
        .then(info => {
          self.data_per_HeatNumber = info.map((v) => {
            return "HeatNumber:" + v.HeatNumber + "   Si:" + v.SI + "   Fe:" + v.FE;
          })
        }
        )

    },
  }
})
