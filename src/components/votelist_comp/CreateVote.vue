<template>
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="form-group">
            <label>Title</label>
            <input type="email" v-model="title" class="form-control" placeholder="Title" required/>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" v-model="description" class="form-control"  placeholder="Description" required>
          </div>
          <div>
            <div>
              <label>Options</label>
            </div>
            <br/>
            <div class="form-group" v-for="option in options">
              <input type="text"  v-model="option.data" class="form-control"  placeholder="Description" >
            </div>
          </div>          
          <div>
            <a class="btn btn-primary" @click="addOption()"> Add Options</a>
          </div>
          <div>{{options}}</div>
          <div class="form-group">
            <input type="submit" @click.stop.prevent="createVote()" class="btn btn-primary" value="Submit"  placeholder="Description">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var request = require('superagent')
export default{
  name: 'CreateVote',
  components: {

  },
  data() {
    return {
      option_counter: 1,
      options: [],
      reqData: ''
    }
  },
  methods: {
    addOption(){
      var payload = {data: ''}
      this.options.push(payload)
      this.option_counter++
      console.log(this.options)
    },
    createVote(){
          self = this;
          var token = localStorage.getItem('token');
          var options_value= [];   
          var i;       
          this.options.map(function(e){
            options_value.push(e.data)
          })
          const optionData = new window.FormData()
          for(i=0;i<this.options.length;i++){
            optionData.append('options[]',this.options[i].data)
          }
          // var req_body = { 
          // }
          console.log(optionData)
          // console.log(req_body)
          request.post("http://electa-engine.herokuapp.com/users/vote")
            // .set({'Content-Type': 'application/json'})
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .send({title: self.title,description: self.description,optionData})
            .end(function(err,res){
              if (err) {
              self.isLoginProgress = '';
              console.log("Error Login");
              console.log(err);
              }
              if (res.status==200) {
                console.log(res)
                self.$router.push({ name: 'votelist_index'})
              }else {
                console.log(res)
                self.isLoginProgress = '';
                console.log("Gagal Buat Vote");
              }
          });
        }
  }
}
</script>
