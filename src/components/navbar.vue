<template>
  <div class="top-bar">
    <el-row>
      <el-col :span="24">
        <el-menu mode="horizontal" background-color="#1a80b6" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index='1'>
            <router-link to="/">
              Home
            </router-link>
          </el-menu-item>
          <el-menu-item index='2'>
            <router-link to="/AboutUs">
              About Us
            </router-link>
          </el-menu-item>

          <el-menu-item index='3'>
            <router-link to="/Events">
              Events
            </router-link>
          </el-menu-item>
          <el-menu-item index='4'>
            <router-link to="/Awards">
              Awards
            </router-link>
          </el-menu-item>
          <el-submenu index='5'>
            <template slot="title">Publications</template>
            <el-menu-item index='5-1'>
              <router-link to="/Publication/Journals">
                Journals
              </router-link>
            </el-menu-item>

            <el-menu-item index='5-2'>
              <router-link to="/Publication/SpecialIssues">
                Special Issues
              </router-link>
            </el-menu-item>

            <el-menu-item index='5-3'>
              <router-link to="/Publication/MembersPapers">
                Members' Papers
              </router-link>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index='6'>
            <router-link to="/JobsOpportunities">
              Jobs & Opportunities
            </router-link>
          </el-menu-item>

          <el-menu-item index='7'>
            <router-link to="/JoinUs">
              Join Us
            </router-link>
          </el-menu-item>

          <el-menu-item index='8'>
            <router-link to="/ContactUs">
              Contact Us
            </router-link>
          </el-menu-item>

          <el-menu-item index='9'>
            <router-link to="/Login">
              Login
            </router-link>
          </el-menu-item>

          <template #right>
            <el-button color="#fff" flat>Login</el-button>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  position: relative;
  margin-top: 10px;
  width: 100%;
}

.el-menu-item {
  font-size: 14px;
  color: #f3ffff;
}

.el-menu {
  padding-left: 330px;
}

.el-menu-item {
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: white;
}

.el-submenu__title i {
  color: white;
}
</style>