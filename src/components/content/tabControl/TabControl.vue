<template>
<div class="tab-control">
  <div class="tab-control-item"
       v-for="(item,index) in titles"
       :class="{active: index == currentIndex}"
       @click="tabClick(index)"
  >
    <span>{{item}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      currentIndex:0
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      this.$emit('tabclick',index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
    height: 44px;
    line-height: 44px;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>