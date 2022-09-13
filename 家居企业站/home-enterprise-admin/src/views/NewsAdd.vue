<template>
  <el-card>
    <el-form ref="addNewsForm"
             :model="addNewsForm"
             label-width="90px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="addNewsForm.title"></el-input>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input v-model="addNewsForm.description"></el-input>
      </el-form-item>
      <el-form-item label="链接">
        <el-input v-model="addNewsForm.thumb"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload class="img-uploader"
                   :show-file-list="false"
                   :headers="{token:token}"
                   :on-success="handleAddNewsSuccess"
                   :before-upload="beforeImgUpload"
                   :action="uploadUrl">
          <img v-if="addNewsForm.thumb"
               :src="host+addNewsForm.thumb"
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
                  v-model="addNewsForm.content"
                  :mode="mode"
                  :defaultConfig="editorConfig"
                  @onCreated="onAddNewsCreated" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitAddNewsForm(addNewsForm)">提交</el-button>
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
      addNewsForm: {
        title: '',
        content: '',
        thumb: ''
      },
      NewsAddRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ]
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
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl }
  },
  methods: {
    async getNewsData () {
      const res = await this.api.news.all()
      if (res.data.code === 200) {
        this.NewsData = res.data.data
      }
    },
    async submitAddNewsForm () {
      // 表单验证
      if (!this.addNewsForm.thumb) { this.$message.error('请传入图片') }
      if (!this.addNewsForm.content) { this.$message.error('请传入内容') }
      if (this.addNewsForm.thumb) {
        if (this.addNewsForm.content) {
          // ajax请求
          const res = await this.api.news.add(this.addNewsForm)
          if (res.data.code === 200) {
            this.$message.success(res.data.msg)
            this.$router.push({ name: 'list-news' })
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
    onAddNewsCreated (editor) {
      this.editor = Object.seal(editor)
    },
    resetForm () {
      this.$refs.addNewsForm.resetFields()
    },
    handleAddNewsSuccess (response) {
      if (response.code === 200) {
        this.$message.success(response.msg)
        this.addNewsForm.thumb = response.data
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
