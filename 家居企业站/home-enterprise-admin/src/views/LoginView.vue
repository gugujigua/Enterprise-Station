<template>
    <div class="container">
        <div class="box">
            <div class="title">
                <h2>美好家居后台</h2>
            </div>
            <div class="form">
                <el-form ref="loginForm" :model="loginData" label-width="50px" :rules="loginRules">
                    <el-form-item label="账号" prop="username">
                        <el-input v-model="loginData.username"  placeholder='请填写账号'></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="loginData.password" placeholder='请填写密码'  show-password ></el-input>
                    </el-form-item>
                    <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="copyright">美好家居企业网站&copy;2022</div>
    </div>
</template>

<script>

export default {
  data: function () {
    return {
      loginData: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // trigger 如何触发 blur 失去焦点触发
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await this.api.login.login(this.loginData)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            sessionStorage.setItem('token', res.data.data)
            this.$router.push({ name: 'main' })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    width: 100%;
    height: 100%;
    background: url(../assets/images/logo.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .box{
    width: 400px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% , -50%);
    background:#fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 5px #888;
        .title{
            height: 90px;
            width: 100%;
            // background-color: pink;
            text-align: center;
            line-height: 90px;
        }
        .form{
            padding:0 30px 20px 30px;
            .el-button{
                width: 100%;
            }
        }
    }
    .copyright{
        position: absolute;
        left: 0;
        right: 0;
        margin: 0 auto;
        bottom: 15px;
        text-align: center;
        color: #fff;
        font-size: 14px;
    }
}
</style>
