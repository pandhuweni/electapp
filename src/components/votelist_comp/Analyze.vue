<template>
	<div class="">
		<div class="">
			<div class="row">
				<div class="col-md-9">
          <div class="panel panel-default">
            <div class="panel-heading">
              <label><h4>{{vote_title}}</h4></label>
            </div>
            <div class="panel-body">
              <voteChart :chartData="chartData" :titleData="vote_title"></voteChart>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default">
            <div class="panel-body">
              <SideStats :stats="side_data"></SideStats>
            </div>
          </div>
				</div>
			</div>
			<div>
				<label>
					<h4>Options Analysis</h4>
				</label>
			</div>
			<div class="row">
				<div class="col-md-9">
					<OptionsAnalyze :data="optionsData"></OptionsAnalyze>
				</div>
				<div class="col-md-3">
					<OptionsStats :data="optionsStats"></OptionsStats>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
var request = require('superagent');
import OptionsAnalyze from './analyze_comp/OptionsAnalyze'
import OptionsStats from './analyze_comp/OptionsStats'
import voteChart from './analyze_comp/Vote'
import SideStats from './analyze_comp/SideStats'
//import map from './analyze_comp/Map'
export default {
	name: 'analyze',
	data(){
		return{
			progressCounter: 1,
			optionsData: [],
			optionsStats: '',
			side_data: [
        {participant:0, today: 0, top_region: "", top_education: "", top_profesion: "", modus_choice: "", max_value:"", min_value:""}
      ],
      chartData: '',
      vote_title: '',
		}
	},
	components: {
		OptionsAnalyze,
		OptionsStats,
		voteChart,
    SideStats
		//map
	},
	computed: {
		selectedOpt: function(){ return this.$store.state.selectedOpt},
		chartFilterX: function() { return this.$store.state.chartFilterX },
    chartFilterY: function() { return this.$store.state.chartFilterY },
	},
	watch: {
		selectedOpt: function() {
			this.loadOptionStats()
		},
    chartFilterX: function(){
      this.loadVoteChart()
    },
    chartFilterY: function(){
      this.loadVoteChart()
    }
	},
	methods: {
		loadData(){
      self = this;
      var vote_id = this.$route.params.id
      var auth_token = localStorage.getItem('token')
      request.get("http://electa-engine.herokuapp.com/analyzes/votes/"+vote_id)
        .set({'Content-Type': 'application/json '})
        .set({'Authorization': 'Token token='+auth_token})
        .set({'crossDomain': true})
        .end(function(err,res){
          if(err){
            console.log(err)
          }else{
            if(res.status==200){
            	console.log(res)
             	self.optionsData = res.body.data.vote.options
            }else{
              console.log(res)
            }
          }
        });
		},
		loadOptionStats(){
			self = this
			var id = self.selectedOpt
			var auth_token = localStorage.getItem('token')
      request.get("http://electa-engine.herokuapp.com/analyzes/vote_options/"+id)
        .set({'Content-Type': 'application/json '})
        .set({'Authorization': 'Token token='+auth_token})
        .set({'crossDomain': true})
        .end(function(err,res){
          if(err){
            console.log(err)
          }else{
            if(res.status==200){
            	console.log(res)
             	self.optionsStats = res.body.data
            }else{
              console.log(res)
            }
          }
        });
		},
		loadVoteChart(){
      var self = this
      var token = localStorage.getItem('token')
      var vote_id = this.$route.params.id
      request.get("http://electa-engine.herokuapp.com/analyzes/vote_statistics/"+vote_id
        +"?x_filter="+self.chartFilterX+"&y_filter="+self.chartFilterY)
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
              self.side_data[0].top_region = res.body.data.stat.top_region
              self.side_data[0].top_profesion = res.body.data.stat.top_profesion
              self.side_data[0].modus_choice = res.body.data.stat.modus_choice
              if (res.body.data.stat.max_value == "") {
                self.side_data[0].max_value = ""
              } else {
                var capt = ''
                if (res.body.data.stat.max_value[0]==null){
                  capt = 'Uncategorized'
                } else {
                  capt = res.body.data.stat.max_value[0]
                }
                self.side_data[0].max_value = res.body.data.stat.max_value[1] + " (" + capt + ")"
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
		}
	},
	created(){
		this.loadData()
		this.loadVoteChart()
	}
}
</script>
