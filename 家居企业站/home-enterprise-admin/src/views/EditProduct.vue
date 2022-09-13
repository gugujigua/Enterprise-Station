<template>
  <el-card>
    {{$route.params.id}}
    <el-form ref="editProduct"
             :model="editProduct"
             label-width="90px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="editProduct.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload class="img-uploader"
                   :headers="{token:token}"
                   :show-file-list="false"
                   :on-success="handleeditProductSuccess"
                   :before-upload="beforeImgUpload"
                   :action="uploadUrl">
          <img v-if="editProduct.thumb"
               :src="host+editProduct.thumb"
               class="img">
          <i v-else
             class="el-icon-plus img-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容"
                    prop="content">
        <div style="border: 1px solid #ccc;">
          <Toolbar style="border-bottom: 1px solid #ccc"
                   :editor="editor"
                   :mode="mode"
                   :defaultConfig="toolbarConfig" />
          <Editor style="height: 500px; overflow-y: hidden;"
                  :mode="mode"
                  v-model="editProduct.content"
                  :defaultConfig="editorConfig"
                  @onCreated="oneditProductCreated" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submiteditProduct()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  components: { Editor, Toolbar },
  data () {
    return {
      token: '',
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',
      editProduct: {
        title: '',
        content: '',
        thumb: ''
      }
    }
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl }
  },
  methods: {
    async submiteditProduct () {
      // 表单验证
      if (!this.editProduct.thumb) {
        this.$message.error('请传入图片')
        return false
      }
      if (!this.editProduct.content) {
        this.$message.error('请传入内容')
        return false
      }
      if (!this.editProduct.content) {
        // ajax请求
        this.$message('请输入内容')
        return false
      }
      const res = await this.api.product.edit(this.editProduct.id, this.editProduct)
      if (res.data.code === 200) {
        console.log(res)
        this.$message.success(res.data.msg)
        this.$router.push({ name: 'list-product' })
      }
    },
    oneditProductCreated (editor) {
      this.editor = Object.seal(editor)
    },
    handleeditProductSuccess (response) {
      if (response.code === 200) {
        this.$message.success(response.msg)
        this.editProduct.thumb = response.data
      } else {
        this.$message.error(response.msg)
      }
    }
  },
  async created () {
    const that = this
    this.token = sessionStorage.getItem('token')
    this.editorConfig.MENU_CONF = {
      uploadImage: {
        server: this.uploadUrl,
        headers: { token: this.token },
        customInsert (res, insertFn) {
          if (res.code === 200) {
            insertFn(that.host + res.data)
          } else { that.$message.error(res.msg) }
        }
      }

    }
    const res = await this.api.product.one(this.$route.params.id)
    if (res.data.code === 200) {
      this.editProduct = res.data.data
    }
  },
  beforeDestroy () {
    if (this.editor == null) return
    this.editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  height: 100%;
}
.button {
  margin-left: 90px;
  margin-bottom: 20px;
}
</style>
