import {debounce} from "./utils";
export const itemListenMixin = {
    components:{

    },
    methods:{

    },
    data(){
        return {
            itemImgListen:null
        }
    },
    mounted() {
        let refresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListen = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImgListen)
    }
}