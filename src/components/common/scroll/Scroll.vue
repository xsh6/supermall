<template>
  <div class="warpper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data(){
    return{
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })
    //监听滚动的位置
    this.scroll.on('scroll',(position) => {
      this.$emit('scroll',position)
    })
  //  监听上拉事件
    this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
  },
  methods:{
    refresh(){
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>