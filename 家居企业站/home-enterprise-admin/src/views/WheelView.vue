<template>
  <el-card>
    <el-row class="mb20">
      <el-col :span="24">
        <el-button type="primary"
                   @click="addWheel">添加轮播</el-button>
      </el-col>
    </el-row>
    <el-table :data="wheelData"
              style="width: 100%">
      <el-table-column prop="id"
                       label="ID"
                       width="60">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="180">
      </el-table-column>
      <el-table-column prop="thumb"
                       label="缩略图">
        <template slot-scope="scope">
          <img :src="host+scope.row.thumb"
               height="60px">
        </template>
      </el-table-column>
      <el-table-column prop="link"
                       label="链接">
        <template slot-scope="scope">
          <a :href="scope.row.link">{{scope.row.link}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="sort"
                       label="排序"
                       width="80">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editWheel(scope.row)"
                     type="primary">编辑</el-button>
          <el-button type="primary"
                     @click="delWheel(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加轮播 -->
    <el-dialog title="添加轮播图"
               :visible.sync="dialogAddWheelVisible"
               width="44%">
      <el-form ref="addWheelForm"
               :model="addWheelForm"
               :rules="rules"
               label-width="80px"
               hide-required-asterisk="true">
        <el-form-item label="标题"
                      prop="title">
          <el-input v-model="addWheelForm.title"></el-input>
        </el-form-item>
        <el-form-item label="链接"
                      prop="link">
          <el-input v-model="addWheelForm.link"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload class="img-uploader"
                     :action="uploadUrl"
                     :show-file-list="false"
                     :headers="{'token':token}"
                     :on-success="handleAddWheelSuccess"
                     :before-upload="beforeImgUpload">
            <img v-if="addWheelForm.thumb"
                 :src="host+addWheelForm.thumb"
                 class="img">
            <i v-else
               class="el-icon-plus img-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序"
                      prop="sort">
          <el-input v-model="addWheelForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogAddWheelVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAddWheelData ">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑轮播 -->
    <el-dialog title="编辑轮播图"
               :visible.sync="dialogEditWheelVisible"
               width="44%">
      <el-form ref="addWheelForm"
               :model="editWheelForm"
               label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="editWheelForm.title"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="editWheelForm.link"></el-input>
        </el-form-item>
        <el-form-item label="缩略图">
          <el-upload class="img-uploader"
                     :show-file-list="false"
                     :headers="{token:token}"
                     :on-success="handleEditWheelSuccess"
                     :before-upload="beforeImgUpload"
                     :action="uploadUrl">
            <img v-if="editWheelForm.thumb"
                 :src="host+editWheelForm.thumb"
                 class="img">
            <i v-else
               class="el-icon-plus img-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editWheelForm.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogEditWheelVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitEditWheelData(editWheelForm) ">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import mixins from '../utils/mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      token: '',
      wheelData: [],
      dialogAddWheelVisible: false,
      dialogEditWheelVisible: false,
      addWheelForm: {
        title: '',
        thumb: '',
        link: '',
        sort: 0
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        link: [
          { required: true, message: '请输入链接', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
        ]
      },
      editWheelForm: {},
      editSourceWheelForm: {}
    }
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl }
  },
  created () {
    this.token = sessionStorage.getItem('token')
    this.getwheelData()
  },
  methods: {
    async getwheelData () {
      const res = await this.api.wheel.all()
      if (res.data.code === 200) {
        this.wheelData = res.data.wheels
      }
    },
    addWheel () {
      this.dialogAddWheelVisible = true
    },
    editWheel (row) {
      this.editSourceWheelForm = row
      this.editWheelForm = JSON.parse(JSON.stringify(row))
      this.dialogEditWheelVisible = true
    },
    async submitAddWheelData () {
      if (this.addWheelForm.thumb) {
        // ajax 提交
        this.$refs.addWheelForm.validate((valid) => {
          if (valid) {
            // alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
        const res = await this.api.wheel.add(this.addWheelForm)
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
          this.getwheelData()
          this.dialogAddWheelVisible = false
        }
      } else {
        // 提示
        this.$message.error('请上传图片')
        return false
      }
    },
    async submitEditWheelData (id) {
      const res = await this.api.wheel.edit(id.id, this.editWheelForm)
      if (res.data.code === 200) {
        this.$message.success(res.data.msg)
        this.dialogEditWheelVisible = false
        Object.assign(this.editSourceWheelForm, this.editWheelForm)
      }
    },
    handleAddWheelSuccess (response) {
      if (response.code === 200) {
        this.addWheelForm.thumb = response.data
      } else {
        this.$message.error(response.msg)
      }
    },
    handleEditWheelSuccess (response) {
      if (response.code === 200) {
        this.editWheelForm.thumb = response.data
      } else {
        this.$message.error(response.msg)
      }
    },
    delWheel (data, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.wheel.delete(data.id)
        if (res.data.code === 200) {
          this.wheelData.splice(index, 1)
          this.$message.success(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
