<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="12">
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日订单总金额(元)" :total="'￥ '+ orderStateNumsObj.today_all_money">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer"><br></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日已支付(元)" :total="'￥ '+ orderStateNumsObj.today_pay_money">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">今日占比 <span style="color: #ffc30e">{{parseFloat(orderStateNumsObj.today_pay_money)/parseFloat(orderStateNumsObj.today_all_money)*100}}%</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="累计订单数" :total="orderStateNumsObj.all_day_add">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer"><br></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日订单数" :total=" orderStateNumsObj.today_add">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">今日占本月比 <span style="color: #16ff0e">{{orderStateNumsObj.today_add/orderStateNumsObj.today_mon*100}}%</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="本月订单数" :total="orderStateNumsObj.today_mon">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">本月占总比 <span style="color: #0e6cff">{{orderStateNumsObj.today_mon/orderStateNumsObj.all_day_add*100}}%</span></template>
        </chart-card>
      </el-col>
    </el-row>

    <el-row :gutter="12">
      <el-col :sm="24" :xs="24"  :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="累计会员数" :total="userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer"><br></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24"  :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日新增会员数" :total="userStateObj.today_add">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <el-progress :text-inside="true" :stroke-width="26" :percentage="userStateObj.today_add/userStateObj.all_user*100" ></el-progress>
          </div>
          <template slot="footer">今日新增占比 <span style="color: #0e6cff">{{userStateObj.today_add/userStateObj.all_user*100}}%</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24"  :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px'}">
        <chart-card title="拉黑名单" :total="userStateObj.black_num">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <div>
            <el-progress :text-inside="true" :stroke-width="20" :percentage="userStateObj.black_num/userStateObj.all_user*100" status="exception"></el-progress>
<!--            <mini-progress color="rgb(254, 20, 87)" :target="100"  height="8px" />-->
          </div>
          <template slot="footer">拉黑名单占比 <span style="color: #C03639">{{userStateObj.black_num/userStateObj.all_user*100}}%</span></template>
        </chart-card>
      </el-col>
    </el-row>

    <el-card :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <el-tabs>
          <el-tab-pane label="处理订单数据">
            <el-row>
              <el-col :sm="3" :xs="3" :md="3" :xl="3" :lg="3" :style="{ marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="正在派单" :total="orderNumsObj.dispatch"/>
              </el-col>
              <el-col :sm="3" :xs="3" :md="3" :xl="3" :lg="3" :style="{  marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="人员已接单" :total="orderNumsObj.is_dispatch"/>
              </el-col>
              <el-col :sm="3" :xs="3"  :md="3" :xl="3" :lg="3" :style="{  marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="订单完成" :total="orderNumsObj.ok_dispatch"/>
              </el-col>
              <el-col :sm="3" :xs="3"  :md="3" :xl="3" :lg="3" :style="{  marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="订单取消" :total="orderNumsObj.order_cancel"/>
              </el-col>
              <el-col :sm="3" :xs="3"  :md="3" :xl="3" :lg="3" :style="{  marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="待支付" :total="orderNumsObj.payment"/>
              </el-col>
              <el-col :sm="3" :xs="3"  :md="3" :xl="3" :lg="3" :style="{  marginLeft:'5px', marginBottom: '12px' }">
                <chart-card title="支付成功" :total="orderNumsObj.pay_ok"/>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>

  </div>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import Trend from '@/components/Trend'
import MiniArea from '@/components/MiniArea'
import MiniBar from '@/components/MiniBar'
import MiniProgress from '@/components/MiniProgress'
import RankList from '@/components/RankList/index'
import Bar from '@/components/Bar.vue'
import {GetUserStateNum} from '@/api/admin/app-user'
import {getAppOrdersNums,getAppOrdersStateNums} from '@/api/admin/app-orders'
const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100
  })
}

export default {
  name: 'DashboardAdmin',
  components: {
    ChartCard,
    Trend,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar
  },
  data() {
    return {
      userStateObj:{},
      orderNumsObj:{},
      orderStateNumsObj:{},
      barData,
      barData2,
      rankList
    }
  },
  mounted() {
    this.getUserState()
    this.appOrdersNums()
    this.getAppOrdersStateNums()
  },
  methods: {
    getUserState(){
      GetUserStateNum().then(
        (response) => {
          this.userStateObj = response.data
        }
      )
    },
    appOrdersNums(){
      getAppOrdersNums().then(
        (response) => {
          this.orderNumsObj = response.data
        }
      )
    },
    getAppOrdersStateNums(){
      getAppOrdersStateNums().then(
        (response) => {
          this.orderStateNumsObj = response.data
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 12px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

::v-deep .el-tabs__item{
   padding-left: 16px!important;
   height: 50px;
   line-height: 50px;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
