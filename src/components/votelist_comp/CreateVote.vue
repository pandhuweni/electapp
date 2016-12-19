<template>
  <div class="row">
    <div class="col-md-12">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="form-group">
            <label>Title</label>
            <input type="email" class="form-control" placeholder="Title"/>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control"  placeholder="Description">
          </div>
          <Options></Options>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Options from './Options'
export default{
  name: 'CreateVote',
  components: {
    Options
  }
}
</script>
