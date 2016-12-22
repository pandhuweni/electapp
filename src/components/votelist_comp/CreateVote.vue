<template>
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="col-md-6 col-sm-12">
            <div class="form-group">
              <label>Title</label>
              <input type="email" v-model="title" class="form-control" placeholder="Title" required/>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text" v-model="description" class="form-control" placeholder="Description" rows="5" required ></textarea> 
            </div>

            <div class="form-group">
              <label>Featured Image</label>              
              <input type="file" />
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div>
              <div>
                <label>Options</label>
              </div>
              <div class="form-group" v-for="option in options">
                <input type="text"  v-model="option.data" class="form-control"  placeholder="Option">
              </div>            
              <div>
                <button class="btn btn-primary" @click="addOption()"> Add Options</button>
              </div>
            </div>
            <div>{{options}}</div>
            
          </div>
          <div class="col-md-12 col-sm-12">            
            <div class="form-group pull-right">
              <input type="submit" @click.stop.prevent="sendRequest()" class="btn btn-primary" value="Submit"  placeholder="Description">
            </div>
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
    }
  },
  methods: {
    addOption(){
      var payload = {data: ''}
      this.options.push(payload)
      this.option_counter++
      console.log(this.options)
    },
    sendRequest(){
          self = this;
          var token = 'ReVeTEPSA2xYAGQgCcVIiHNKUyKrI43Xd6oqjDJb'
          var options_value= []

          this.options.map(function(e){
            options_value.push(e.data)
          })
          var req_body = new window.FormData()
          req_body.append('title', self.title)
          req_body.append('description', self.description)
          self.options.map(function(e){
            req_body.append('options[]', e.data)
          })
          console.log(req_body.getAll('options[]'))
          request.post("http://electa-engine.herokuapp.com/users/vote")
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .send(req_body)
            .end(function(err,res){
              if (err) {
              self.isLoginProgress = '';
              console.log("Error Login");
              console.log(err);
              }
              if (res.status==201) {
                console.log(res)
                self.$router.push({ name: 'votelist_index'})
              }else {
                console.log(res)
              }
          });
        }
  }
}
</script>

<style scoped>
  .btn-primary{
   background-color:rgba(0,128,128,.9) ;
   border-width: 0px;
  }
  .btn-primary:focus{
    background-color:rgba(0,128,128,.9) ;
  }
  .btn-primary:active{
    background-color:rgba(0,128,128,.9) ;
  }
  .btn-primary:hover{
    background-color:rgba(0,128,128,1) ;
  }
</style>
