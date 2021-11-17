<template>
<div class="recommend">
  <div v-for="item in recommends" class="recommend-item">
    <a :href="item.link">
      <img :src="item.image" alt="">
    </a>
    <div>{{item.title}}</div>
  </div>
</div>
</template>

<script>
export default {
  name: "RecommendView",
  props:{
    recommends:{
      type:Array,
      default(){
        return[]
      }
    }
  }
}
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    font-size: 12px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item{
    flex: 1;
    margin: 10px 0 20px;
  }
  .recommend-item img{
    width: 80%;
    margin-bottom: 10px;
  }
</style>