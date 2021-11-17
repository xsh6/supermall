import Vue from "vue";
import Vuex from "vuex"
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

//1.安装插件
Vue.use(Vuex)

const state = {
    cartList:[]
}

//2.创建store对象
const store = new Vuex.Store({
    state:state,
    mutations:mutations,
    actions:actions,
    getters:getters
})

// 3.挂载到vue实例上
export default store