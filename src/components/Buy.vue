<template>
  <div>
    <div style="height: 80px;">
      <el-steps :active="0">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <el-card v-if="passengerCardVisible()" class="box-card">
      <div slot="header" class="clearfix">
        <span>添加乘客</span>
      </div>
      <div class="text item">
        <el-table ref="passengerTableRef" :data="passengerList" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" :selectable="findPassengerSelectable">
          </el-table-column>
          <el-table-column label="真实姓名" prop="real_name">
          </el-table-column>
          <el-table-column label="身份证号" prop="person_id">
          </el-table-column>
          <el-table-column label="手机号" prop="passenger_phone">
          </el-table-column>
        </el-table>
        <el-tag v-for="(tag,index) in passengerSelection" :key="index" closable style="margin-top: 15px;" @close="handleCloseTag(tag)">
          {{tag.real_name}}
        </el-tag>
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span>车次信息</span>
      </div>
      <div class="text item">
        <el-table :data="orderList" border width="100%">
          <el-table-column label="出发日期" prop="start_date">
          </el-table-column>
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
          <el-table-column label="选座" width="300px">
            <template slot-scope="scope">
              <el-radio-group v-model="radioList[scope.$index]">
                <el-radio-button v-if="scope.row.premier_seat_remaining !== '--' && scope.row.premier_seat_remaining !== '0'" label="特等座">
                </el-radio-button>
                <el-radio-button v-if="scope.row.first_seat_remaining !== '--' && scope.row.first_seat_remaining !== '0'" label="一等座">
                </el-radio-button>
                <el-radio-button v-if="scope.row.second_seat_remaining !== '--' && scope.row.second_seat_remaining !== '0'" label="二等座">
                </el-radio-button>
                <el-radio-button v-if="scope.row.soft_sleeper_remaining !== '--' && scope.row.soft_sleeper_remaining !== '0'" label="二等座">
                </el-radio-button>
                <el-radio-button v-if="scope.row.hard_sleeper_remaining !== '--' && scope.row.hard_sleeper_remaining !== '0'" label="二等座">
                </el-radio-button>
                <el-radio-button v-if="scope.row.hard_seat_remaining !== '--' && scope.row.hard_seat_remaining !== '0'" label="二等座">
                </el-radio-button>
              </el-radio-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-row style="margin-top: 20px;">
      <el-button type="info">上一步</el-button>
      <el-button type="primary" @click="submitOrder">提交订单</el-button>
    </el-row>
    <el-dialog title="选择座位" :visible.sync="orderDialogVisible">
      <div v-if="seatOptions[0]">
        <div v-for="o in orderList.length" :key="o">
          {{"订单"+o}}
          <span v-if="radioList[o-1] === '软卧' || radioList[o-1] === '硬卧' || radioList[o-1] ==='硬座'">
            系统将随机为您申请席位，暂不支持自选席位。
          </span>
          <div v-if="radioList[o-1] === '特等座' || radioList[o-1] === '一等座' || radioList[o-1] === '二等座'">
            <el-row v-for="p in passengerSelection.length" :key="p" style="margin-top: 10px;">
              <el-select v-model="carriageSelection[passengerSelection.length*(o-1)+p-1]" @change="selectChange(o,p)">
                <el-option v-for="item in carriageOptions[passengerSelection.length*(o-1)+p-1]" :key="item.carriage_no" :label="item.carriage_no" :value="item.carriage_no" :disabled="item.remaining == 0">
                </el-option>
              </el-select>
              <el-radio-group v-model="seatSelection[passengerSelection.length*(o-1)+p-1]" @change="radioChange(o,p)" style="margin-left: 15px;">
                <el-radio v-for="item in seatOptions[passengerSelection.length*(o-1)+p-1][parseInt(carriageSelection[passengerSelection.length*(o-1)+p-1])-1]" :key="item.seat_position" :label="item.seat_position" :disabled="item.remaining == 0" border>
                </el-radio>
              </el-radio-group>
            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderDialogVisible = false">返回修改</el-button>
        <el-button type="primary" @click="addOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Buy",
    data() {
      return {
        orderList: [],
        radioList: [],
        passengerList: [],
        passengerSelectable: [],
        passengerSelection: [],
        carriageOptions: [],
        carriageSelection: [],
        carriageSelectionPre: [],
        seatOptions: [],
        seatSelection: [],
        seatSelectionPre: [],
        orderDialogVisible: false,
        premierSeat: 'A',
        firstSeat: 'A',
        secondSeat: 'A',
        orderDetail: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          end_station_name: '',
          start_time: '',
          end_time: '',
          last_time: '',
          premier_seat_remaining: '',
          first_seat_remaining: '',
          second_seat_remaining: '',
          soft_sleeper_remaining: '',
          hard_sleeper_remaining: '',
          hard_seat_remaining: '',
          premier_seat_price: '',
          first_seat_price: '',
          second_seat_price: '',
          soft_sleeper_price: '',
          hard_sleeper_price: '',
          hard_seat_price: '',
        },
        carriageForm: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          end_station_name: '',
          seat_type: ''
        },
        orderForm: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          end_station_name: '',
          seat_type: '',
          carriage_no: '',
          seat_position: '',
          user_phone: '',
          person_id: '',
          create_time: ''
        },
        passengerForm: {
          person_id: '',
          real_name: '',
          passenger_phone: ''
        },
        passengerOrderForm: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          user_phone: '',
          person_id: ''
        },
        operateForm: {
          order_id: '',
          order_status: ''
        }
      }
    },
    async created() {
      await this.getOrderList();
      await this.getPassengerList();
      await this.getPassengerSelectable();
    },
    destroyed() {
      window.sessionStorage.removeItem("order");
      window.sessionStorage.removeItem("change");
    },
    methods: {
      async getOrderList() {
        if(window.sessionStorage.getItem("order") != null) {
          for (let i = 0; i < JSON.parse(window.sessionStorage.getItem("order")).length; i++) {
            const order = JSON.parse(window.sessionStorage.getItem("order"))[i];
            this.orderList.push(order);
          }
        }
      },
      passengerCardVisible: function () {
        return window.sessionStorage.getItem("change") == null;
      },
      async getPassengerList() {
        const user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
        const {data:res} = await this.$http.get("findPassenger",{
          params:{
            user_phone:user_phone,
          }
        })
        if(res.status !== 200) return this.$message.error("无乘客");
        else {
          this.passengerList = res.data;
        }
      },
      async getPassengerSelectable() {
        for(let i = 0; i < this.passengerList.length; i++) {
          for (let j = 0; j < this.orderList.length; j++) {
            this.passengerOrderForm.start_date = this.orderList[j].start_date;
            this.passengerOrderForm.train_no = this.orderList[j].train_no;
            this.passengerOrderForm.start_station_name = this.orderList[j].start_station_name;
            this.passengerOrderForm.user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
            this.passengerOrderForm.person_id = this.passengerList[i].person_id;
            const {data: res} = await this.$http.post("findPassengerOrder", this.passengerOrderForm);
            if (res.status !== 200) {
              this.passengerSelectable.push(false);
              break;
            }
          }
          if(this.passengerSelectable.length < i+1) {
            this.passengerSelectable.push(true);
          }
        }
        console.log(this.passengerSelectable)
      },
      findPassengerSelectable(row,index) {
        return this.passengerSelectable[index];
      },
      handleSelectionChange(val) {
        this.passengerSelection = val;
      },
      handleCloseTag(tag) {
        this.passengerSelection.splice(this.passengerSelection.indexOf(tag),1);
        this.$refs.passengerTableRef.toggleRowSelection(tag);
      },
      async submitOrder() {
        if(window.sessionStorage.getItem("change") != null) {
          this.passengerForm.person_id = JSON.parse(window.sessionStorage.getItem("change"))["person_id"];
          this.passengerForm.real_name = JSON.parse(window.sessionStorage.getItem("change"))["real_name"];
          this.passengerForm.passenger_phone = JSON.parse(window.sessionStorage.getItem("change"))["passenger_phone"];
          this.passengerSelection = [this.passengerForm];
        }
        if(this.radioList.length !== this.orderList.length || this.passengerSelection.length === 0) {
          return this.$message.error("未完成全部操作");
        }
        for(let i = 0; i < this.orderList.length; i++) {
          this.carriageForm.start_date = this.orderList[i].start_date;
          this.carriageForm.train_no = this.orderList[i].train_no;
          this.carriageForm.start_station_name = this.orderList[i].start_station_name;
          this.carriageForm.end_station_name = this.orderList[i].end_station_name;
          this.carriageForm.seat_type = this.radioList[i];
          const {data:res1} = await this.$http.post("findCarriageRemaining",this.carriageForm);
          const {data:res2} = await this.$http.post("findCarriageSeatRemaining",this.carriageForm);
          console.log(res2.data)
          for(let j = 0; j < this.passengerSelection.length; j++) {
            this.carriageOptions.push(res1.data);
            this.carriageSelection.push('');
            this.carriageSelectionPre.push('');
            this.seatOptions.push(res2.data);
            this.seatSelection.push('');
            this.seatSelectionPre.push('');
          }
        }
        this.orderDialogVisible = true;
        console.log(this.carriageOptions)
      },
      selectChange(o,p) {
        const index = this.passengerSelection.length*(o-1)+p-1;
        if(this.carriageSelectionPre[index] === '') {
          for(let i = 0; i < this.carriageOptions[index].length; i++) {
            if(this.carriageOptions[index][i].carriage_no == this.carriageSelection[index]) {
              this.carriageOptions[index][i].remaining--;
            }
          }
        }
        else {
          for(let i = 0; i < this.carriageOptions[index].length; i++) {
            if(this.carriageOptions[index][i].carriage_no == this.carriageSelectionPre[index]) {
              this.carriageOptions[index][i].remaining++;
            }
            if(this.carriageOptions[index][i].carriage_no == this.carriageSelection[index]) {
              this.carriageOptions[index][i].remaining--;
            }
          }
          for(let j = 0; j < this.seatOptions[index][parseInt(this.carriageSelectionPre[index])-1].length; j++) {
            if (this.seatOptions[index][parseInt(this.carriageSelectionPre[index]) - 1][j].seat_position === this.seatSelection[index]) {
              this.seatOptions[index][parseInt(this.carriageSelectionPre[index]) - 1][j].remaining++;
            }
          }
          for(let j = 0; j < this.seatOptions[index][parseInt(this.carriageSelection[index])-1].length; j++) {
            if(this.seatOptions[index][parseInt(this.carriageSelection[index])-1][j].seat_position === this.seatSelection[index]) {
              this.seatOptions[index][parseInt(this.carriageSelection[index])-1][j].remaining--;
            }
          }
          console.log(this.seatOptions[index]);
        }
        this.carriageSelectionPre[index] = this.carriageSelection[index];
      },
      radioChange(o,p) {
        const index = this.passengerSelection.length*(o-1)+p-1;
        if(this.seatSelectionPre[index] === '') {
          for(let i = 0; i < this.seatOptions[index][parseInt(this.carriageSelection[index])-1].length; i++) {
            if(this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].seat_position === this.seatSelection[index]) {
              this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].remaining--;
            }
          }
        }
        else {
          for(let i = 0; i < this.seatOptions[index][parseInt(this.carriageSelection[index])-1].length; i++) {
            if(this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].seat_position === this.seatSelectionPre[index]) {
              this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].remaining++;
              console.log(false);
            }
            if(this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].seat_position === this.seatSelection[index]) {
              this.seatOptions[index][parseInt(this.carriageSelection[index])-1][i].remaining--;
            }
          }
          console.log(this.seatOptions[index]);
        }
        this.seatSelectionPre[index] = this.seatSelection[index];
      },
      async addOrder() {
        for (let i = 0; i < this.orderList.length; i++) {
          for (let j = 0; j < this.passengerSelection.length; j++) {
            this.orderForm.start_date = this.orderList[i].start_date;
            this.orderForm.train_no = this.orderList[i].train_no;
            this.orderForm.start_station_name = this.orderList[i].start_station_name;
            this.orderForm.end_station_name = this.orderList[i].end_station_name;
            this.orderForm.seat_type = this.radioList[i];
            this.orderForm.carriage_no = this.carriageSelection[this.passengerSelection.length * i + j];
            this.orderForm.seat_position = this.seatSelection[this.passengerSelection.length * i + j];
            this.orderForm.user_phone = JSON.parse(window.sessionStorage.getItem("user"))["user_phone"];
            this.orderForm.person_id = this.passengerSelection[j].person_id;
            const time = new Date();
            this.orderForm.create_time = time.toLocaleString('chinese', {hour12: false});
            console.log(this.orderForm.create_time);
            const {data: res1} = await this.$http.post("addOrder", this.orderForm);
            if (res1.status !== 200) return this.$message.error("创建订单失败");
            console.log(res1.data);
            if(window.sessionStorage.getItem("change") != null) {
              this.operateForm.order_id = JSON.parse(window.sessionStorage.getItem("change"))["order_id"];
              console.log(this.operateForm.order_id);
              this.operateForm.order_status = "已改签" + res1.data;
              const {data:res2} = await this.$http.post("updateOrder",this.operateForm);
              if(res2.status !== 200) return this.$message.error("改签失败");
            }
          }
        }
        await this.$router.push("myorder");
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-row {
    clear: both;
    text-align: center;
  }
</style>
