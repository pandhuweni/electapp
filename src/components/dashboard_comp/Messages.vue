<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4> {{title}}</h4>
    </div>
    <div class="panel-body">
      <ul class="card">
        <li v-for="item in items">
        <div class="wrapper" :class="{active: item.isUnread}">
          <div class="left text-center" >
            <div class="img"></div>
          </div>
          <div class="right">
            <div class="author">{{item.author}}</div>
            <div class="preview-msg">{{item.preview_msg}}</div>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'messages',
  props: ['title', 'items'],
  data() {
		return {

		}
	}
}
</script>
<style>
.panel-heading {
  background: transparent !important;
}
.card{
  height: 300px;
  overflow-y: scroll;
  line-height: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.card .left, .card .right {
  display: table-cell;
}
.card .left {
  vertical-align: middle;
  position: relative;
  width: 20%;
  height: 100%;
}
.card .right {
  position: relative;
  width: 100%;
}
.card .author {
  font-size: 16px;
  font-weight: 600;
}
.card li {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.card li .wrapper {
  display: table;
  width: 100%;
  cursor: pointer;
}
.card .wrapper.active {
  background: #F5F5F5;
}
.card .wrapper:hover {
 background: #F5F5F5;
}
.card .img{
  border-radius: 50% !important;
  margin: auto;
  width:35px;
  height: 35px;
  display: block;
  background: red;
}
</style>
