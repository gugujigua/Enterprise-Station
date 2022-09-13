<template>
  <el-card>
    <el-form ref="addPageForm"
             :model="addPageForm"
             label-width="90px">
      <el-form-item label="标题"
                    prop="title">
        <el-input v-model="addPageForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容"
                    prop="content">
        <div style="border: 1px solid #ccc;">
          <Toolbar style="border-bottom: 1px solid #ccc"
                   :editor="editor"
                   :mode="mode"
                   :defaultConfig="toolbarConfig" />
          <Editor style="height: 500px; overflow-y: hidden;"
                  v-model="addPageForm.content"
                  :mode="mode"
                  :defaultConfig="editorConfig"
                  @onCreated="onAddPageCreated" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitaddPageForm(addPageForm)">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
export default {
  components: { Editor, Toolbar },
  data () {
    return {
      token: '',
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default',
      addPageForm: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl }
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
    async submitaddPageForm () {
      // 表单验证
      if (!this.addPageForm.content) { this.$message.error('请传入内容') } else {
        // ajax请求
        const res = await this.api.page.add(this.addPageForm)
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.$router.push({ name: 'list-page' })
        }
      }
    },
    onAddPageCreated (editor) {
      this.editor = Object.seal(editor)
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
