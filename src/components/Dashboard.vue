<template>
	<div class="container-fluid">
	<div class="row">
    	<topstats></topstats>
	</div>
    <div class="row">
      <div class="col-md-9 col-sm-12">
        <div class="panel panel-default">
          <div class="panel-body">
            <chart></chart>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm12">
        <div class="panel panel-default">
          <div class="panel-body ">
            <sidestats :data="sideStatData"></sidestats>
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

export default {
	name: 'dashboard',
	components: {
    topstats,
    chart,
    sidestats,
    messages,
    history
	},
  data(){
    return {
      messages: [
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: true},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: true},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
      ],
      histories: [
        {data: "this is some kind of weird task"},
        {data: "this is some kind of weird task"},
        {data: "this is some kind of weird task"},
      ],
      sideStatData:{},
      chartData: {}
    }
  },
  methods: {
    loadChartStats(based_on) {
      self = this
      var token = localStorage.getItem('token')
      var req_body = {
        'email': self.email,
        'password': self.password
      }
      request.get("http://electa-engine.herokuapp.com/analyzes/dashboard_chart")
        .set({"Authorization": "Token token="+token})
        .set({'Content-Type': 'application/json'})
        .set({'crossDomain': true})
        .send(req_body)
        .end(function(err,res){
          if (err) {
            console.log(err)
          }
          if (res.status==200) {
            if(res.body.data.empty_data) {
              console.log(res)
            } else {
              self.sideStatData = res.body.data.stat
              self.chartData = res.body.data.chart
              console.log(res)
            }
          }else {
            console.log(res)
          }
        });
    }
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
