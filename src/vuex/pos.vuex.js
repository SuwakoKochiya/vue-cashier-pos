import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


// Action-Types
export const ADD_ORDERLIST = 'ADD_ORDERLIST';
export const REMOVE_ORDERLIST = 'REMOVE_ORDERLIST';
export const RESET_ORDERLIST = 'RESET_ORDERLIST';
export const PAY_ORDERLIST = 'PAY_ORDERLIST';
export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';


export const store = new Vuex.Store({
  state: {
    orderList: [],        // 订单列表
    totalPrice: 0,        // 订单总价
  },

  mutations: {
    [ADD_ORDERLIST](state, payload) {
      const isExist = state.orderList.findIndex((value) => {
        return value.goodsId === payload.goodsId;
      });

      // 是否已经存在于购物车
      // 缓存旧的订单列表
      let orderList = state.orderList;
      if(isExist !== -1) {
        // 已经存在的订单项
        const whichOrder = orderList[isExist];
        // 数量加一
        whichOrder.goodsCount ++;
        // 价格增加
        whichOrder.price = payload['price'] * whichOrder['goodsCount'];
      }else {
        orderList.push(payload);
      }
    },
    [INCREASE_COUNT](state, payload) {
      state.orderList.map((value) => {
        // 计算商品单价
        const singleGoodsPrice = value.price / value.goodsCount;
        if(value.goodsId === payload.id) {
          value.goodsCount ++;
          value.price += singleGoodsPrice;
        }
      });
    },
    [DECREASE_COUNT](state, payload) {
      let flag = false;
      state.orderList.forEach((value) => {
        if(value.goodsId === payload.id) {
          // 计算单价
          const singleGoodsPrice = value.price / value.goodsCount;

          if(value.goodsCount <= 1) {
            flag = true;
          }
          value.goodsCount --;
          value.price -= singleGoodsPrice;

          return false;
        }
      });
      if(flag) {
        state.orderList = state.orderList.filter((value) => {
          return value.goodsId !== payload.id;
        });
      }
    },
    [RESET_ORDERLIST](state) {
      state.orderList = [];
      state.totalPrice = 0;
    },
    [PAY_ORDERLIST](state) {
      // 计算总价
      state.orderList.length === 0
        ? state.totalPrice = 0
        : state.orderList.forEach((value) => {
            state.totalPrice += value.price;
          });
    },
  },
});
