<template>
  <el-card>
    <el-form ref="settingForm"
             :model="settingForm"
             label-width="100px">
      <el-form-item label="网站标题"
                    prop="title">
        <el-input v-model="settingForm.title"></el-input>
      </el-form-item>
      <el-form-item label="网站关键词"
                    prop="keywords">
        <el-input v-model="settingForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input type="textarea"
                  v-model="settingForm.description"></el-input>
      </el-form-item>
      <el-form-item label="LOGO">
        <el-upload class="img-uploader"
                   :headers="{token:token}"
                   :action="uploadUrl"
                   :show-file-list="false"
                   :on-success="handleLogoSuccess"
                   :before-upload="beforeImgUpload">
          <img v-if="settingForm.logo"
               :src="host+settingForm.logo"
               class="img">
          <i v-else
             class="el-icon-plus img-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="咨询热线"
                    prop="telephone">
        <el-input v-model="settingForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="移动电话"
                    prop="helpline">
        <el-input v-model="settingForm.helpline"></el-input>
      </el-form-item>
      <el-form-item label="公司地址"
                    prop="address">
        <el-input v-model="settingForm.address"></el-input>
      </el-form-item>
      <el-form-item label="全国热线"
                    prop="sales_hotline">
        <el-input v-model="settingForm.sales_hotline"></el-input>
      </el-form-item>
      <el-form-item label="公众号二维码">
        <el-upload class="img-uploader"
                   :show-file-list="false"
                   :headers="{token:token}"
                   :on-success="handleQrSuccess"
                   :before-upload="beforeImgUpload"
                   :action="uploadUrl">
          <img v-if="settingForm.qr"
               :src="host+settingForm.qr"
               class="img">
          <i v-else
             class="el-icon-plus img-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="版权"
                    prop="copyright">
        <el-input type="textarea"
                  v-model="settingForm.copyright"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm(settingForm)">提交</el-button>
        <el-button @click="resetForm('settingForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      settingForm: {
        title: '',
        keywords: '',
        description: '',
        logo: '',
        helpline: '',
        telephone: '',
        address: '',
        sales_hotline: '',
        qr: '',
        copyright: ''
      }
    }
  },
  async created () {
    this.token = sessionStorage.getItem('token')
    const res = await this.api.info.one(1)
    if (res.data.code === 200) {
      this.settingForm = res.data.data
    }
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl }
  },
  methods: {
    async submitForm () {
      const res = await this.api.info.edit(1, this.settingForm)
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
      }
    },
    resetForm () {
      this.$refs.settingForm.resetFields()
    },
    handleLogoSuccess (response) {
      if (response.code === 200) {
        this.settingForm.logo = response.data
      } else {
        this.$message.error(response.msg)
      }
    },
    beforeImgUpload (file) {
      const isJPG = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'].indexOf(file.type) !== -1
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、PNG、GIF 格式!')
      }
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 1MB!')
      }
      return isJPG && isLt1M
    },
    handleQrSuccess (response) {
      if (response.code === 200) {
        this.settingForm.qr = response.data
      } else {
        this.$message.error(response.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  padding-top: 10px;
}
</style>
