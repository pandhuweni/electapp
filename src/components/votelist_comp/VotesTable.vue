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
                <td @click.stop.prevent="readVote(vote.id)">
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

                  <button class="btn btn-xs btn-danger">
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
  <div class="col-md-12">
    <nav aria-label="Page navigation">
      <ul class="pagination pull-right">
        <li>
          <a href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li>
          <a href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
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
        options: [
          { text: '20', value: '20' },
          { text: '50', value: '50' },
          { text: '100', value: '100' }
        ],
      }
    },
    methods:{
      getAllVotes(){
        self = this;
        var page_no = self.page;
        var limit_count = self.limit;
        var token = localStorage.getItem('token')
        request.get("http://electa-engine.herokuapp.com/users/vote?page="+page_no+"&limit="+limit_count)
            .set({'Content-Type': 'application/jsonp'})
            .set({'Authorization': 'Token token='+token})
            .set({'crossDomain': true})
            .end(function(err,res){
              if(err){
                console.log(err)
              }else{
                if(res.status=200){
                  console.log(res)
                  self.votes = res.body.data.votes
                  self.message = "votes="+res.body.data.count
                }else{
                  console.log(res)
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
        console.log(nows)
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
</style>