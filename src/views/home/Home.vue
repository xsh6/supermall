<template>
  <div id="home">
    <nav-bar class="home-center"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 ref="tabControl1"
                 @tabclick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"
    ></tab-control>
    <scroll @scroll="contentScroll"
            :probe-type="3"
            ref="scroll"
            class="content"
            :pull-up-load="true"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   ref="tabControl2"
                   @tabclick="tabClick"
      ></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodList from "../../components/content/goods/GoodList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import {itemListenMixin} from "../../common/mixin";

import TabControl from "components/content/tabControl/TabControl";

import {getHomeMultidata,getHomeGoods} from "../../network/home";
import {debounce} from "../../common/utils";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      offsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  mixins:[itemListenMixin],
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
   this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {

    // //  监听item中图片加载完成
    // const refresh = debounce(this.$refs.scroll.refresh,100)
    // this.$bus.$on('itemImageLoad',() => {
    //   // this.$refs.scroll.scroll.refresh()
    //   refresh()
    // })
  },
  activated() {
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
    this.$bus.$off('itemImageLaod',this.itemImgListen)
  },
  methods:{
    /*
    * 事件监听
    * */
    swiperImageLoad(){
      //获取tabControl的offsetTop
      console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    loadMore(){
      this.getHomeGoods(this.currentType)

    },
    contentScroll(position){
      //设置backTop什么时候显示
      this.isShowBackTop = (-position.y) > 800
      //设置tanControl什么时候吸顶
      this.isTabFixed = (-position.y) > 537
    },
    backClick(){
      this.$refs.scroll.scroll.scrollTo(0,0,1000)
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
              break
        case 1:
          this.currentType = 'new'
              break
        case 2:
          this.currentType = 'sell'
              break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    /*
    * 网络请求
    * */
    getHomeMultidata(){
      //  1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home{
      /*padding-top: 44px;*/
      height: 100vh;
      position: relative;
    }
  .tab-control{
    position: relative;
    top: 0px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .home-center{
    background-color:var(--color-tint);
    color: #fff;

    /*使用浏览器的原生滚动，需要设置*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  .content{
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
</style>
