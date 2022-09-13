<template>
  <el-card>
    <el-row :gutter="20"
            class="mb20">
      <el-col :span="4"
              :offset="12">
        <el-date-picker style="width:100%"
                        type="date"
                        placeholder="选择日期"
                        value-format="timestamp"
                        v-model="pikerDate"
                        @change="piker">
        </el-date-picker>
      </el-col>
      <el-col :span="8">
        <el-input placeholder="请输入内容"
                  v-model="searchName"
                  clearable
                  @clear="getCoopData">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="searchFn"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="CooperateData"
              style="width: 100%"
              ref="CooperateData">
      <el-table-column label="ID"
                       width="180"
                       prop="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户"
                       width="180"
                       prop="name">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式"
                       width="180"
                       prop="contact">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.contact }}</span>
        </template>
      </el-table-column>
      <el-table-column label="需求"
                       width="180"
                       prop="msg">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.msg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提交日期"
                       width="180"
                       prop="create_time">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time |date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="lookCooperate(scope.row)"
                     type="primary">查看</el-button>
          <el-button @click="delCooperate(scope.row)"
                     type="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="getCoopData"
                   @current-change="pageChange"
                   :current-page.sync="page"
                   :page-sizes="pageSizes"
                   :page-size.sync="limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   class="mt20">
    </el-pagination>
    <!-- 查看 -->
    <el-dialog title="查看"
               :visible.sync="dialogLookVisible"
               width="44%">
      <el-form ref="addWheelForm"
               :model="lookCooperateForm"
               label-width="80px">
        <el-form-item label="用户">
          <el-input v-text="lookCooperateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-text="lookCooperateForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="需求">
          <el-input v-text="lookCooperateForm.msg"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogLookVisible = false">返回</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      pikerDate: '',
      searchName: '',
      CooperateData: [],
      lookCooperateForm: [],
      page: 1,
      total: 1,
      dialogLookVisible: false
      // pageSizes: [2, 5, 10, 20, 50],
      // limit: 2
    }
  },
  computed: {
    pageSizes: function () { return this.$store.state.pageSizes },
    limit: function () { return this.$store.state.limit }
  },
  methods: {
    piker () {
      // console.log(this.pikerDate)
      this.getCoopData()
    },
    pageChange () {
      this.getCoopData()
    },
    searchFn () {
      this.getCoopData()
    },
    async getCoopData () {
      const query = {
        page: this.page,
        limit: this.limit
      }
      if (this.pikerDate) {
        query.date = this.pikerDate
      }
      if (this.searchName) {
        this.ctx.query.name = this.searchName
        console.log(this.searchName)
      }
      const res = await this.api.coop.all(query)
      if (res.data.code === 200) {
        this.CooperateData = res.data.data
        this.total = res.data.total
        this.$message.success(res.data.msg)
      }
    },
    delCooperate (data) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.cooperate.delete(data.id)
        if (res.data.code === 200) {
          this.$message.success(res.data.msg)
        }
      })
    },
    lookCooperate (row) {
      this.lookCooperateForm = JSON.parse(JSON.stringify(row))
      this.dialogLookVisible = true
    }
  },
  created () {
    this.getCoopData()
  }
}
</script>
<style lang="scss" scoped>
</style>
