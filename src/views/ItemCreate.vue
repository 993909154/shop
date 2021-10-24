<template>
  <el-card style="width: 100%">
    <el-form :model="ItemForm" :rules="rules" ref="ItemForm" label-width="100px" class="demo-ItemForm">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ItemForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品条码" prop="barcode">
        <el-input v-model="ItemForm.barcode"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ItemForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="ItemForm.type" placeholder="请选择商品类型">
          <el-option label="计件商品" value="0"></el-option>
          <el-option label="计重商品" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品单位" prop="unit">
        <el-input v-model="ItemForm.unit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ItemForm')">立即创建</el-button>
        <el-button @click="resetForm('ItemForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import itemService from "../global/service/itemService";

export default {
  name: 'ItemCreate',
  data() {
    const validatePrice = (rule, value, callback) => {
      if(value === undefined || value === ''){
        callback(new Error('请输入价格'));
      }
      if(value === '0'){
        callback(new Error('价格不能为0'));
      }
      let regPos = /^((0{1}\.\d{1,2})|([1-9]\d*\.{1}\d{1,2})|([1-9]+\d*))$/;
      if(!regPos.test(value)){
        callback(new Error('请输入正确的数值'));
      }
      if(parseFloat(value) > 10000 || parseFloat(value) < 1){
        callback(new Error('金额在 1 - 10000 之间'));
      }else {
        callback();
      }
    }
    return {
      ItemForm: {
        unit:''
      },
      rules: {
        name: [
          {required: true, message: '请输入的商品名称', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 - 20 个字符', trigger: 'blur'}
        ],
        barcode: [
          {required: true, message: '请输入商品条码', trigger: 'blur'},
          {min: 5, max: 20, message: '长度在 5 - 20 个字符', trigger: 'blur'}
        ],
        price: [
          {required: true, validator: validatePrice, trigger: 'blur'}
        ],
        type: [
          {required: true, message: '请选择商品类型', trigger: 'blur'}
        ],
        unit:[
          {max: 5, message: '长度不超过 5 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          itemService.create(this.ItemForm).then(() => {
            this.$message.success('添加成功')
            this.$router.go(-1)
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$message.success('清除成功')
    }
  }
}
</script>