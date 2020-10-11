<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单中心</el-breadcrumb-item>
      <el-breadcrumb-item>改签/退票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="可改签">
        <el-table style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="身份证号">
                  <span></span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span></span>
                </el-form-item>
                <el-form-item label="下单日期">
                  <span></span>
                </el-form-item>
                <el-form-item label="订单金额">
                  <span></span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单号">
          </el-table-column>
          <el-table-column label="乘客姓名">
          </el-table-column>
          <el-table-column label="车次">
          </el-table-column>
          <el-table-column label="出发站">
          </el-table-column>
          <el-table-column label="到达站">
          </el-table-column>
          <el-table-column label="开车日期">
          </el-table-column>
          <el-table-column label="出发时间">
          </el-table-column>
          <el-table-column label="到达时间">
          </el-table-column>
          <el-table-column label="车厢号">
          </el-table-column>
          <el-table-column label="座位类型">
          </el-table-column>
          <el-table-column label="座位号">
          </el-table-column>
          <el-table-column label="操作">
            <el-button type="text">改签</el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="可退票">
        <el-table style="width: 100%">
          <el-table-column type="expand">
            <template>
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="身份证号">
                  <span></span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span></span>
                </el-form-item>
                <el-form-item label="下单日期">
                  <span></span>
                </el-form-item>
                <el-form-item label="订单金额">
                  <span></span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单号">
          </el-table-column>
          <el-table-column label="乘客姓名">
          </el-table-column>
          <el-table-column label="车次">
          </el-table-column>
          <el-table-column label="出发站">
          </el-table-column>
          <el-table-column label="到达站">
          </el-table-column>
          <el-table-column label="开车日期">
          </el-table-column>
          <el-table-column label="出发时间">
          </el-table-column>
          <el-table-column label="到达时间">
          </el-table-column>
          <el-table-column label="车厢号">
          </el-table-column>
          <el-table-column label="座位类型">
          </el-table-column>
          <el-table-column label="座位号">
          </el-table-column>
          <el-table-column label="操作">
            <el-button type="text">退票</el-button>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
      name: "Change"
    }
</script>

<style lang="less" scoped>

</style>
