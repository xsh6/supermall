import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import toast from 'components/common/toast'
import vuelazyload from "vue-lazyload"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();  //此时的$bus作为事件总线，可以在子组件中放射$emit和监听$on事件的发生

Vue.use(toast) //安装toast插件

Vue.use(vuelazyload,{
  loading:require('./assets/img/common/2.jpg')
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
