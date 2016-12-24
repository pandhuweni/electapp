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
              <label>Category</label>
              <select class="form-control" v-model="selected">
                <option v-bind:selected="selected">Uncategorized</option>
                <option v-for="category in categories" v-bind:value="category.id">
                  {{ category.category }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea type="text" v-model="description" class="form-control" placeholder="Description" rows="5" required ></textarea> 
            </div>

            <div class="form-group">
              <label>Featured Image</label>    
              <input v-if="!image"  type="file" @change="onFileChange" class="btn btn-primary btn-block" />
               <div class="col-xs-12 col-md-12 featured-image">
                <div href="#" class="thumbnail">
                  <a v-if="image"  href="#" @click.stop.prevent="removeImage" class="btn btn-default btn-sm pull-right absolute-top">
                    <i class="fa fa-close"></i>
                  </a>
                  <img  v-if="!image" src="http://vignette3.wikia.nocookie.net/shokugekinosoma/images/6/60/No_Image_Available.png/revision/latest?cb=20150708082716">    
                  <img  v-else="image" :src="image">             
                </div>
              </div>
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
      selected: '',
      categories: [],
      messages: '',
      image:'',
      optionImage:''
    }
  },
  methods: {
    addOption(){
      var payload = {data: ''}
      this.options.push(payload)
      this.option_counter++
      console.log(this.options)
    },
    uploadOptionImage(optionArray){

    },
    uploadFeaturedImage(id){ 
      self = this;
      var fileUpload = new FormData();
      var token = localStorage.getItem('token')
      fileUpload.append('raw_file', self.image);
      fileUpload.append('vote_id', id)
      console.log("Self Images"+self.image)
      request.post("http://electa-engine.herokuapp.com/files/votes")
        .set({'Authorization': 'Token token='+token})
        .set({'crossDomain': true})
        .send(fileUpload)
        .end(function(err,res){
          if (err) {  
          self.isLoginProgress = '';
          console.log("Error Post Image");
          console.log(err);
          }
          if (res.status==201) {
            console.log(res)
          }else {
            console.log(res)
            self.isLoginProgress = '';
            console.log("Upload Image Failed");
          }
      });
    },
    sendRequest(){
      self = this;
      var token = localStorage.getItem('token')
      var options_value= []
      this.options.map(function(e){
        options_value.push(e.data)
      })
      var req_body = new window.FormData()
      req_body.append('title', self.title)
      req_body.append('description', self.description)
      req_body.append('vote_category_id', self.selected)
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
          console.log("Error Post Vote");
          console.log(err);
          }
          if (res.status==201) {
            console.log(res)
            var featuredImageId = res.body.data.vote
            self.uploadFeaturedImage(featuredImageId)
            console.log("Proses Kelewat")
            self.$router.push({ name: 'votelist_index'})
          }else {
            console.log(res)
            self.isLoginProgress = '';
            console.log("Error Create Vote");
          }
      });
    },
    getAllCategories(){
      self = this;
      request.get("https://electa-engine.herokuapp.com/votes/categories")
        .set({'Content-Type': 'application/json'})
        .end(function(err,res){
          if (err) {
          console.log("Error Get Category");
          console.log(err);
          }
          if (res.status==200) {
            console.log(res)
            self.categories = res.body.data.categories
            console.log(self.categories)
            self.messages = res.body.status
          }else {
            console.log(res)
          }
      });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
        this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
      console.log(image)
    },    
    removeImage: function (e) {
      this.image = '';
    }
  },  
  created: function(){
    this.selected = 'Uncategorized'
    this.getAllCategories();

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
  .featured-image{
    padding: 0px;
    margin-top:20px;
  }
  .absolute-top{
    position: absolute;
    right: 5px;
    top: 5px;
    border-color: transparent !important;
    border-radius: 0px; 
  }
</style>
