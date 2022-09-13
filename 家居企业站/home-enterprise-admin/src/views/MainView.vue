<template>
    <div class="container">
        <el-container>
            <el-header >
                <div class="logo">
                    <img src="../assets/images/logo.png" >
                </div>
                <div class="title">
                   <i> 家具企业网站</i>
                </div>
                <div class="alter">
                    <el-menu background-color="#000" text-color="#d2b068" style="z-index:99">
                        <el-submenu index="2">
                            <template slot="title">admin</template>
                            <el-menu-item index="2-1" @click="changePass">修改密码</el-menu-item>
                            <el-menu-item index="2-2" @click="loginout">退出登录</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-row>
                        <el-col :span="12">
                            <el-menu default-active=v.name background-color="#fff" text-color="#000" router>
                                <template  v-for="v in navData">
                                    <template v-if="v.meta.visible">
                                        <el-menu-item :index='v.name' v-if="!v.children" :route="{name:v.name}" :key="v.name">
                                            <i :class="v.meta.icon"></i>
                                            <span slot="title">{{v.meta.title}}</span>
                                        </el-menu-item>
                                        <el-submenu :index="v.name" v-else :key="v.name">
                                            <template slot="title">
                                            <i :class="v.meta.icon"></i>
                                            <span>{{v.meta.title}}</span>
                                            </template>
                                            <el-menu-item-group>
                                                <template v-for="val in v.children">
                                                    <el-menu-item  :key="val.name" v-if="val.meta.visible" :index="val.name" :route="{name:val.name}">
                                                    <i :class="val.meta.icon"></i>
                                                    {{val.meta.title}}</el-menu-item>
                                                </template>
                                            </el-menu-item-group>
                                        </el-submenu>
                                    </template>
                                </template>
                            </el-menu>
                        </el-col>
                    </el-row>
                </el-aside>
                <el-main>
                    <el-breadcrumb>
                        <el-breadcrumb-item v-for="v in breadcrumbData" :key="v.name" :to="{name:v.name}">  {{v.meta.title}}
                        </el-breadcrumb-item>
                    </el-breadcrumb>
                    <router-view></router-view>
                    <el-dialog title="修改密码" :visible.sync="changePassDialogVisible" width="35%" >
                    <el-form ref="changePassForm" :model="changePassForm" label-width="80px" :rules="changePassRules">
                        <el-form-item label="原密码" prop="password">
                            <el-input v-model="changePassForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newpassword">
                            <el-input v-model="changePassForm.newpassword"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="renewpassword">
                            <el-input v-model="changePassForm.renewpassword"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitChangePass">确定</el-button>
                            <el-button type="primary" @click="changePassDialogVisible = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                    </el-dialog>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
  data () {
    return {
      changePassDialogVisible: false,
      navData: [],
      breadcrumbData: [],
      changePassForm: {
        password: '',
        newpassword: '',
        renewpassword: ''
      },
      changePassRules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        renewpassword: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changePass () {
      this.changePassDialogVisible = true
    },
    submitChangePass () {
      this.$refs.changePassForm.validate((valid) => {
        if (valid) {
          this.changePassDialogVisible = false
        } else {
          return false
        }
      })
    },
    loginout () {
      sessionStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  },
  created () {
    this.navData = this.$router.options.routes[1].children
    this.breadcrumbData = this.$route.matched
    console.log(this.breadcrumbData)
  },
  updated () {
    this.breadcrumbData = this.$route.matched
  }
}
</script>

<style lang="scss" scoped>
.container{
    .el-container{
        height: 100%;
        .el-header{
            background-color: #000;
            .logo{
                height: 60px;
                float: left;
                img{
                    height: 60px;
                }
            }
            .title{
                line-height: 60px;
                font-size: 20px;
                color: #d2b068;
                display: inline-block;
            }
            .alter{
                float: right;
                .el-menu{
                    border-right: none;
                }
            }
        }
        .el-container{
            height: calc(100% - 60px);
            .el-menu{
                    border-right: none;
                }
            .el-main{
                padding-top: 0;
                .el-breadcrumb{
                    line-height: 50px;
                    // background-color: #fff;
                }
            }
        }
       .el-aside{
        background-color: #fff;
        color:blue
       }
    }
}
.el-col-12{
    width: 100%;
}
</style>
