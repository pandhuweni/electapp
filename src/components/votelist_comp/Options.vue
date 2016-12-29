<template>
<div>
  <div>
  	<label>Options</label>
  </div>
  <div>
    <a class="btn btn-primary" @click="addOption()"> Add Options</a>
  </div>
  <br/>
  <div class="form-group" v-for="option in options">
    <input type="text"  v-model="option.data" class="form-control"  placeholder="Description">
  </div>
</div>

</template>
<script>
export default {
  name: 'Options',
  data() {
  	return {
  		option_counter: 1,
  		options: []
  	}
  },
  methods: {
  	addOption(){
  		var payload = {id: this.option_counter, data: ''}
  		this.options.push(payload)
  		this.option_counter++
  		console.log(this.options)
  	}
  }
}
</script>
