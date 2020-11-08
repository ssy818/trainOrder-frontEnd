<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车票查询</el-breadcrumb-item>
      <el-breadcrumb-item>接续换乘</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="indirectFormRef" :model="indirectForm" :rules="indirectFormRules" class="form-inline">
          <el-form-item label="出发地" label-width="95px" prop="start_place">
            <el-input v-model="indirectForm.start_place" placeholder="北京" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="95px" prop="end_place">
            <el-input v-model="indirectForm.end_place" placeholder="上海" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="95px" prop="start_date">
            <el-date-picker v-model="indirectForm.start_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions" style="width: 150px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="换乘站" label-width="95px">
            <el-input v-model="indirectForm.mid_station_name" placeholder="北京" style="width: 150px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 50px;" @click="getIndirectTicketList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-table :data="indirectTicketList" border>
          <el-table-column label="出发站" prop="start_station_name">
          </el-table-column>
          <el-table-column label="车次" prop="train_no_1">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time_1">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time_1">
          </el-table-column>
          <el-table-column label="换乘车站" prop="mid_station_name">
          </el-table-column>
          <el-table-column label="接续时间" prop="mid_time">
          </el-table-column>
          <el-table-column label="车次" prop="train_no_2">
          </el-table-column>
          <el-table-column label="出发时间" prop="start_time_2">
          </el-table-column>
          <el-table-column label="到达时间" prop="end_time_2">
          </el-table-column>
          <el-table-column label="到达站" prop="end_station_name">
          </el-table-column>
          <el-table-column label="总用时" prop="last_time">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="getIndirectTicketDetail(scope.row,scope.$index)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <el-dialog title="查看列车信息" :visible.sync="checkDialogVisible" width="80%">
      <el-table :data="indirectTicketDetail" :span-method="objectSpanMethod">
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
          <template>
            <el-button type="text" @click="orderIndircetTicket">预订</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" style="margin-top: 15px;" @click="getPriceOrRemaining">{{indirectButton}}</el-button>
    </el-dialog>
  </div>
</template>

<script>
    export default {
      name: "Indirect",
      data() {
        return {
          indirectTicketList: [],
          indirectTicketDetail: [],
          checkDialogVisible: false,
          indirectButton: "查询票价",
          index: 0,
          indirectForm: {
            start_place: '',
            end_place: '',
            start_date: '',
            mid_station_name: ''
          },
          infoForm: {
            train_no_1: '',
            train_no_2: '',
            start_station_name: '',
            mid_station_name: '',
            end_station_name: '',
            start_time_1: '',
            end_time_1: '',
            start_time_2: '',
            end_time_2: '',
            start_date: '',
            query: "remaining"
          },
          orderIndirectForm: {
            start_date: '',
            train_no: '',
            start_station_name: '',
            end_station_name: '',
            start_time: '',
            end_time: ''
          },
          indirectFormRules: {
            start_place: [
              { required: true, message: "请输入出发地", trigger: blur}
            ],
            end_place: [
              { required: true, message: "请输入目的地", trigger: blur}
            ],
            start_date: [
              { required: true, message: "请输入出发日期", trigger: blur}
            ]
          },
          pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        }
      },
      methods: {
        getIndirectTicketList() {
          this.$refs.indirectFormRef.validate(async valid => {
            if(!valid) return this.$message.error("输入有误");
            const {data:res} = await this.$http.post("findIndirectTicket",this.indirectForm);
            if(res.status !== 200) return this.$message.error("结果为空");
            else this.indirectTicketList = res.data;
          })
        },
        async getIndirectTicketDetail(row,index) {
          this.index = index;
          this.checkDialogVisible = true;
          this.infoForm.train_no_1 = row.train_no_1;
          this.infoForm.train_no_2 = row.train_no_2;
          this.infoForm.start_station_name = row.start_station_name;
          this.infoForm.mid_station_name = row.mid_station_name;
          this.infoForm.end_station_name = row.end_station_name;
          this.infoForm.start_time_1 = row.start_time_1;
          this.infoForm.end_time_1 = row.end_time_1;
          this.infoForm.start_time_2 = row.start_time_2;
          this.infoForm.end_time_2 = row.end_time_2;
          this.infoForm.start_date = this.indirectForm.start_date;
          const {data:res} = await this.$http.post("findIndirectTicketDetail",this.infoForm);
          if(res.status !== 200) return this.$message.error("查询失败");
          else this.indirectTicketDetail = res.data;
        },
        getPriceOrRemaining() {
          if(this.indirectButton === "查询票价") {
            this.infoForm.query = "price";
            this.indirectButton = "查询余座";
            this.getIndirectTicketDetail(this.infoForm);
          }
          else {
            this.infoForm.query = "remaining";
            this.indirectButton = "查询票价";
            this.getIndirectTicketDetail(this.infoForm);
          }
        },
        async orderIndircetTicket() {
          this.orderIndirectForm.start_date = this.indirectForm.start_date;
          console.log(this.indirectTicketList[this.index])
          this.orderIndirectForm.train_no = this.indirectTicketList[this.index].train_no_1;
          this.orderIndirectForm.start_station_name = this.indirectTicketList[this.index].start_station_name;
          this.orderIndirectForm.end_station_name = this.indirectTicketList[this.index].mid_station_name;
          this.orderIndirectForm.start_time = this.indirectTicketList[this.index].start_time_1;
          this.orderIndirectForm.end_time = this.indirectTicketList[this.index].end_time_1;
          const {data:res1} = await this.$http.post("findDirectTicketDetail",this.orderIndirectForm);
          if(this.indirectTicketList[this.index].start_time_2 > this.indirectTicketList[this.index].end_time_1) {
            this.orderIndirectForm.start_date = this.indirectForm.start_date;
          }
          else {
            const date = new Date(this.indirectForm.start_date.replace(/-/,"/"));
            date.setDate(date.getDate() + 1);
            const year = date.getFullYear();
            let month = (date.getMonth() + 1).toString();
            let day = (date.getDate()).toString();
            if(month.length === 1) {
              month =  "0"  + month;
            }
            if(day.length === 1) {
              day =  "0"  + day;
            }
            this.orderIndirectForm.start_date = year + "-" + month + "-" + day;
          }
          this.orderIndirectForm.train_no = this.indirectTicketList[this.index].train_no_2;
          this.orderIndirectForm.start_station_name = this.indirectTicketList[this.index].mid_station_name;
          this.orderIndirectForm.end_station_name = this.indirectTicketList[this.index].end_station_name;
          this.orderIndirectForm.start_time = this.indirectTicketList[this.index].start_time_2;
          this.orderIndirectForm.end_time = this.indirectTicketList[this.index].end_time_2;
          const {data:res2} = await this.$http.post("findDirectTicketDetail",this.orderIndirectForm);
          window.sessionStorage.setItem("order",JSON.stringify([res1.data,res2.data]));
          await this.$router.push('buy-tickets');
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
          if (columnIndex === 12) {
            if (rowIndex % 2 === 0) {
              return {
                rowspan: 2,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              };
            }
          }
        }
      }
    }
</script>

<style lang="less" scoped>
  .clearfix {
    display: flex;
    align-items: center;
    .form-inline {
      transform: translate(0,10%);
      height: 50px;
    }
  }
</style>
