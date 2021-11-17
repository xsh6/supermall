import {ADD_COUNTER,ADD_TO_CART} from "./mutations-type";
export default {
    addCart(context,payload){
        // payload新添加的商品
        // let oldProduct = null
        // for (let item of state.cartList){
        //     if (item.iid == payload.iid){
        //         oldProduct = item
        //     }
        // }

        // let index = state.cartList.indexOf(payload)
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            // 判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('商品数量加一')
            } else {
                payload.count = 1
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART,payload)
                resolve('添加一个新的商品')
            }
        })

        //2
        // if(index === -1) {
        //     let oldProduct = state.cartList[index]
        //     oldProduct.count += 1
        // } else {
        //     payload.count = 1
        //     state.cartList.push(payload)
        // }
        // state.cartList.push(payload)
    }
}