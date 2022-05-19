<template>
  <div id="Login">
    <div class="container">
      <h3>
        Login
      </h3>
      <div class="row">
        <div class="col-md-4">
          <span class="lable-p">
            <label class="control-label">Account :</label>
            <div>
              <input id="loginAccount" ref="loginAccount" type="text" class="form-control" placeholder="Please enter your email address or username!" />
            </div>
            <label class="control-label" id="pass">Password :</label>
            <div>
              <input id="loginPassword" ref="loginPassword" type="password" class="form-control" placeholder="Please enter your password" />
            </div>
          </span>
          <el-button round style="margin-top:30px" @click="loginSubmit">Login</el-button>

        </div>

        <div class="col-md-2"></div>

        <div class="col-md-6" style="border-left: 1px solid #1b6d85 ;padding-top: 1%;vertical-align: center" id="information">
          <p style="margin-left:15px">1.If you don't have an account yet, please
            <a class="register" id="registerhere" data-href="#Register" style="font-weight: bold;cursor:pointer" @click="dialogFormVisible = true"> click here</a>
            to register one.
          </p>
          <p style="margin-left:15px">2.Forget your password ?
            <a type="button" data-toggle="modal" data-target="#myModal" id="resetPassword" style="font-weight: bold;cursor: pointer" @click="dialogFormVisible2 = true">Click here.</a>
          </p>
          <p style="margin-left:15px">3.Please be noted that the web account is NOT commission member.&nbsp;Please go to "Join us" to apply for the membership.
          </p>
        </div>
      </div>
    </div>

    <!-- Register -->
    <el-dialog title="Register" width="40%" :visible.sync="dialogFormVisible" @close="dialogFormClosed()">
      <el-form :model="dialogForm" :rules="dialogFormRule" ref="dialogForm">
        <el-form-item label="Name:" prop="Name">
          <el-input v-model="dialogForm.Name" ref="regName"></el-input>
        </el-form-item>
        <el-form-item label="Email:" prop="Email">
          <el-input v-model="dialogForm.Email" ref="regEmail"></el-input>
        </el-form-item>
        <el-form-item label="Password:" prop="Password">
          <el-input v-model="dialogForm.Password" ref="regNewPassword"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="registerSubmit">Confirm</el-button>
      </div>

    </el-dialog>

    <!-- Reset -->
    <el-dialog title="Reset Password" width="40%" :visible.sync="dialogFormVisible2" @close="dialogForm2Closed()">
      <el-form :model="dialogForm2" :rules="dialogForm2Rule" ref="dialogForm2">
        <el-form-item label="Email:" prop="Email">
          <el-input v-model="dialogForm2.Email" ref="resetEmail">
            <el-button slot="append" style="background-color: #409eff; color:white" @click="sendCode">Send Code</el-button>
          </el-input>

        </el-form-item>
        <el-form-item label="Verfication Code:" prop="VCcode">
          <el-input v-model="dialogForm2.VCcode" ref="resetVCcode"></el-input>
        </el-form-item>
        <el-form-item label="New Password:" prop="newPassword">
          <el-input v-model="dialogForm2.newPassword" ref="resetNewPassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
        <el-button type="primary" @click="resetSubmit">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Login',
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input your Email!'))
      } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
        return callback(new Error('Please input a valid Email!'))
      } else {
        return callback()
      }
    }

    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input your Email!'))
      } else if (!(/^.*?[\d]+.*$/.test(value) && /^.*?[a-z].*$/.test(value) && value.length > 7)) {
        return callback(new Error('At least 8 characters including a number and a lowercase letter'))
      } else {
        return callback()
      }
    }

    return {
      dialogFormVisible: false,

      // 注册用户对话框数据项
      dialogForm: {
        Name: '',
        Email: '',
        Password: ''
      },

      dialogFormVisible2: false,

      // 找回密码对话框数据项
      dialogForm2: {
        Email: '',
        VCcode: '',
        newPassword: ''
      },

      // 添加注册表单的验证规则对象
      dialogFormRule: {
        Name: [{ required: true, message: 'Please input your Name!', trigger: 'blur' }],
        Email: [{ validator: checkEmail, trigger: 'blur' }],
        Password: [{ validator: checkPassword, trigger: 'blur' }]
      },

      dialogForm2Rule: {
        Email: [{ required: true, message: 'Please input your Email!', trigger: 'blur' }],
        VCcode: [{ required: true, message: 'Please input your Verfication Code!', trigger: 'blur' }],
        newPassword: [{ required: true, message: 'Please input your New Password!', trigger: 'blur' }]
      }
    }
  },

  methods: {
    dialogFormClosed() {
      this.$refs.dialogForm.resetFields()
    },

    dialogForm2Closed() {
      this.$refs.dialogForm2.resetFields()
    },

    // 提交登录信息
    loginSubmit() {
      let Account = this.$refs.loginAccount.value
      let Password = this.$refs.loginPassword.value

      // 如果为空，则弹出提示框
      if ((Account === '') | (Password === '')) {
        this.loginOpen()
        return
      }

      // 将login信息重组为对象格式
      let datalogin = {
        userAccount: Account,
        userPassword: Password
      }

      // 向接口发送登录请求
      this.$http.post('api/mgsc/user/login', qs.stringify(datalogin)).then(res => {
        // 将返回信息进行解构赋值
        let { data: resData } = res

        // 如果未注册，则提示用户并清空信息
        if (resData === 'Please register your account!') {
          this.$alert('Please register your account!', 'Message', {
            confirmButtonText: 'OK',
            type: 'info'
          })
          this.$refs.loginAccount.value = ''
          this.$refs.loginPassword.value = ''
        }
        // 如果密码错误，则提示用户并清空密码框
        else if (resData === 'Your account or password is wrong!') {
          this.$alert('Your password is wrong!', 'Message', {
            confirmButtonText: 'OK',
            type: 'info'
          })
          this.$refs.loginPassword.value = ''
        }
        // 登陆成功
        else {
          this.$alert('Login Successfully！', 'Message', {
            confirmButtonText: 'OK',
            type: 'success'
          })
        }
        // 如果登陆成功，则跳转到用户中心
      })
    },

    // 弹框提示用户输入账号密码
    loginOpen() {
      this.$alert('Please input your Account and Password！', 'Warning', {
        confirmButtonText: 'OK',
        type: 'warning'
      })
    },

    registerSubmit() {
      let Name = this.$refs.regName.value
      let Email = this.$refs.regEmail.value
      let Password = this.$refs.regNewPassword.value

      // 如果有一项为空，则返回
      if ((Name === '') | (Email === '') | (Password === '')) {
        this.$message({
          message: 'Please input the corresponding information!',
          type: 'warning'
        })
        return
      }

      // 将register信息重组为对象格式
      let dataRegister = {
        userName: Name,
        userEmail: Email,
        userPassword: Password
      }

      // 向接口发送注册请求
      this.$http.post('api/mgsc/user/register', qs.stringify(dataRegister)).then(res => {
        // 将返回信息进行解构赋值
        let { data: resData } = res

        // 如果该用户已注册
        if (resData === 'User already exists!') {
          this.$message({
            message: 'User already exists!',
            type: 'warning'
          })
        }
        // 注册成功， 关闭对话框
        else {
          this.$message({
            message: 'Register successfully!',
            type: 'success'
          })
          this.dialogFormVisible = false
        }
      })
    },

    resetSubmit() {
      let Email = this.$refs.resetEmail.value
      let VCcode = this.$refs.resetVCcode.value
      let newPassword = this.$refs.resetNewPassword.value

      // 如果有一项为空，则返回
      if ((Email === '') | (VCcode === '') | (newPassword === '')) {
        this.$message({
          message: 'Please input the corresponding information!',
          type: 'warning'
        })
      } else if (!this.isEmail(Email)) {
        this.$message({
          message: 'Please input a valid Email',
          type: 'warning'
        })
      } else if (!this.isPwdvalidate(newPassword)) {
        this.$message({
          message: 'Password should be at least 8 characters including a number and a lowercase letter!',
          type: 'warning'
        })
      } else {
        let dataReset = {
          email: Email,
          code: VCcode,
          newPass: newPassword
        }

        this.$http.post('api/mgsc/user/resetPassword', qs.stringify(dataReset)).then(res => {
          let { data: resData } = res

          if (resData === 'suc') {
            this.$message({
              message: 'Reset password successfully!',
              type: 'success'
            })
            this.dialogFormVisible2 = false
          } else {
            this.$message({
              message: 'Failed to reset password, Please register your account or confirm verification code!',
              type: 'error'
            })
          }
        })
      }

      // 如果用户输入符合要求，则发送请求

      // 发送请求成功后，关闭输入框
      // this.dialogFormVisible2 = false
    },

    isEmail(str) {
      if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(str)) {
        return false
      } else {
        return true
      }
    },

    isPwdvalidate(str) {
      //判断密码是否符合规则
      if (/^.*?[\d]+.*$/.test(str) && /^.*?[a-z].*$/.test(str) && str.length > 7) {
        return true
      } else {
        return false
      }
    },

    sendCode() {
      let VCEmail = this.$refs.resetEmail.value

      // 将邮箱转换为对象格式
      let vcemailData = {
        email: VCEmail
      }

      if (VCEmail === '') {
        this.$message({
          message: 'Please input your Email address!',
          type: 'warning'
        })
      } else {
        if (this.isEmail(VCEmail)) {
          this.$http
            .post('api/mgsc/user/sendCode', qs.stringify(vcemailData))
            .then(res => {
              let { data: resData } = res
              if (resData === 'suc') {
                this.$notify({
                  title: 'Success',
                  message: 'Verification code has been sent to your email. If you can not find the email, please check the spam box.',
                  type: 'success'
                })
              } else if (resData === 'no user') {
                this.$notify.error({
                  title: 'Error',
                  message: 'Email does not exist, please check again or register a new account.'
                })
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: 'Send Email error! Please try again later~'
                })
              }
            })
            .catch(e => {
              this.$notify.error({
                title: 'Error',
                message: 'Send Email error! Please try again later~'
              })
            })
        } else {
          this.$message({
            message: 'Please input a valid Email address!',
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
#Login {
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

.lable-p {
  font-size: 15px;
  font-weight: bold;
}

#pass {
  padding-top: 20px;
}

h3 {
  color: #1a80b6;
  font-size: 25px;
  font-weight: 1000;
  text-align: center;
  margin-bottom: 50px;
}

a,
a:not([href]):not([class]),
a:not([href]):not([class]):hover {
  text-decoration: none;
  color: #1a80b6;
}

.el-form-item__error {
  font-size: 14px;
}
</style>