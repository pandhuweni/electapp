<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-4">
					<OptionsAnalyze :data="optionsData"></OptionsAnalyze>
				</div>
			</div>
		</div>		
	</div>
</template>
<script>
var request = require('superagent');
import OptionsAnalyze from './analyze_comp/OptionsAnalyze'
export default {
	name: 'analyze', 
	data(){
		return{
			progressCounter: 1,
			optionsData: []
		}
	}, 
	components: {
		OptionsAnalyze
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
		}
	},
	created(){
		this.loadData()
	}
}
</script>