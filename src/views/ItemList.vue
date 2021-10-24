<template>
  <div>
    <div style="text-align: left">
      <el-input placeholder="请输入需要查询的商品条码" style="padding: 5px 10px 5px 0px; width: 220px" v-model="barcode">
        <i class="el-icon-search"></i>
      </el-input>
      <el-button type="primary" icon="el-icon-search" round @click="handleFind">查询</el-button>
      <el-button type="success" icon="el-icon-circle-plus-outline" round @click="handleCreate">添加</el-button>
    </div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="barcode"
          label="条码"
          width="160">
      </el-table-column>
      <el-table-column
          prop="name"
          label="名称"
          width="160">
      </el-table-column>
      <el-table-column
          label="价格"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.price + ' 元' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="type"
          label="类型"
          width="160">
        <template slot-scope="scope">
          {{ scope.row.type === '0' ? '计件商品' : '计重商品' }}
        </template>
      </el-table-column>
      <el-table-column
          prop="unit"
          label="单位"
          width="160">
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button icon="el-icon-edit" type="info" size="mini" @click="handleUpdate(scope.$index, scope.row)">编辑
          </el-button>
          <el-popover
              placement="top"
              width="160"
              ref="popover{{$index}}"
              v-model="scope.row.visible">
            <p>真的要删除该商品吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="primary" @click="scope.row.visible = false">取消</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">确定</el-button>
            </div>
          </el-popover>
          <el-button size="mini" icon="el-icon-delete" type="danger" v-popover:popover{{$index}} style="margin-left: 10px">删除</el-button>
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
import itemService from "../global/service/itemService";

export default {
  name: "ItemList",
  data() {
    return {
      tableData: [],
      pageable: {
        pageNumber: 1,
        pageSize: 10
      },
      totalElements: 0,
      barcode: '',
      visible: false,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let res = await itemService.getList(
          {
            barcode: this.barcode,
            page: this.pageable.pageNumber - 1,
            size: this.pageable.pageSize
          }
      );
      this.tableData = res.content
      this.totalElements = res.totalElements
    },
    handleFind() {
      this.getList()
      this.$message.success('查找成功')
    },
    handleCreate() {
      this.$router.push(
          {
            name: 'ItemCreate'
          }
      )
    },
    handleDelete(index, row) {
      this.visible = false
      itemService.delete(row.id).then(() => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    handleUpdate(index, row) {
      let id = row.id;
      this.$router.push(
          {
            name: 'ItemUpdate',
            query: {
              id: id,
            }
          }
      )
    },
    handleSizeChange(val) {
      this.pageable.pageSize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.$route.query.page = val;
      this.getList()
    }
  }
}
</script>

<style scoped>

</style>