<template>
  <div id="Events">
    <div>
      <el-tabs tab-position="left" v-model="activeTabName">
        <el-tab-pane label="2022" name="2022">
          <div class="list-group">
            <a href="#" class="list-group-item active">
              2022 Events
            </a>
            <router-link to="/Events/2022/1">
              <a href="#" class="list-group-item">Call for Nominations - IGU Outstanding Achievement Award and Excellent Young Scholar Award in Modeling Geographical Systems (2022)</a>
            </router-link>
          </div>
        </el-tab-pane>

        <el-tab-pane label="2021" name="2021">
          <div class="list-group">
            <a href="#" class="list-group-item active">
              2021 Events
            </a>

            <router-link to="/Events/2021/6">
              <a href="#" class="list-group-item">Minutes of the second board meeting of Modeling Geographical Systems Commission (MGSC)</a>
            </router-link>

            <router-link to="/Events/2021/5">
              <a href="#" class="list-group-item">IGU 19th International Conference on Spatial Data Handling and Geographic Intelligence</a>
            </router-link>

            <router-link to="/Events/2021/4">
              <a href="#" class="list-group-item">The first training course on Chinese geographical analysis models</a>
            </router-link>

            <router-link to="/Events/2021/3">
              <a href="#" class="list-group-item">Minutes of the first board meeting of Modeling Geographical Systems Commission (MGSC)</a>
            </router-link>

            <router-link to="/Events/2021/2">
              <a href="#" class="list-group-item">The 2nd national forum on geographic modeling and simulation (and the launch ceremony of the training course on domestic geographical analysis models)</a>
            </router-link>

            <router-link to="/Evetns/2021/1">
              <a href="#" class="list-group-item">Call for Abstracts | The session of Geographic information modelling and simulation in the era of big data in IGU Paris 2022</a>
            </router-link>
          </div>
        </el-tab-pane>

        <el-tab-pane label="2020" name="2020">
          <div class="list-group">
            <a href="#" class="list-group-item active">
              2020 Events
            </a>
            <router-link to="/Events/2020/1">
              <a href="#" class="list-group-item">The general election of Modeling Geographical Systems Commission (MGSC) of International Geographical Union (IGU)</a>
            </router-link>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Events',
  data() {
    return {
      value: '',
      activeTabName: '2022'
    }
  }
}
</script>

<style lang="less" scoped>
#Events {
  font-size: 19px;
  line-height: 25px;
  width: 1240px;
  margin: 0 auto;
  position: relative;
  word-spacing: 4px;
  margin-top: 30px;
  height: 700px;
}

h3 {
  color: #1a80b6;
  font-size: 20px;
  font-weight: 1000;
}

// vs-select {
//   width: 150%;
// }
.vs-select-content {
  max-width: 80px;
  margin-left: -100px;
}

.list-group-item {
  font-size: 15px;
  font-weight: bold;
}

.list-group-item.active {
  background-color: #1a80b6;
  border-color: #1a80b6;
}

a {
  text-decoration: none;
}
</style>
