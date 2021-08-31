<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :rules="loginRules"
      :model="loginForm"
      class="login-form-container"
      v-loading="loading"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="captchaCode">
        <el-input
          style="width: 450px"
          type="text"
          v-model="loginForm.captchaCode"
          placeholder="请输入验证码"
        ></el-input>
        <el-image
          style="width: 100px; height: 40px; margin-left: 10px"
          :src="captchaSrc"
          fit="none"
          @click="getCaptchaSrc"
        >
          <div slot="error">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-form-item>
      <el-checkbox class="remember-me" v-model="checked">记住我</el-checkbox>
      <el-button class="login-button" type="primary" @click="loginSubmit"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { captcha, user } from "../http/path";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        captchaCode: "",
        captchaGuid: "",
      },
      captchaSrc: "",
      checked: true,
      loading: false,
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "blur",
          },
        ],
        captchaCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "长度为 4 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getCaptchaSrc();
  },
  methods: {
    getCaptchaSrc() {
      this.$http({
        url: captcha.getCaptchaBase64,
        params: {
          guid: this.loginForm.captchaGuid,
        },
      }).then((res) => {
        this.captchaSrc = res.obj.captchaSrc;
        this.loginForm.captchaGuid = res.obj.captchaGuid;
      });
    },
    loginSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http({
            url: user.login,
            method: "post",
            data: this.loginForm,
          }).then((res) => {
            this.loading = false;
            if (res.code == 200) {
              let tokenStr = res.obj.tokenHead + " " + res.obj.token;
              window.sessionStorage.setItem("authToken", tokenStr);
              let path = this.$route.query.redirect;
              this.$router.replace(
                path == "/" || path == undefined ? "/home" : path
              );
            }
          });
        } else {
          this.$message.error("请输入所有必填字段");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.login-form-container {
  width: 35rem;
  margin: 18rem auto;
  padding: 1.5rem 3.5rem 1.5rem 3.5rem;
  border: 1px solid #eaeaea;
  border-radius: 1.5rem;
  background-clip: padding-box;
  background-color: #fff;
  box-shadow: 0 0 2.5rem #cac6c6;

  .login-title {
    font-size: 1.6rem;
    text-align: center;
  }

  .login-button {
    width: 100%;
  }

  .captcha-pic {
    width: 100px;
    height: 40px;
    margin-left: 10px;
  }

  .remember-me {
    margin: 0 0 15px;
  }

  .el-form-item__content {
    display: flex;
    align-items: center;
  }
}
</style>