<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content"
            ref="scroll"
            @scroll="contentScroll"
            :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommend" ref="recommend"></good-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import {getDetail} from "../../network/datail";
import DetailSwiper from "./childComps/DetailSwiper";
import {Goods} from "../../network/datail";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import {Shop} from "../../network/datail";
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import {GoodsParam} from "../../network/datail";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import {getRecommend} from "../../network/datail";
import GoodList from "../../components/content/goods/GoodList";
import {itemListenMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";
import DetailBottomBar from "./childComps/DetailBottomBar";
import {backTopMixin} from "../../common/utils";;

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodList
  },
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:[],
      themeTopYs:[0,0,0,0],
      getThemeTopY:null,
      currentIndex:0,
    }
  },
  mixins:[itemListenMixin,backTopMixin],
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // console.log(res);
      //获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取商家信息
      this.shop = new Shop(data.shopInfo)
      //获取详情信息
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
      //获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })
    //请求推荐数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
    //4.给getThemeTopY赋值（对给this.themeTopYs的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);
    },100)
  },
  methods:{
    imageLoad() {
      this.$refs.scroll.scroll.refresh()

      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);

      this.getThemeTopY()
    },
    itemClick(index){
      this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    contentScroll(position) {
      const positionY = -position.y

      let length = this.themeTopYs.length
      for (let i = 0 ;i < length ; i++){
        if (this.currentIndex !== i &&((i < length -1 && positionY >= this.themeTopYs[i] && positionY <
        this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      this.isShowBackTop = -position.y > 800
    },
    addToCart() {
    //  获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
    //  将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res => {
        // this.isShow = true
        // this.message = res
        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = ''
        // },2000)
        // console.log(res);
        this.$toast.show(res,2000)
      })
    }
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLaod',this.itemImgListen)
  }
}
</script>

<style scoped>
  #detail{
    height: 100vh;
    position: relative;
    background-color: #fff;
    z-index: 9;
  }

  .content{
    height: calc(100% - 44px - 49px);
    background-color: #ffffff;
    overflow: hidden;
  }

  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>