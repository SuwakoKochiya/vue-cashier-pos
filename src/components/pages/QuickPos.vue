<template>
  <div class="pos-container">
    <el-row>
      <!-- 订餐 -->
      <el-col :span="7" class="pos-order">
        <el-tabs stretch type="border-card">
          <el-tab-pane label="点餐">
            <el-table
              stretch
              :data="tableData"
            >
              <el-table-column
                prop="goodsName"
                label="商品名称"
              ></el-table-column>
              <el-table-column
                prop="goodsCount"
                label="数量"
                width="60"
              ></el-table-column>
              <el-table-column
                prop="price"
                label="金额"
                width="70"
              ></el-table-column>
              <el-table-column
                label="操作"
                width="100"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="handleDeleteBtnClick(scope.row.goodsId)"
                  >Delete</el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="handleAddBtnClick(scope.row.goodsId)"
                  >Add</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pos-control-button">
              <el-button>挂单</el-button>
              <el-button
                @click="handleResetBtnClick"
              >重置</el-button>
              <el-button
                @click="handlePayBtnClick"
              >结账</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="挂单">
          </el-tab-pane>
          <el-tab-pane label="外卖">
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <!-- 常用商品 -->
      <el-col :span="17" class="pos-often-use">
        <div>
          <div class="often-use-title">
            <h3>常用商品</h3>
          </div>
          <div class="often-use-content" v-loading="oftenUseLoading">
            <ul>
              <li
                v-for="(value) of oftenUseGoodsData"
                :key="value.goodsId"
                :data-id="value.goodsId"
                @click="handleSelect($event)"
              >
                <span>{{ value.goodsName }}</span>
                <strong>  ¥{{ value.price }}</strong>
              </li>
            </ul>
          </div>
        </div>

        <!-- 商品tab -->
        <div class="pos-goods-tab" v-loading="goodsTabLoading">
          <el-tabs stretch>
            <el-tab-pane label="汉堡">
              <div class="goods-tab-hamburger">
                <el-card
                  v-for="value of selectGoodsTabData[0]"
                  :key="value.goodsId"
                  shadow="hover"
                >
                  <div class="card-top">
                    <img :src="value.goodsImg" alt="value.goodsName">
                  </div>
                  <div class="card-bottom clearfix">
                    <span class="bottom-desc">{{ value.goodsName }}</span>
                    <span class="bottom-desc">
                      <el-button
                      type="text"
                      >添加</el-button>
                    </span>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <div class="goods-tab-hamburger">
                <el-card
                  v-for="value of selectGoodsTabData[1]"
                  :key="value.goodsId"
                  shadow="hover"
                >
                  <div class="card-top">
                    <img :src="value.goodsImg" alt="value.goodsName">
                  </div>
                  <div class="card-bottom clearfix">
                    <span class="bottom-desc">{{ value.goodsName }}</span>
                    <span class="bottom-desc">
                      <el-button
                      type="text"
                      >添加</el-button>
                    </span>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <div class="goods-tab-hamburger">
                <el-card
                  v-for="value of selectGoodsTabData[2]"
                  :key="value.goodsId"
                  shadow="hover"
                >
                  <div class="card-top">
                    <img :src="value.goodsImg" alt="value.goodsName">
                  </div>
                  <div class="card-bottom clearfix">
                    <span class="bottom-desc">{{ value.goodsName }}</span>
                    <span class="bottom-desc">
                      <el-button
                      type="text"
                      >添加</el-button>
                    </span>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <div class="goods-tab-hamburger">
                <el-card
                  v-for="value of selectGoodsTabData[3]"
                  :key="value.goodsId"
                  shadow="hover"
                >
                  <div class="card-top">
                    <img :src="value.goodsImg" alt="value.goodsName">
                  </div>
                  <div class="card-bottom clearfix">
                    <span class="bottom-desc">{{ value.goodsName }}</span>
                    <span class="bottom-desc">
                      <el-button
                      type="text"
                      >添加</el-button>
                    </span>
                  </div>
                </el-card>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { mapMutations, mapState } from 'vuex';

import { 
  ADD_ORDERLIST, 
  INCREASE_COUNT, 
  DECREASE_COUNT,
  RESET_ORDERLIST,
  PAY_ORDERLIST,
} from '@/vuex/pos.vuex.js';
import bitbug from "../../assets/bitbug.jpg";
import han from "../../assets/han.jpg";
import hanbur from "../../assets/hanbur.jpg";
import fetch from '../../service/request';

export default {
  name: "QuickPos",
  data() {
    return {
      oftenUseGoodsData: [],    // 常用商品
      selectGoodsTabData: [],   // 选择商品标签页
      oftenUseLoading: true,
      goodsTabLoading: true,
    };
  },
  mounted() {
    fetch("http://jspang.com/DemoApi/oftenGoods.php")
      .then((data) => {
        this.oftenUseGoodsData = this.oftenUseGoodsData.concat(data);
        this.oftenUseLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });

    fetch('http://jspang.com/DemoApi/typeGoods.php')
      .then((data) => {
        this.selectGoodsTabData = this.selectGoodsTabData.concat(data);
        this.goodsTabLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapState({
      tableData: (state) => state.orderList,
      totalPrice: (state) => state.totalPrice,
    }),
  },
  methods: {
    ...mapMutations({
      add: ADD_ORDERLIST,
      increase: INCREASE_COUNT,
      decrease: DECREASE_COUNT,
      reset: RESET_ORDERLIST,
      pay: PAY_ORDERLIST,
    }),
    handleSelect(event) {
      // 筛选出点击的商品
      let id;
      switch (event.target.localName) {
        case 'span':
          id = event.target.parentNode.getAttribute('data-id');
          break;
        case 'strong':
          id = event.target.parentNode.getAttribute('data-id');
          break;
        default:
          id = event.target.getAttribute('data-id');
          break;
      }

      const selectedGoods = this.oftenUseGoodsData.find((value, index) => {
        return value.goodsId === Number(id);
      }); 

      this.add({ ...selectedGoods, goodsCount: 1 });
    },
    handleDeleteBtnClick(id) {
      this.decrease({ id });
    },
    handleAddBtnClick(id) {
      this.increase({ id });
    },
    handleResetBtnClick() {
      // 打开提示框
      this
        .$confirm('将要清空购物车, 是否继续?', '哇哇哇', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        .then(() => {
          this.reset();
          this.$message({
            type: 'success',
            message: '已清空您的订单!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消了操作!'
          });
        })
    },
    handlePayBtnClick() {
      this.pay();
      this.totalPrice !== 0
        ? this
            .$confirm( `将要支付 ${this.totalPrice} 元, 是否确认?`, '支付确认', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
            .then(() => {
              this.reset();
              this.$message({
                type: 'success',
                message: '支付成功! 欢迎再次选购!',
              });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '支付失败!'
              });
            })
        : this.$message({
            type: 'warning',
            message: '还没有选购商品哦!',
          });
    },
  },
};
</script>


<style scoped>
.pos-container {
  width: 92%;
  height: 100%;
  margin-left: 8%;
}

.pos-container .el-row {
  height: 100%;
}

.pos-container .el-row .el-col {
  height: 100%;
}

.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}

.pos-control-button {
  text-align: center;
  line-height: 100px;
}

.el-col {
  background-color: #eff2fa;
}

.pos-often-use .often-use-title {
  padding-left: 10px;
  line-height: 50px;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ddd;
  color: grey;
}

.pos-often-use .often-use-content {
  padding: 30px;
  border-bottom: 1px solid #ddd;
}

.often-use-content ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.often-use-content ul li {
  min-width: 120px;
  height: 40px;
  margin: 10px;
  padding: 0 24px;
  background-color: #fff;
  border-radius: 6px;
  line-height: 40px;
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.often-use-content ul li:hover {
  box-shadow: 0 0 2px 3px #ddd;
}

.often-use-content ul li strong {
  color: #09c;
}

.goods-tab-hamburger {
  display: flex;
  justify-content: space-around;
}

.goods-tab-hamburger .bottom-desc {
  display: inline-block;
  margin: 0 5px;
  color: #999;
}

img {
  width: 160px;
  height: 160px;
}
</style>

