<template>
	<div class="container">
    <topstats></topstats>
    <div class="row">
      <div class="col-md-9">
        <div class="panel panel-default">
          <div class="panel-body">
            <chart></chart>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="panel panel-default">
          <div class="panel-body ">
            <sidestats></sidestats>
          </div>
        </div>
      </div>
  	</div>
    <div class="row">
      <div class="col-md-6">
        <messages title="Messages" :items="messages"></messages>
      </div>
      <div class="col-md-6">lajsdh sakjdh sakjdh akjdh sakjh</div>
    </div>
  </div>
</template>

<script>

import topstats from './dashboard_comp/TopStats'
import chart from './dashboard_comp/Chart'
import sidestats from './dashboard_comp/SideStats'
import messages from './dashboard_comp/Messages'

export default {
	name: 'dashboard',
	components: {
    topstats,
    chart,
    sidestats,
    messages
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
        {author:"aji", preview_msg: "this is some kind of weird task", isUnread: false},
      ]
    }
  }
}
</script>

<style>
  .panel-body {
    margin: 0px !important;
    padding: 0px !important;
  }
  .panel-default {
    border-radius: 5px !important;
  }
  .stat-card{
    margin: 15px;
    border: 1px #ddd solid;
    border-radius: 5px !important;
  }
  .stat-card .title {
    color: rgba(0,128,128,1) ;
  }
  .stat-card .sub-title {
    color: grey;
  }
</style>
