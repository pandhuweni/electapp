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
  props: ['statsData'],
  data() {
    return {
      follower: 0,
      following: 0,
      total_vote: 0,
      today_participant: 0
    }
  },
  watch: {
    statsData: function(){
      this.syncData()
    }
  },
  methods: {
    test() {
      alert(this.follower)
    },
    syncData(){
      if (Object.keys(this.statsData).length > 0){
        this.follower = this.statsData.follower
        this.following = this.statsData.following
        this.total_vote = this.statsData.total_vote
        this.today_participant = this.statsData.today_participant
      }
    },
  },
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
