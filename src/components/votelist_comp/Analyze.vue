<template>
	<div class="">
		<div class="">
			<div>
				<label>
					<h4>Options Analysis</h4>
				</label>
			</div>		
			<div class="row">
				<div class="col-md-12">
					
				</div>
			</div>
			<div class="row">
				<div class="col-md-4">
					<OptionsAnalyze :data="optionsData"></OptionsAnalyze>
				</div>
				<div class="col-md-4">
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
//import map from './analyze_comp/Map'
export default {
	name: 'analyze', 
	data(){
		return{
			progressCounter: 1,
			optionsData: [],
			optionsStats: '',
		}
	}, 
	components: {
		OptionsAnalyze,
		OptionsStats,
		//map
	},
	computed: {
		selectedOpt: function(){ return this.$store.state.selectedOpt}
	},
	watch: {
		selectedOpt: function() {
			this.loadOptionStats()
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
		}
	},
	created(){
		this.loadData()
	}
}
</script>