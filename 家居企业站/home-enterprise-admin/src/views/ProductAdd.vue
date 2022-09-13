<template>
  <el-card>
    <!-- <el-button class="button"
               type="primary"
               @click="back">返回</el-button> -->
    <el-form ref="addProductForm"
             :model="addProductForm"
             label-width="90px"
             :rules="productAddRules">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="addProductForm.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload class="img-uploader"
                   :headers="{token:token}"
                   :show-file-list="false"
                   :on-success="handleAddProductSuccess"
                   :before-upload="beforeImgUpload"
                   :action="uploadUrl">
          <img v-if="addProductForm.thumb"
               :src="host+addProductForm.thumb"
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
                  v-model="addProductForm.content"
                  :mode="mode"
                  :defaultConfig="editorConfig"
                  @onCreated="onAddProductCreated" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitAddProductForm()">提交</el-button>
        <el-button @click="resetForm('addProductForm')">重置</el-button>
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
      addProductForm: {
        title: '',
        content: '',
        thumb: ''
      },
      productAddRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    pageSizes: function () { return this.$store.state.pageSizes },
    limit: function () { return this.$store.state.limit }
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
  },
  methods: {
    async getproductData () {
      const res = await this.api.product.all()
      if (res.data.code === 200) {
        this.productData = res.data.data
      }
    },
    async submitAddProductForm () {
      // 表单验证
      if (!this.addProductForm.thumb) { this.$message.error('请传入图片') }
      if (!this.addProductForm.content) { this.$message.error('请传入内容') }
      if (this.addProductForm.thumb) {
        if (this.addProductForm.content) {
          // ajax请求
          const res = await this.api.product.add(this.addProductForm)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.$router.push({ name: 'list-product' })
          }
        } else {
          this.$message('请输入内容')
          return false
        }
      } else {
        this.$message('请上传图片')
        return false
      }
    },
    onAddProductCreated (editor) {
      this.editor = Object.seal(editor)
    },
    resetForm () {
      this.$refs.addProductForm.resetFields()
    },
    handleAddProductSuccess (response) {
      if (response.code === 200) {
        this.$message.success(response.msg)
        this.addProductForm.thumb = response.data
      } else {
        this.$message.error(response.msg)
      }
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
