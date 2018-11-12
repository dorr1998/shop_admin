<template>
    <!-- el-form: 表单组件 -->
    <!-- :model="form" form对象用来收集表单中所有的数据 -->
    <!-- label-width：设置label的宽度 -->
    <!-- el-form-item：表单项 -->
    <!-- rules: 设置校验的规则 给每一个el-form-item设置一个prop属性 v-model的值一样 -->
  <div class="login">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
      <img src="../assets/1.jpg" alt="">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" @keyup.enter.native="login"></el-input>
      </el-form-item>    
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入axios
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        // 对username进行校验
        username: [
          // 必填项
          { required: true, message: '请输入用户名', trigger: 'change' },
          // 校验长度
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.form.resetFields()
    },
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 发送ajax请求
          this.axios({
            url: 'login',
            method: 'post',
            data: this.form
          }).then(res => {
            // console.log(res.data)
            let {
              meta: { status }
            } = res
            if (status === 200) {
              // 登录成功
              this.$message.success('登录成功')
              // 跳转到Home组件
              this.$router.push('/home')
              // 登录拦截，存储token
              localStorage.setItem('token', res.data.token)
            } else {
              this.$message.error('登录失败')
            }
          })
        } else {
          // 校验没通过
          return false
        }
      })
    }
  }
}
</script>

<style lang="less">
.login {
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;
    height: 200px;
    background-color: #fff;
    margin: 200px auto;
    padding: 80px 40px 15px;
    border-radius: 20px;
    position: relative;
    img {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -70px;
      border-radius: 50%;
      border: 10px solid #fff;
    }
    .el-button + .el-button {
      margin-left: 50px;
    }
  }
}
</style>
