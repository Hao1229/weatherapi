<template>
  <div class="container">
    <header>
      <h1>各城市天氣查詢系統</h1>
    </header>
    <form>
      <select class="selectCity" v-model="filterLocation">
        <option value="all">請選擇城市</option>
        <option value="六都">六都</option>
        <option :value="item.locationName" v-for="item in location" :key="item.locationName">{{item.locationName}}</option>
      </select>
    </form>
    <section>
      <div>
        <div v-for="item in locationNow" :key="item.locationName" class="card">
          <div class="flex dataTitle">
            <span>{{item.locationName}}</span>
            <span>{{item.weatherElement[2].time[0].startTime | date}} - {{item.weatherElement[2].time[0].endTime | date}}</span>
          </div>
          <div class="dataContent">
            <div>
              <span>{{item.weatherElement[0].time[0].parameter.parameterName}}</span>
            </div>
            <div class="flex">
              <span>{{item.weatherElement[2].time[0].parameter.parameterName}}℃ - {{item.weatherElement[4].time[0].parameter.parameterName}}℃</span>
              <span>降雨機率：{{item.weatherElement[1].time[0].parameter.parameterName}} %</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      location: [],
      filterLocation: 'all'
    }
  },
  methods: {
    getWeather () {
      const vm = this
      const api = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${process.env.VUE_APP_API_PATH}`
      this.$http.get(api).then((response) => {
        vm.location = response.data.records.location
        console.log(vm.location)
      })
    }
  },
  created () {
    this.getWeather()
  },
  computed: {
    locationNow () {
      const vm = this
      if (vm.filterLocation === 'all') {
        return vm.location
      } else if (vm.filterLocation === '六都') {
        return vm.location.filter((item) => {
          return item.locationName === '臺北市' || item.locationName === '新北市' || item.locationName === '桃園市' || item.locationName === '臺中市' || item.locationName === '臺南市' || item.locationName === '高雄市'
        })
      } else {
        return vm.location.filter((item) => {
          return vm.filterLocation === item.locationName
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 960px;
    margin: 0 auto;
    text-align: center;
  }
  .selectCity {
    width: 50%;
    height: 50px;
    font-size: 20px;
  }
  .weatherList {
    width: 100%;
    margin-top: 1rem;
    border-collapse: collapse
  }
  .dataBorder{
    border-top: 1px solid #c0c0c0;
  }
  .card {
    display: inline-block;
    min-width: 33%;
    margin: 1rem;
    border: 1px solid black;
    text-align: left;
    @media(max-width: 768px) {
      min-width: 50%;
    }
  }
  .flex {
    display: flex;
    justify-content: space-between
  }
  .dataTitle{
    border-bottom: 1px solid gray;
    padding: 5px;
    background-color: rgba($color: #A9A9A9, $alpha: 0.7)
  }
  .dataContent {
    padding: 10px;
  }
</style>
