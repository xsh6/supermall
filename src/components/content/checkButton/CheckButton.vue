<template>
  <div class="check-button" :class="{active:isActive}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props:{
    isActive:{
      type:Boolean,
      default:false
    }
  }
}
</script>

<style scoped>
  .check-button{
    border: 2px solid #aaa;
    border-radius: 50%;
  }
  .active{
    background-color: red;
    border-color: red;
  }
</style>