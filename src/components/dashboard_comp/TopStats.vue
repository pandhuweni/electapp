<template>
	<div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="stat-card text-center">
          <h3 class="title">{{follower}}</h3>
          <h5 class="sub-title">Follower</h5>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="stat-card text-center">
          <h3 class="title">{{following}}</h3>
          <h5 class="sub-title">Following</h5>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="stat-card text-center">
          <h3 class="title">{{total_vote}}</h3>
          <h5 class="sub-title">Total Vote</h5>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="stat-card text-center">
          <h3 class="title">{{today_participant}}</h3>
          <h5 class="sub-title">Today Participant</h5>
        </div>
      </div>
  </div>
</template>

<script>
var request = require('superagent')
export default {
	name: 'TopStats',
  data() {
    return {
      follower: 0,
      following: 0,
      total_vote: 0,
      today_participant: 0
    }
  },
  methods: {
    test() {
      alert(this.follower)
    },
    loadData() {
      self = this
      var token = localStorage.getItem('token')
      var req_body = {
        'email': self.email,
        'password': self.password
      }
      request.get("http://electa-engine.herokuapp.com/analyzes/dashboard_top")
        .set({"Authorization": "Token token="+token})
        .set({'Content-Type': 'application/json'})
        .set({'crossDomain': true})
        .send(req_body)
        .end(function(err,res){
          if (err) {
            console.log(err)
          }
          if (res.status==200) {
            self.follower = res.body.follower_count
            self.following = res.body.following_count
            self.total_vote = res.body.total_vote
            self.today_participant = res.body.today_participant_count
            console.log(res)

          }else {
            console.log(res)
          }
        });
    }
  },
  created: function(){
    this.loadData()
  }
}
</script>

<style scoped>
.stat-card{
	margin: 16px 0px;
	border: 1px #ddd solid;
	border-radius: 5px !important;
}
.stat-card .title {
	color: rgba(0,128,128,1) ;
}
.stat-card .sub-title {
	color: rgba(0,0,0,.65);
}
</style>
