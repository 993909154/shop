<template>
  <div style="padding-top: 10px">
    <el-table
        :data="OrderList"
        border
        style="width: 80%">
      <el-table-column
          prop="id"
          label="id">
      </el-table-column>
      <el-table-column
          label="总金额">
        <template slot-scope="scope">
          {{scope.row.totalAmount + ' 元'}}
        </template>
      </el-table-column>
      <el-table-column
          prop="createdAt"
          label="下单时间">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-s-order" type="info" size="mini" @click="handleDetailed(scope.$index, scope.row)">详细
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageable.pageNumber"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageable.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import orderService from "../global/service/orderService";

export default {
  name: "OrderList",
  data() {
    return {
      OrderList: [
      ],
      pageable: {
        pageNumber: 1,
        pageSize: 10
      },
      totalElements: 0,
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    async getOrder() {
      let res = await orderService.getList(
          {
            page: this.pageable.pageNumber - 1,
            size: this.pageable.pageSize
          }
      );
      this.OrderList = res.content
      this.totalElements = res.totalElements
    },
    handleSizeChange(val) {
      this.pageable.pageSize = val;
      this.getOrder()
    },
    handleCurrentChange(val) {
      this.$route.query.page = val;
      this.getOrder()
    },
    handleDetailed(index, row){
      let id = row.id
      this.$router.push({
        name: 'OrderDetailed',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>