<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-botton"
                    :is-active="isSelectAll"
                    @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components:{
    CheckButton
  },
  computed:{
    totalPrice(){
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((previousValue,item) => {
        return previousValue + item.price * item.count
      },0)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll(){
      if(this.$store.state.cartList.length == 0) return false
    //  使用filter
    //   return  !(this.$store.state.cartList.filter(item => !item.checked).length)
    //  使用find
         return  !this.$store.state.cartList.find(item => !item.checked)
    //
    //  使用遍历
    //   for(let n of this.$store.state.cartList){
    //     if (!n.checked){
    //       return false
    //     }
    //   }
    //   return true
    }
  },
  methods:{
    checkClick() {
      if (this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calculate(){
      if(!this.isSelectAll) {
        this.$toast.show('请选择您要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    display: flex;
    height: 40px;
    position: relative;
    background-color: #eee;
    line-height: 40px;
  }
  .check-content{
    display: flex;
    align-items: center;
    width: 80px;
  }
  .check-botton{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .price{
    flex: 1;
    text-align: center;
  }
  .calculate{
    background-color: aqua;
    width: 100px;
    text-align: center;
  }
</style>