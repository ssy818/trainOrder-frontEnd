<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单中心</el-breadcrumb-item>
      <el-breadcrumb-item>我的订单</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="全部订单">
        <el-table :data="allOrderList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props1">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="订单号">
                  <span>{{props1.row.order_id}}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{props1.row.person_id}}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{props1.row.passenger_phone}}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{props1.row.create_time}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="乘客姓名" prop="real_name">
          </el-table-column>
          <el-table-column label="车次" prop="train_no">
          </el-table-column>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="乘车日期" prop="start_date" width="100px">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
          <el-table-column label="订单状态" prop="order_status">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未完成订单">
        <el-table :data="unpaidOrderList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props2">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="订单号">
                  <span>{{props2.row.order_id}}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{props2.row.person_id}}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{props2.row.passenger_phone}}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{props2.row.create_time}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="乘客姓名" prop="real_name">
          </el-table-column>
          <el-table-column label="车次" prop="train_no">
          </el-table-column>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="乘车日期" prop="start_date" width="100px">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="props2">
              <el-button type="text" @click="payOrder(props2.row)">支付</el-button>
              <el-button type="text" @click="cancelOrder(props2.row)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="未出行订单">
        <el-table :data="notTravelOrderList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props3">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="真实姓名">
                  <span>{{props3.row.real_name}}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{props3.row.person_id}}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{props3.row.passenger_phone}}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{props3.row.create_time}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单号" prop="order_id">
          </el-table-column>
          <el-table-column label="车次" prop="train_no">
          </el-table-column>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="乘车日期" prop="start_date">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="历史订单">
        <el-table :data="historyOrderList" style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props4">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单号">
                  <span>{{props4.row.order_id}}</span>
                </el-form-item>
                <el-form-item label="身份证号">
                  <span>{{props4.row.person_id}}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{props4.row.passenger_phone}}</span>
                </el-form-item>
                <el-form-item label="下单时间">
                  <span>{{props4.row.create_time}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="乘客姓名" prop="real_name">
          </el-table-column>
          <el-table-column label="车次" prop="train_no">
          </el-table-column>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="乘车日期" prop="start_date">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="历时" prop="last_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {
        allOrderList: [],
        unpaidOrderList: [],
        notTravelOrderList: [],
        historyOrderList: [],
        operateForm: {
          order_id: '',
          order_status: ''
        }
      }
    },
    created() {
      this.getAllOrderList();
      this.getNotTravelOrderList();
      this.getUnpaidOrderList();
      this.getHistoryOrderList();
    },
    methods: {
      async getAllOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findAllOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.allOrderList = res.data;
      },
      async getUnpaidOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findUnpaidOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.unpaidOrderList = res.data;
      },
      async getNotTravelOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findNotTravelOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.notTravelOrderList = res.data;
      },
      async getHistoryOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findHistoryOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.historyOrderList = res.data;
      },
      async payOrder(row) {
        const confirmResult = await this.$confirm("是否确定支付该订单？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).catch(err => err)
        if(confirmResult !== "confirm") {
          return this.$message.info("已取消支付");
        }
        this.operateForm.order_id = row.order_id;
        this.operateForm.order_status = "已支付";
        const {data:res} = await this.$http.post("updateOrder",this.operateForm);
        if(res.status !== 200) return this.$message.error("支付失败");
        else {
          this.$message.success("支付成功");
          this.getUnpaidOrderList();
        }
      },
      async cancelOrder(row) {
        const confirmResult = await this.$confirm("是否确定取消该订单？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).catch(err => err)
        if(confirmResult !== "confirm") {
          return this.$message.info("已取消订单");
        }
        this.operateForm.order_id = row.order_id;
        this.operateForm.order_status = "已取消";
        const {data:res} = await this.$http.post("updateOrder",this.operateForm);
        if(res.status !== 200) return this.$message.error("操作失败");
        else {
          this.$message.success("操作成功");
          this.getUnpaidOrderList();
        }
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
