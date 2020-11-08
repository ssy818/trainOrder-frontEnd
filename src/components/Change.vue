<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单中心</el-breadcrumb-item>
      <el-breadcrumb-item>改签/退票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-tabs type="border-card">
      <el-tab-pane label="可改签">
        <el-table :data="changeableOrderList" style="width: 100%">
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
          <el-table-column label="开车日期" prop="start_date">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="props1">
              <el-button type="text" @click="changeDialog(props1.row)">改签</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="mm" :visible.sync="changeDialogVisible" width="80%">
          <el-form :inline="true" ref="changeFormRef" :model="changeForm" :rules="changeFormRules" label-width="80px">
            <el-form-item label="出发日期" label-width="90px" prop="start_date_2">
              <el-date-picker v-model="changeForm.start_date_2" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 140px;"></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getChangeTicketList">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table :data="changeTicketList" width="100%">
            <el-table-column label="车次" prop="train_no">
            </el-table-column>
            <el-table-column label="出发站" prop="start_station_name">
            </el-table-column>
            <el-table-column label="到达站" prop="end_station_name">
            </el-table-column>
            <el-table-column label="出发时间" prop="start_time">
            </el-table-column>
            <el-table-column label="到达时间" prop="end_time">
            </el-table-column>
            <el-table-column label="历时" prop="last_time">
            </el-table-column>
            <el-table-column label="特等座" prop="premier_seat">
            </el-table-column>
            <el-table-column label="一等座" prop="first_seat">
            </el-table-column>
            <el-table-column label="二等座" prop="second_seat">
            </el-table-column>
            <el-table-column label="软卧" prop="soft_sleeper">
            </el-table-column>
            <el-table-column label="硬卧" prop="hard_sleeper">
            </el-table-column>
            <el-table-column label="硬座" prop="hard_seat">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="orderChangeTicket(scope.row)">预订</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="可退票">
        <el-table :data="refundableOrderList" style="width: 100%">
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
          <el-table-column label="开车日期" prop="start_date">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time">
          </el-table-column>
          <el-table-column label="车厢号" prop="carriage_no">
          </el-table-column>
          <el-table-column label="座位类型" prop="seat_type">
          </el-table-column>
          <el-table-column label="座位号" prop="seat_position">
          </el-table-column>
          <el-table-column label="订单金额" prop="money">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope2">
              <el-button type="text" @click="refundOrder(scope2.row)">退票</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "Change",
    data() {
      return {
        changeableOrderList: [],
        refundableOrderList: [],
        changeTicketList: [],
        changeDialogVisible: false,
        changeForm: {
          train_no: '',
          start_station_name: '' ,
          end_station_name: '',
          start_date_1: '',
          start_date_2: '',
          query: "remaining"
        },
        operateForm: {
          order_id: '',
          order_status: ''
        },
        changeBuyForm: {
          order_id: '',
          person_id: '',
          real_name: '',
          passenger_phone: ''
        },
        orderChangeForm: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          end_station_name: '',
          start_time: '',
          end_time: ''
        },
        changeFormRules: {
          start_date_2: [
            { required: true, message: "请输入出发日期", trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getChangeableOrderList();
      this.getRefundableOrderList();
    },
    methods: {
      async getChangeableOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findChangeableOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.changeableOrderList = res.data;
      },
      async getRefundableOrderList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findRefundableOrder",{
          params:{
            user_phone:user_phone
          }
        });
        this.refundableOrderList = res.data;
      },
      async refundOrder(row) {
        const confirmResult = await this.$confirm("是否确定退票？","提示",{
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).catch(err => err)
        if(confirmResult !== "confirm") {
          return this.$message.info("已取消退票");
        }
        this.operateForm.order_id = row.order_id;
        this.operateForm.order_status = "已退票";
        const {data:res} = await this.$http.post("updateOrder",this.operateForm);
        if(res.status !== 200) return this.$message.error("退票失败");
        else {
          this.$message.success("退票成功");
          this.getRefundableOrderList();
        }
      },
      changeDialog(row) {
        this.changeDialogVisible = true;
        this.changeForm.train_no = row.train_no;
        this.changeForm.start_station_name = row.start_station_name;
        this.changeForm.end_station_name = row.end_station_name;
        this.changeForm.start_date_1 = row.start_date;
        this.changeBuyForm.order_id = row.order_id;
        this.changeBuyForm.person_id = row.person_id;
        this.changeBuyForm.real_name = row.real_name;
        this.changeBuyForm.passenger_phone = row.passenger_phone;
      },
      getChangeTicketList() {
        this.$refs.changeFormRef.validate(async valid => {
          if(!valid) return this.$message.error("输入有误");
          const {data:res} = await this.$http.post('findChangeTicket',this.changeForm);
          if(res.status !== 200) return this.$message.error("结果为空");
          else this.changeTicketList = res.data;
        })
      },
      async orderChangeTicket(row) {
        this.orderChangeForm.start_date = this.changeForm.start_date_2;
        this.orderChangeForm.train_no = row.train_no;
        this.orderChangeForm.start_station_name = row.start_station_name;
        this.orderChangeForm.end_station_name = row.end_station_name;
        this.orderChangeForm.start_time = row.start_time;
        this.orderChangeForm.end_time = row.end_time;
        const {data:res} = await this.$http.post("findDirectTicketDetail",this.orderChangeForm);
        window.sessionStorage.setItem("order",JSON.stringify([res.data]));
        window.sessionStorage.setItem("change",JSON.stringify(this.changeBuyForm));
        await this.$router.push('buy-tickets');
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
