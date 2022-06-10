<template>
  <div id="MemberSpace">
    <div class="container">
      <h3>
        MemberSpace
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
              {{this.memberInfo.memberName}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Email:
            </div>
            <div class="col-md-6">
              {{this.memberInfo.memberEmail}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Member register time:
            </div>
            <div class="col-md-6">
              {{this.memberInfo.memberRegisterTime}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Member expiration time:
            </div>
            <div class="col-md-6">
              {{this.memberInfo.memberDueTime}}
            </div>
          </div>

          <div class="row info-row">
            <div class="col-md-6 left">
              Is over expiration time:
            </div>
            <div class="col-md-6">
              {{this.memberInfo.memberIsDue}}
            </div>
          </div>
        </div>

        <div class="col-md-2"></div>

        <!-- Personal Information -->
        <div class="col-md-5">
          <br>
          <h4>Personal Setting</h4>
          <br>
          <hr>
          <br>
          <el-button type="primary" plain @click="Renew">Renew</el-button>
          <br>
          <p>Tip: Click the 'Renew' button to renew the membership for one more year.</p>

          <el-button type="primary" plain @click="logOut">Log out</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'MemberSpace',
  data() {
    return {
      memberInfo: ''
    }
  },
  methods: {
    Renew() {
      const memberId = this.memberInfo.memberId
      console.log(memberId)

      const memberIdData = {
        memberId: memberId
      }
      this.$http.post('api/mgsc/member/renew', qs.stringify(memberIdData)).then(res => {
        const { data: resData } = res
        this.$alert(resData, 'Message', {
          confirmButtonText: 'OK',
          type: 'info'
        })
      })
    },

    logOut() {
      this.$http.post('api/mgsc/logout').then(function () {
        sessionStorage.clear()
        window.location.href = 'Home'
      })
    },

    memberInit() {
      this.memberInfo = JSON.parse(sessionStorage.getItem('memberInfo'))
    }
  },

  created() {
    this.memberInit()
  }
}
</script>

<style lang="less" scoped>
#MemberSpace {
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

p {
  font-size: 17px;
}

.col-md-5 {
  border: #333333 dashed 1px;
  height: 300px;
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

.el-button {
  padding: 12px 13px;
}
</style>