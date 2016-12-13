<template>
  <div>
    <card title="hai" :items="items"></card>
  </div>
</template>
<script>
import card from '../Card'
export default {
  name: 'messages', 
  components: {
  	card
  },
  data() {
		return {
			items: [2, 3]
		}
	}
}
</script>
<style>

</style>
