<template>
   <div class="users">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/users">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框功能 -->
    <div>
      <el-input placeholder="请输入关键字" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="showAddDialog">用户添加</el-button>
    </div>
    <!-- 表格展示功能 -->
    <!-- el-table:表格组件 -->
    <!-- :data="tableData": 需要给表格组件传递数据 -->
    <!-- el-table-column：表格的一列 -->
    <!-- label：表格这一列的标题 -->
    <!-- prop： 这一列对应的数据的属性名 -->
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        label="状态"
        width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949" @change="changeState(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <!-- 自定义这一列的内容，必须指定template -->
        <template slot-scope="scope">
          <el-button size="small" plain type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
          <el-button size="small" plain type="danger" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
          <el-button size="small" plain type="success" icon="el-icon-check">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
    <!-- current-change： 当页面发生改变的时候 -->
    <!-- size-change: 当每页的条数发生改变的时候 -->
    <!-- current-page:显示当前页 -->
    <!-- page-size:每页显示的条数 -->
    <!-- total:总条数 -->
    <!-- layout:控制分页的子组件的显示 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      :page-sizes="[2, 4, 6, 8]"
      background
      layout="total, sizes, prev, pager, next, jumper"
     >
    </el-pagination>
    <!-- 添加对话框 -->
    <el-dialog
    title="添加用户"
    :visible.sync="addDialogVisible"
    width="40%">
    <!-- 添加用户表单 -->
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input placeholder="请输入密码" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input placeholder="请输入手机" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog
    title="修改用户"
    :visible.sync="editDialogVisible"
    width="40%">
    <!-- 添加用户表单 -->
      <el-form :model="editForm" ref="editForm" label-width="80px" :rules="rules" status-icon>
        <el-form-item label="用户名">
          <el-tag type="info">{{editForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input placeholder="请输入手机" v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询关键字
      query: '',
      // 当前页
      currentPage: 1,
      // 每页显示的条数
      pageSize: 2,
      // 总的条数
      total: 0,
      // 用户的列表数据
      userList: [],
      // 控制对话框的显示隐藏
      addDialogVisible: false,
      // 收集用户数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 表单校验
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确格式的邮箱', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确格式的手机号',
            trigger: 'blur'
          }
        ]
      },
      // 控制编辑模态框的显示隐藏
      editDialogVisible: false,
      // 编辑表单数据
      editForm: {
        id: '',
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    // 获取用户列表信息
    getUserList() {
      // 发送ajax请求，获取用户列表数据
      this.axios({
        method: 'get',
        url: 'users',
        params: {
          query: this.query,
          pagenum: this.currentPage,
          pagesize: this.pageSize
        }
      }).then(res => {
        // console.log(res.data)
        let {
          meta: { status },
          data
        } = res
        if (status === 200) {
          this.userList = data.users
          this.total = data.total
        }
      })
    },
    handleCurrentChange(val) {
      // val就是当前页
      // console.log(val)
      // 修改当前页
      this.currentPage = val
      // 重新发送ajax请求获取数据
      this.getUserList()
    },
    // 每页条数发生改变
    handleSizeChange(val) {
      console.log(val)
      // 改变每页条数的时候，需不需要把页码改成1
      this.currentPage = 1
      this.pageSize = val
      // 重新渲染
      this.getUserList()
    },
    // 搜索功能
    search() {
      // 搜索需要把当前改成1
      this.currentPage = 1
      this.getUserList()
    },
    // 删除用户
    delUser(id) {
      console.log(id)
      this.$confirm('你确定要删除这个用户吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.axios({
            method: 'delete',
            url: `users/${id}`
          }).then(res => {
            let {
              meta: { status }
            } = res
            if (status === 200) {
              // 1. 重新渲染
              if (this.userList.length === 1 && this.currentPage > 1) {
                this.currentPage--
              }
              this.getUserList()
              // 2. 提示删除成功,  问题：如果当前页只有一条数据的时候，页码值-1
              this.$message.success('删除成功了')
            }
          })
        })
        .catch(() => {
          this.$message.error('你取消了删除操作')
        })
    },
    // 开关切换状态
    changeState(user) {
      // console.log(user)
      this.axios({
        url: `users/${user.id}/state/${user.mg_state}`,
        method: 'put'
      }).then(res => {
        // console.log(res.data)
        let {
          meta: { status }
        } = res
        if (status === 200) {
          this.$message.success('修改状态成功')
        } else {
          this.$message.error('修改状态失败')
        }
      })
    },
    // 显示添加模态框
    showAddDialog() {
      this.addDialogVisible = true
    },
    // 添加用户
    addUser() {
      // 发送ajax之前先进行表单校验
      this.$refs.addForm.validate(valid => {
        if (!valid) return false
        if (valid) {
          this.axios({
            url: 'users',
            method: 'post',
            data: this.addForm
          }).then(res => {
            // console.log(res)
            if (res.meta.status === 201) {
              // console.log('添加成功')
              // 重新渲染最后一页
              this.total++
              this.currentPage = Math.ceil(this.total / this.pageSize)
              // 重新渲染
              this.getUserList()
              // 关闭模态框
              this.addDialogVisible = false
              // 重置表单
              this.$refs.addForm.resetFields()
            } else {
              console.log('添加失败')
            }
          })
        }
      })
    },
    // 显示编辑的模态框
    showEditDialog(user) {
      this.editDialogVisible = true
      // console.log(user)
      // 数据回显
      this.editForm.id = user.id
      this.editForm.username = user.username
      this.editForm.email = user.email
      this.editForm.mobile = user.mobile
    },
    // 修改用户信息
    editUser() {
      // 表单校验
      this.$refs.editForm.validate(valid => {
        if (!valid) return false
        if (valid) {
          this.axios({
            method: 'put',
            url: `users/${this.editForm.id}`,
            data: this.editForm
          }).then(res => {
            // console.log(res)
            if (res.meta.status === 200) {
              this.$message.success('编辑用户信息成功')
              // 重新渲染
              this.getUserList()
              // 重置表单
              this.$refs.editForm.resetFields()
              // 关闭模态框
              this.editDialogVisible = false
            } else {
              this.$message.error('编辑用户信息失败')
            }
          })
        }
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
}

.el-input {
  width: 400px;
  margin-bottom: 10px;
}
</style>
