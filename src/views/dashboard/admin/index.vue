<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="12">
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日订单总金额(元)" :total="'￥ '+ userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer"><br></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日已支付(元)" :total="'￥ '+ userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">今日占比 <span style="color: #ffc30e">{{userStateObj.today_add/userStateObj.all_user*100}}%</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="累计订单数" :total="userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer"><br></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="今日订单数" :total=" userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">今日占本月比 <span style="color: #16ff0e">{{userStateObj.today_add/userStateObj.all_user*100}}%</span></template>
        </chart-card>
      </el-col>
      <el-col :sm="24" :xs="24" :md="4" :xl="4" :lg="4" :style="{ marginBottom: '12px' }">
        <chart-card title="本月订单数" :total="userStateObj.all_user">
          <el-tooltip slot="action" class="item" effect="dark" content="指标说明" placement="top-start">
            <i class="el-icon-warning-outline" />
          </el-tooltip>
          <template slot="footer">本月占总比 <span style="color: #0e6cff">{{userStateObj.today_add/userStateObj.all_user*100}}%</span></template>
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
              <el-col :sm="6" :xs="6" :md="4" :xl="2" :lg="4" :style="{ marginBottom: '12px' }">
                <chart-card title="累计订单数" :total="userStateObj.all_user"/>
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
      barData,
      barData2,
      rankList
    }
  },
  mounted() {
    this.getUserState()
  },
  methods: {
    getUserState(){
      GetUserStateNum().then(
        (response) => {
          this.userStateObj = response.data
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
