<template>
<div class="row">
  <div class="col-md-9 col-sm-12 form-inline">
    <label>
      <select class="form-control" v-model="selected">
        <option v-for="option in options" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
    </label>
      <label  class="control-label">/page</label>
  </div>
  <div class="col-md-3 col-sm-12">
    <div class="input-group">
        <input type="text" class="form-control" id="exampleInputAmount" placeholder="Search">
        <div class="input-group-addon">
          <i class="fa fa-search"></i>
        </div>
      </div>
  </div>
  <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
          <center>
            <p><i :class="loadSpin"></p>
          </center>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>
                  Vote Title
                </th>
                <th>
                  Category
                </th>
                <th>
                  Status
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>  
            <tbody>
              <tr v-for="vote in votes">
                <td @click.stop.prevent="readVote(vote.id)">
                  {{vote.title}}
                </td>
                <td v-if="vote.category == 'Uncategorized'" @click.stop.prevent="readVote(vote.id)">
                  {{vote.category}}
                </td>
                <td v-else @click.stop.prevent="readVote(vote.id)">
                  {{vote.category}}
                </td>
                <td @click.stop.prevent="readVote(vote.id)">
                  <span class="label" :class="labelColor">
                    {{getStatus(vote.id)}}
                  </span>
                </td>
                <td>
                  <button class="btn btn-xs btn-info">
                    <i class="fa fa-info"></i>
                    Info
                  </button>

                  <button class="btn btn-xs btn-warning" @click.stop.prevent="goToEditPage(vote.id)">
                    <i class="fa fa-edit"></i>
                    Edit
                  </button>

                  <button class="btn btn-xs btn-danger" data-toggle="modal" data-target="#modal-confirm" @click="confirmDeleteVote(vote.id)">
                    <i class="fa fa-transh"></i>
                    Delete
                  </button>

                  <button class="btn btn-xs btn-primary" @click.stop.prevent="goToAnalyzePage(vote.id)">
                    <i class="fa fa-magic"></i>
                    Analyze
                  </button>
                </td>
              </tr>
            </tbody>
          </table>                    
          
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-12">      
      <h5>Showing {{start}} to {{end}} from {{total}} {{message}}</h5>
    </div>
    <div class="col-md-6 col-sm-12">
      <nav aria-label="Page navigation">
        <ul class="pagination pull-right">
          <li>
            <a href="#" aria-label="Previous" @click.stop.prevent="decrementPage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li>
            <a href="#" aria-label="Next" @click.stop.prevent="incrementPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!--Modal Konfirmasi-->
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="modal-confirm">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Delete Confirmation</h4>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this vote?
            All data will be deleted include options and participant data.
          </div>
          <div class="modal-footer">            
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="deleteVote()">
              Yes
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">
              No
            </button>
          </div>
          
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  var request = require('superagent');  
  var dateFormat = require('dateformat');
  export default {
      name: 'VotesTable',
    data() {
      return{
        votes: [],
        page: '',
        limit: '',
        message: '',        
        selected: '',
        labelColor: '',
        statusVote: '',
        selected:'',
        loadSpin:'',
        dataDismiss:'',
        options: [
          { text: '20', value: '20' },
          { text: '50', value: '50' },
          { text: '100', value: '100' }
        ],
        start:'',
        end:'',
        count:'',
        total:'',
        deleteBool: false
      }
    },
    watch: {
      selected: function(){
        this.getAllVotes(this.page, this.selected)
        localStorage.setItem('selectedCountVotes',this.selected)
      },
      page: function(){
        this.getAllVotes(this.page, this.selected)
      }
    },
    methods:{
      getAllVotes(page_no, limit_count){
        self = this;        
        self.loadSpin="fa fa-spinner fa-pulse fa-fw";
        var token = localStorage.getItem('token')
        request.get("http://electa-engine.herokuapp.com/users/vote?page="+page_no+"&limit="+limit_count)
            .set({'Content-Type': 'application/jsonp'})
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .end(function(err,res){
              if(err){
                console.log(err)
                self.loadSpin=''
              }else{
                if(res.status=200){
                  console.log(res)
                  self.votes = res.body.data.votes
                  self.total = res.body.data.total
                  self.count = res.body.data.count
                  self.start = parseInt(self.selected)*(parseInt(page_no)-1)+1
                  self.end = parseInt(self.count)+self.start-1
                  self.loadSpin=''
                }else{
                  console.log(res)                  
                  self.loadSpin ='fa fa-window-close'
                }
              }
            });

      },
      readVote(id){
        this.$router.push({ name: 'votelist_read', params: { id: id }});
      },
      getStatus(id){
        var now = new Date()
        var nows = dateFormat(now)
        if(this.votes.ended_at < nows && this.votes.started_at > nows){         
          this.labelColor = "label-success" 
          return "Open"
        }else{
          this.labelColor = "label-danger"
          return "Closed"
        }
      },
      goToEditPage(id){
        this.$router.push({ name: 'votelist_edit', params: { id: id }});
      },
      goToAnalyzePage(id){
        this.$router.push({ name: 'vote_analyze', params: { id: id }});
      },
      deleteVote(){
        self = this;
        self.loadSpin="fa fa-spinner fa-pulse fa-fw";
        var deleteId= localStorage.getItem('deleteId')
        var auth_token = localStorage.getItem('token')
        request.delete("http://electa-engine.herokuapp.com/users/vote/"+deleteId)
        .set({'Content-Type': 'application/json '})
        .set({'Authorization': 'Token token='+auth_token})
        .set({'crossDomain': true})
        .end(function(err,res){
          if(err){
            console.log(err)
          }else{
            if(res.status==204){
              console.log(res)
              self.loadSpin=''
              self.getAllVotes(self.page, self.selected)
            }else{
              console.log(res)
              self.loadSpin ='fa fa-window-close'
            } 
          }
          self.loadSpin=''
          self.dataDismiss= 'modal'
          localStorage.setItem('deleteId',"")
          self.deleteBool = false
        });      
      },
      decrementPage(){
        if(this.page -1 <= 0){
          this.page = this.page;
        }else{
          this.page = this.page - 1
        }
      },
      incrementPage(){
        if(this.total <= parseInt(this.end)){
          this.page = this.page;
        }else{
          this.page = this.page + 1;
        }
      },
      confirmDeleteVote(id){
        console.log(id)
        localStorage.setItem("deleteId",id)
      }
    },
    created: function(){
      var selCount = localStorage.getItem('selectedCountVotes')
      this.page = 1
      if(selCount == null){
        this.selected = 20  
      }else{
        this.selected = selCount
      }
      this.getAllVotes(this.page, this.limit)
    }
  }
</script>

<style scoped>  
  tr:hover{
    cursor:pointer;
  }
  .pagination{
    margin-top: 0px;
  }
  .btn-primary{
    background-color: rgba(0,128,128,.8);
    border-color: rgba(0,128,128,1);
  }
</style>