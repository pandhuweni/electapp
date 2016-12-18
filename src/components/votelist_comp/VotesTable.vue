<template>
<div>
  <div class="col-md-9 col-sm-12 form-inline">
    <label>
      <select class="form-control">
        <option>10</option>
        <option>50</option>
        <option>100</option>
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
  <div class="col-md-12 table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Vote Title
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
          <td>
            {{vote.id}}
          </td>
          <td>
            {{vote.title}}
          </td>
          <td>
            <span class="label label-success">
              {{vote.status}}
            </span>
          </td>
          <td>
            <button class="btn btn-xs btn-info">
              <i class="fa fa-info"></i>
              Info
            </button>

            <button class="btn btn-xs btn-warning">
              <i class="fa fa-edit"></i>
              Edit
            </button>

            <button class="btn btn-xs btn-danger">
              <i class="fa fa-transh"></i>
              Delete
            </button>

            <button class="btn btn-xs btn-primary">
              <i class="fa fa-magic"></i>
              Analyze
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
  export default {
      name: 'VotesTable',
    data() {
      return{
        votes: [],
        page: 1,
        limit: 10,
        message: ''
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

      }
    },
    created: function(){
      this.getAllVotes()
    }
  }
</script>
