<template>
	<div class="container-fluid">
	<div class="row">
    	<topstats :statsData="topStatsData"></topstats>
	</div>
    <div class="row">
      <div class="col-md-9 col-sm-12">
        <div class="panel panel-default">
          <div class="panel-body">
            <chart :chartData="chartData" :titleData="vote_title"></chart>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm12">
        <div class="panel panel-default">
          <div class="panel-body ">
            <sidestats :stats="side_data"></sidestats>
          </div>
        </div>
      </div>
  	</div>
    <div class="row">
      <div class="col-md-6">
        <messages title="Messages" :items="messages"></messages>
      </div>
      <div class="col-md-6">
        <history title="History" :items="histories"></history>
      </div>
    </div>
  </div>
</template>

<script>

import topstats from './dashboard_comp/TopStats'
import chart from './dashboard_comp/Chart'
import sidestats from './dashboard_comp/SideStats'
import messages from './dashboard_comp/Messages'
import history from './dashboard_comp/History'
var request = require('superagent');
export default {
	name: 'dashboard',
	components: {
    topstats,
    sidestats,
    messages,
    chart,
    history
	},
  data(){
    return {
      vote_title: '',
      messages: [],
      histories: [
        {data: "this is some kind of weird task"},
        {data: "this is some kind of weird task"},
        {data: "this is some kind of weird task"},
      ],
      side_data: [
        {participant:0, today: 0, top_region: "", top_education: "", top_profesion: "", modus_choice: "", max_value:"", min_value:""}
      ],
      chartData: '',
      topStatsData: {},
    }
  },
  computed: {
    currentTab: function() { return this.$store.state.sideStatsTab },
    chart_data: function() { return this.$store.state.chartData },
    chartFilterX: function() { return this.$store.state.chartFilterX },
    chartFilterY: function() { return this.$store.state.chartFilterY },
  },
  methods: {
    trySyncChart(data) {
      this.$store.dispatch('syncChartData', data)
    },
    loadChartStats(based_on) {
      var self = this
      var token = localStorage.getItem('token')
      request.get("http://electa-engine.herokuapp.com/analyzes/dashboard_chart?based_on="+based_on
        +"&x_filter="+self.chartFilterX+"&y_filter="+self.chartFilterY)
        .set({"Authorization": "Token token="+token})
        .set({'Content-Type': 'application/json'})
        .set({'crossDomain': true})
        .end(function(err,res){
          if (err) {
            console.log(err)
          }
          if (res.status==200) {
            if(res.body.data.empty_data) {
              console.log(res)
            } else {
              console.log(res)
              self.side_data[0].participant = res.body.data.stat.participant_count
              self.side_data[0].today = res.body.data.stat.today_participant_count
              self.side_data[0].top_region = res.body.data.stat.top_region
              self.side_data[0].top_education = res.body.data.stat.top_education
              self.side_data[0].modus_choice = res.body.data.stat.modus_choice
              if (res.body.data.stat.max_value == "") {
                self.side_data[0].max_value = ""
              } else {
                self.side_data[0].max_value = res.body.data.stat.max_value[1] + " (" + res.body.data.stat.max_value[0] + ")"
              }
              if (res.body.data.stat.min_value == ""){
                self.side_data[0].min_value = ""
              } else {
                self.side_data[0].min_value = res.body.data.stat.min_value[1] + " (" + res.body.data.stat.min_value[0] + ")"
              }              
              if (Object.keys(res.body.data.chart).length > 0){
                self.vote_title = res.body.data.stat.vote_title
                self.chartData = res.body.data.chart
              }
            }
          }else {
            console.log(res)
          }
        });
    },
    loadTopStats() {
      self = this
      var token = localStorage.getItem('token')

      request.get("http://electa-engine.herokuapp.com/analyzes/dashboard_top")
        .set({"Authorization": "Token token="+token})
        .set({'Content-Type': 'application/json'})
        .set({'crossDomain': true})
        .end(function(err,res){
          if (err) {
            console.log(err)
          }
          if (res.status==200) {
            console.log(res)
            self.topStatsData = {
              'follower': res.body.follower_count,
              'following': res.body.following_count,
              'total_vote': res.body.total_vote,
              'today_participant': res.body.today_participant_count
            }
          }else {
            console.log(res)
          }
        });
    },
    loadMessages() {
      self = this;
      self.loadSpin="fa fa-spinner fa-pulse fa-fw";
      var auth_token = localStorage.getItem('token')
      request.get("http://electa-engine.herokuapp.com/users/messages?page=1&limit=10")
        .set({'Content-Type': 'application/json '})
        .set({'Authorization': 'Token token='+auth_token})
        .set({'crossDomain': true})
        .end(function(err,res){
          if(err){
            console.log(err)
          }else{
            if(res.status==200){
              self.messages = res.body.data.messages
            }else{
              console.log(res)
            }
          }
        });
    }

  },
  watch: {
    currentTab: function(){
      this.loadChartStats(this.currentTab)
    },
    chartFilterX: function(){
      this.loadChartStats(this.currentTab)
    },
    chartFilterY: function(){
      this.loadChartStats(this.currentTab)
    }
  },
  created(){
    this.loadMessages()
    this.loadTopStats()
    this.loadChartStats('recent')
  }
}
</script>

<style scoped>
  .panel-body {
    margin: 0px !important;
    padding: 0px !important;
  }
  .panel-default {
    border-radius: 4px !important;
  }

</style>
