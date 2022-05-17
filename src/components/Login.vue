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
          <el-input v-model="dialogForm.Password" ref="regNPassword"></el-input>
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
          <el-input v-model="dialogForm2.Email" ref="resetEmail"></el-input>
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
export default {
  name: 'Login',
  data() {
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
        Email: [{ required: true, message: 'Please input your Email!', trigger: 'blur' }],
        Password: [{ required: true, message: 'Please input your Password!', trigger: 'blur' }]
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

    loginSubmit() {
      let Account = this.$refs.loginAccount.value
      let Password = this.$refs.loginPassword.value

      if ((Account === '') | (Password === '')) {
        this.loginOpen()
        return
      }

      let datalogin = {
        userAccount: Account,
        userPassword: Password
      }

      this.$http.post('api/mgsc/user/login', datalogin).then(res => {
        console.log(datalogin)
        console.log(res)
      })
    },

    loginOpen() {
      this.$alert('Please input your Account and Password！', 'Warning', {
        confirmButtonText: 'OK',
        type: 'warning'
      })
    },

    registerSubmit() {
      let Name = this.$refs.regName.value
      let Email = this.$refs.regEmail.value
      let Password = this.$refs.regPassword.value

      // 如果有一项为空，则返回
      if ((Name === '') | (Email === '') | (Password === '')) {
        return
      }

      // 如果用户输入符合要求，则发送请求

      // 发送请求成功后，关闭输入框
      this.dialogFormVisible = false
    },

    resetSubmit() {
      let Email = this.$refs.resetEmail.value
      let VCcode = this.$refs.resetVCcode.value
      let newPassword = this.$refs.resetNewPassword.value

      // 如果有一项为空，则返回
      if ((Email === '') | (VCcode === '') | (newPassword === '')) {
        return
      }

      // 如果用户输入符合要求，则发送请求

      // 发送请求成功后，关闭输入框
      this.dialogFormVisible2 = false
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