<template>
  <div class="login_box">
        <img src="../../assets/images/login_bg.jpg" alt=""/>
        <div class="login_main">
            <h1 class="login_logo"></h1>
            <div class="login_inp mt-80">
                <input type="text" v-model="username" placeholder="（请填写企业云邮的完整账号，或管理员账号）"/>
                <i class="login_num"></i>
                <span>帐号</span>
                <p class="error">请输入帐号</p>
            </div>
            <div class="login_inp">
                <input type="text" v-model="password" placeholder=""/>
                <i class="login_pwd"></i>
                <span>密码</span>
                <p class="error">请输入密码</p>
            </div>
            <div class="clearfix mt-10">
                <a href="忘记密码1.html" class="login_blue fl">忘记密码</a>
                <a href="注册.html" class="login_blue fr">注册管理员账号</a>
            </div>
            <a href="javascript:;" class="login_btn_zy" @click="login">登录</a>
        </div>
    </div>
</template>
<script>
import axios from '../../utils/ajax.js';
import Vue from 'vue'
import Vuex from 'vuex'
import store from '../../store/index'
Vue.use(Vuex)
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      var param = {
        username: this.username,
        password: this.password
      };
      axios.post(process.env.API_SERVER+"/api/login", param)
      .then((res) => {
        sessionStorage.setItem("user",JSON.stringify(res));
        store.state.user = res;
        this.$router.push({ name: "index" });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  created:function(){

  }
};
</script>
<style scoped>
@import "../../assets/css/common.css";
@import "../../assets/css/wy.css";
@import "../../assets/css/zy.css";
</style>

