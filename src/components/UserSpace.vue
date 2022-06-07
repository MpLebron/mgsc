<template>
  <div id="UserSpace">
    <div class="container">
      <h3>
        UserSpace
      </h3>
      <div class="row">
        <!-- Personal Information -->
        <div class="col-md-5">
          <h4>Personal Information</h4>
          <hr>
          <div class="row info-row">
            <div class="col-md-6 left">
              Name:
            </div>
            <div class="col-md-6">
              {{$store.state.userName}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Email:
            </div>
            <div class="col-md-6">
              {{$store.state.userEmail}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Member Status:
            </div>
            <div class="col-md-6">
              {{$store.state.MemberStatus}}
            </div>
          </div>
        </div>

        <div class="col-md-2"></div>

        <!-- Personal Information -->
        <div class="col-md-5">
          <h4>Personal Setting</h4>
          <hr>

          <el-input v-model="input" placeholder="Please input your memberID!" style="margin-top:15px" ref="memberIDRef"></el-input>
          <el-button type="primary" plain @click="Submit" style="margin-left: 30px">Submit</el-button>
          <p>
            Tip: Click <a href="../assets/static/doc/MGSC Membership application form.docx " style="cursor: pointer">here</a> to apply for membership.
          </p>
          <el-button type="primary" plain @click="logOut">Log out</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'UserSpace',
  data() {
    return {
      input: ''
    }
  },

  methods: {
    Submit() {
      let memberID = this.$refs.memberIDRef.value

      // 如果为空,则提醒用户输入memberID
      if (memberID === '') {
        this.$alert('Please input your memberID!', 'Message', {
          confirmButtonText: 'OK',
          type: 'info'
        })
        return
      }

      // 如果不为空,则向API发送请求
      let dataMemberID = {
        memberId: memberID
      }

      this.$http.post('api/mgsc/member/updateid', qs.stringify(dataMemberID)).then(res => {
        let { data: resData } = res

        // 如果发送请求并关联成功
        if (resData === 'done') {
          this.$message({
            message: 'Associated with success',
            type: 'success'
          })

          // 二次发送请求,并进行跳转
          this.$http.post('api/mgsc/in/Space', resData).then(res => {
            let { data: resData2 } = res
            if (resData2 === 'userspace') {
              window.location.href = 'UserSpace'
            } else {
              window.location.href = 'MemberShip'
            }
          })
        }
        // 发送请求但关联失败
        else {
          this.$message({
            message: 'Associated with failed!',
            type: 'warning'
          })
        }
      })
    },

    logOut() {
      this.$http.post('api/mgsc/logout').then(function () {
        sessionStorage.clear()
        window.location.href = 'Home'
      })
    },

    sessionInit() {
      if (sessionStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
      }
    }
  },

  created() {
    this.sessionInit()
  }
}
</script>

<style lang="less" scoped>
#UserSpace {
  font-size: 19px;
  line-height: 25px;
  width: 1240px;
  height: 700px;
  margin: 0 auto;
  position: relative;
  word-spacing: 4px;
  margin-top: 30px;
  text-align: justify;
}

h3 {
  color: #1a80b6;
  font-size: 25px;
  font-weight: 1000;
  text-align: center;
  margin-bottom: 50px;
}

h4 {
  color: black;
  font-size: 20px;
  font-weight: 1000;
  text-align: center;
  margin: 10px 0px;
}

hr {
  margin: 0;
}

.col-md-5 {
  border: #333333 dashed 1px;
  height: 200px;
  border-radius: 13px;
}

.info-row {
  line-height: 51px;
}

.col-md-6 {
  font-size: 17px;
}

.left {
  font-weight: bolder;
}

.el-input {
  width: 70%;
}

p {
  font-size: 17px;
}

.el-button {
  padding: 12px 13px;
}

a {
  text-decoration: none;
}
</style>