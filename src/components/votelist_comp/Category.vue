<template>
	<select class="form-control" v-model="selected">
    <option v-for="category in data" v-bind:value="category.id">
      {{ category.category }}
    </option>
  </select>
</template>

<script>
export default{
	name:'category',
	props: ['catList','selectedCat'],
	data(){
		return{
			data: [],
			selected:''
		}
	},
	watch: {
		catList:function(){
			this.data = this.catList
			this.selected = this.selectedCat
		},
		selected: function(){
			this.$store.dispatch('syncSelectedEdit', this.selected)
		}
	}
}
//selectedCat = detail.category
</script>

