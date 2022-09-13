export default {
  methods: {
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
    }
  }
}
