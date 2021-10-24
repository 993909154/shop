<template>
  <div>
    <div class="order">
      <el-card shadow="hover">
        <div slot="header" style="text-align: left">
          <span><h1 class="el-icon-shopping-cart-full"> 购物车</h1></span>
        </div>
        <div>
          <div style="text-align: right; padding-bottom: 10px">
            <el-button @click="show3 = !show3" size="mini" type="primary">{{ !show3 ? '展开' : '收缩' }}</el-button>
          </div>
          <div>
            <el-collapse-transition>
              <div v-show="show3">
                <el-table
                    :data="Cart.cartItems"
                    border
                    style="width: 100%">
                  <el-table-column
                      prop="barcode"
                      label="商品条码"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="name"
                      label="商品名称"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      label="商品价格">
                    <template slot-scope="scope">
                      {{ scope.row.price + ' 元' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="商品数量">
                    <template slot-scope="scope">
                      {{ scope.row.quantity + ' (' + scope.row.unit + ')' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                      label="商品总价">
                    <template slot-scope="scope">
                      {{ scope.row.totalPrice + ' 元' }}
                    </template>
                  </el-table-column>
                </el-table>
                <div>合计: {{ Cart.totalAmount + ' 元' }}</div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </el-card>
    </div>
    <div class="cart">
      <el-card shadow="hover">
        <div slot="header" style="text-align: left">
          <span><h1 class="el-icon-bank-card"> 扫码商品</h1></span>
        </div>
        <div>
          <el-form :model="Order" ref="ItemForm" label-width="100px" class="demo-ItemForm" :inline="true">
            <el-form-item label="商品条码:" prop="barcode">
              <el-input v-model="Order.barcode" placeholder="请输入商品条码"></el-input>
            </el-form-item>
            <el-form-item label="数量:" prop="quantity">
              <el-input v-model="Order.quantity"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addCart">加入购物车订单</el-button>
              <el-button type="success" @click="addOrder">付款完成</el-button>
              <el-button type="danger" @click="clearCart">清空购物车</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import cartService from "../global/service/cartService";
import orderService from "../global/service/orderService";

export default {
  name: 'Cart',
  data() {
    return {
      Order: {
        barcode: '',
        quantity: 1
      },
      Cart: {
        cartItems: [],
        totalAmount: 0,
      },
      show3: true
    }
  },
  created() {
    this.getCart()
  },
  methods: {
    addCart() {
      cartService.add(this.Order).then(() => {
        this.Order.barcode = ''
        this.getCart()
        this.$message.success('添加成功')
      })
    },
    async getCart() {
      let res = await cartService.getCart()
      this.Cart = res
    },
    addOrder() {
      orderService.addOrder(this.Cart).then(() => {
        this.Order.barcode = ''
        this.Order.quantity = 1
        this.getCart()
        this.$message.success('付款成功')
      })
    },
    clearCart() {
      cartService.clearCart().then(() => {
        this.Order.barcode = ''
        this.Order.quantity = 1
        this.getCart()
        this.$message.success('购物车已清空')
      })
    }
  }
}
</script>
