<template>
  <div>
    <el-card>
      <div slot="header" style="text-align: left">
        <span><h1 class="el-icon-s-order"> 订单详情</h1></span>
      </div>
      <div>
        <el-table
            :data="Orders.orderItems"
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
        <div>下单时间: {{ Orders.createdAt }}</div>
        <div>合计: {{ Orders.totalAmount + ' 元' }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import orderService from "../global/service/orderService";

export default {
  name: "OrderDetailed",
  data() {
    return{
      Orders: {}
    }
  },
  created() {
    this.getOrderDetailed()
  },
  methods: {
    async getOrderDetailed(){
      this.id = this.$route.query.id
      let res = await   orderService.getOrderDetailed(this.id);
      this.Orders = res
    }
  }
}
</script>

<style scoped>

</style>