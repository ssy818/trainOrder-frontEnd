<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车票查询</el-breadcrumb-item>
      <el-breadcrumb-item>直达车票</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form :inline="true" ref="directFormRef" :model="directForm" :rules="directFormRules" class="form-inline">
          <el-form-item label="出发地" label-width="90px" prop="start_place">
            <el-input v-model="directForm.start_place" placeholder="北京" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="目的地" label-width="90px" prop="end_place">
            <el-input v-model="directForm.end_place" placeholder="上海" style="width: 130px;"></el-input>
          </el-form-item>
          <el-form-item label="出发日期" label-width="90px" prop="start_date">
            <el-date-picker v-model="directForm.start_date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions" style="width: 140px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="发车时间" label-width="90px">
            <el-time-select v-model="directForm.min_time" placeholder="选择时间" :picker-options="{start: '00:00',step: '00:30',end: '23:30',maxTime: directForm.max_time}" style="width: 130px;"></el-time-select>
          </el-form-item>
          <el-form-item label="-">
            <el-time-select v-model="directForm.max_time" placeholder="选择时间" :picker-options="{start: '00:30',step: '00:30',end: '24:00',minTime: directForm.min_time}" style="width: 130px;"></el-time-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left: 35px;" @click="getDirectTicketList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="text item">
        <el-checkbox :indeterminate="checkForm.isIndeterminate" v-model="checkForm.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkForm.checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in checkForm.cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <el-table :data="directTicketList" border style="width: 100%">
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
              <el-button type="text" @click="orderDirectTicket(scope.row)">预订</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top: 15px;" @click="getPriceOrRemaining">{{directButton}}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  const cityOptions = ['G-高铁', 'D-动车', 'Z-直达', 'T-特快','K-快速'];
  export default {
    name: "Direct",
    data() {
      return {
        directTicketList: [],
        directButton: "查询票价",
        directForm: {
          start_place: '',
          end_place: '',
          start_date: '',
          min_time: '',
          max_time: '',
          query: "remaining"
        },
        orderDirectForm: {
          start_date: '',
          train_no: '',
          start_station_name: '',
          end_station_name: '',
          start_time: '',
          end_time: ''
        },
        directFormRules: {
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
        checkForm: {
          checkAll: false,
          checkedCities: ['G-高铁', 'D-动车', 'Z-直达', 'T-特快','K-快速'],
          cities: cityOptions,
          isIndeterminate: true
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      }
    },
    methods: {
      getDirectTicketList() {
        console.log(Date.now())
        this.$refs.directFormRef.validate(async valid => {
          if(!valid) return this.$message.error("输入有误");
          const {data:res} = await this.$http.post('findDirectTicket',this.directForm);
          if(res.status !== 200) return this.$message.error("结果为空");
          else this.directTicketList = res.data;
        })
      },
      getPriceOrRemaining() {
        if(this.directButton === "查询票价") {
          this.directForm.query = "price";
          this.directButton = "查询余座";
          this.getDirectTicketList();
        }
        else {
          this.directForm.query = "remaining";
          this.directButton = "查询票价";
          this.getDirectTicketList();
        }
      },
      async orderDirectTicket(row) {
        this.orderDirectForm.start_date = this.directForm.start_date;
        this.orderDirectForm.train_no = row.train_no;
        this.orderDirectForm.start_station_name = row.start_station_name;
        this.orderDirectForm.end_station_name = row.end_station_name;
        this.orderDirectForm.start_time = row.start_time;
        this.orderDirectForm.end_time = row.end_time;
        const {data:res} = await this.$http.post("findDirectTicketDetail",this.orderDirectForm);
        window.sessionStorage.setItem("order",JSON.stringify([res.data]));
        await this.$router.push('buy-tickets');
      },
      handleCheckAllChange(val) {
        this.checkForm.checkedCities = val ? cityOptions : [];
        this.checkForm.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkForm.checkAll = checkedCount === this.cities.length;
        this.checkForm.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
  .el-table {
    margin-top: 15px;
  }
</style>
