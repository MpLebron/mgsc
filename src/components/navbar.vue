<template>
  <div class="top-bar">
    <el-row>
      <el-col :span="24">
        <el-menu router mode="horizontal" background-color="#1a80b6" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index='/'>
            Home
          </el-menu-item>
          <el-menu-item index='/AboutUs'>
            About Us
          </el-menu-item>

          <el-menu-item index='/Events'>
            Events
          </el-menu-item>
          <el-menu-item index='/Awards'>
            Awards
          </el-menu-item>
          <el-submenu index='5'>
            <template slot="title">Publications</template>
            <el-menu-item index='/Publication/Journals'>
              Journals
            </el-menu-item>

            <el-menu-item index='/Publication/SpecialIssues'>
              Special Issues
            </el-menu-item>

            <el-menu-item index='/Publication/MembersPapers'>
              Members' Papers
            </el-menu-item>
          </el-submenu>
          <el-menu-item index='/JobsOpportunities'>
            Jobs & Opportunities
          </el-menu-item>

          <el-menu-item index='/JoinUs'>
            Join Us
          </el-menu-item>

          <el-menu-item index='/ContactUs'>
            Contact Us
          </el-menu-item>

          <el-menu-item v-if="login" index='/Login'>
            Login
          </el-menu-item>

          <el-menu-item v-if="userSpace" index='/userSpace'>
            User Space
          </el-menu-item>

          <el-menu-item v-if="memberSpace" index='/memberSpace'>
            Member Space
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
    return {
      memberSpace: false,
      userSpace: false,
      login: false
    }
  },

  methods: {
    navInit() {
      if (!sessionStorage.getItem('store') && !sessionStorage.getItem('memberInfo')) {
        this.login = true
      }

      if (sessionStorage.getItem('store')) {
        this.userSpace = true
      }

      if (sessionStorage.getItem('memberInfo')) {
        this.memberSpace = true
      }
    }
  },

  created() {
    this.navInit()
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