<template>
  <el-card>
    <div id="statistic" style="width: 100%;height:400px"></div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import orderService from "@/global/service/orderService";

export default {
  name: "OrderStatistic",
  data() {
    return {
      OrderStatistic: null,
      dates: [],
      quantities: [],
    }
  },
  created() {
    this.getOrderStatistic()
  },
  methods: {
    show() {
      this.OrderStatistic = echarts.init(document.getElementById('statistic'));
      this.OrderStatistic.setOption({
        title: {
          text: '订单统计',
          x: 'center',
          y: 'top'
        },
        xAxis: {
          type: 'category',
          name: '日期',
          data: this.dates
        },
        yAxis: {
          type: 'value',
          name: '订单数量',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          }
        },
        series: [
          {
            data: this.quantities,
            smooth: true,
            type: 'line'
          }
        ]
      })
    },
    async getOrderStatistic() {
      let res = await orderService.getOrderStatistic()
      this.dates = res.dates;
      this.quantities = res.quantities;
      this.show()
    }
  }
}
</script>

<style scoped>

</style>