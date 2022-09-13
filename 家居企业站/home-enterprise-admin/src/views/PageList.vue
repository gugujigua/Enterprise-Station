<template>
  <el-card>
    <div class="mb20">
      <el-button class="button"
                 type="primary"
                 @click="addPageData">添加</el-button>
    </div>
    <el-table :data="PageData"
              style="width: 100%">
      <el-table-column label="ID"
                       width="180"
                       prop="id">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题"
                       width="230"
                       prop="title">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间"
                       width="180"
                       prop="create_time">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.create_time |date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间"
                       width="180"
                       prop="update_time">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.update_time |date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="editPage(scope.row)"
                     type="primary">编辑</el-button>
          <el-button type="primary"
                     @click="delPage(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="getPageData"
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
      PageData: [],
      page: 1,
      total: 1
    }
  },
  created () {
    this.getPageData()
  },
  computed: {
    pageSizes: function () { return this.$store.state.pageSizes },
    limit: function () { return this.$store.state.limit }
  },
  methods: {
    async getPageData () {
      const res = await this.api.page.all(this.page, this.limit)
      if (res.data.code === 200) {
        this.PageData = res.data.data
        this.total = res.data.total
      }
    },
    pageChange () {
      this.getPageData()
    },
    editPage (data) {
      this.$router.push({
        name: 'edit-page',
        params: {
          id: data.id
        }
      })
    },
    delPage (data, index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.api.page.delete(data.id)
        if (res.data.code === 200) {
          this.PageData.splice(index, 1)
          this.getPageData()
          this.$message.success(res.data.msg)
        }
      })
    },
    addPageData () {
      this.$router.push({ name: 'add-page' })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
