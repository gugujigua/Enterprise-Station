<template>
  <el-card>
    <div class="mb20">
      <el-button class="button"
                 type="primary"
                 @click="addNewsData">添加</el-button>
    </div>
    <el-table :data="tableNewsData"
              style="width: 100%;overflow:hidden">
      <el-table-column label="ID"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题"
                       width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述"
                       width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="缩略图"
                       width="100">
        <template slot-scope="scope">
          <img :src="host + scope.row.thumb"
               height="60px">
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time |date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间"
                       width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.update_time |date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button @click="editNews(scope.row)"
                     type="primary">编辑</el-button>
          <el-button type="primary"
                     @click="delNews(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="getNewsData"
                   @current-change="pageChange"
                   :current-page.sync="page"
                   :page-sizes="pageSizes"
                   :page-size.sync="limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   class="mt20">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      tableNewsData: [],
      page: 1,
      total: 1
    }
  },
  computed: {
    host: function () { return this.$store.state.host },
    uploadUrl: function () { return this.$store.state.uploadUrl },
    pageSizes: function () { return this.$store.state.pageSizes },
    limit: function () { return this.$store.state.limit }
  },
  created () {
    this.token = sessionStorage.getItem('token')
    this.getNewsData()
  },
  methods: {
    pageChange () {
      this.getNewsData()
    },
    async getNewsData () {
      const res = await this.api.news.all(this.page, this.limit)
      console.log(res)
      if (res.data.code === 200) {
        this.tableNewsData = res.data.data
        this.total = res.data.total
      }
    },
    editNews (data) {
      this.$router.push({
        name: 'edit-news',
        params: {
          id: data.id
        }
      })
    },
    delNews (data, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.news.delete(data.id)
        if (res.data.code === 200) {
          this.tableNewsData.splice(index, 1)
          this.getNewsData()
          this.$message.success(res.data.msg)
        }
      })
    },
    addNewsData () {
      this.$router.push({ name: 'add-news' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
