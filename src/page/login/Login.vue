<template>
  <div class="login_box">
        <img src="../../assets/images/login_bg.jpg" alt=""/>
        <div class="login_main">
            <h1 class="login_logo"></h1>
            <div class="login_inp mt-80">
                <input type="text" v-model="username" placeholder="（请填写企业云邮的完整账号，或管理员账号）" @keyup.enter="login"/>
                <i class="login_num"></i>
                <span>帐号</span>
                <p class="error hide">请输入帐号</p>
            </div>
            <div class="login_inp">
                <input type="password" v-model="password" placeholder="" @keyup.enter="login"/>
                <i class="login_pwd"></i>
                <span>密码</span>
                <p class="error hide">请输入密码</p>
            </div>
            <div class="clearfix mt-10">
                <a href="忘记密码1.html" class="login_blue fl">忘记密码</a>
                <a href="javascript:;" class="login_blue fr" @click="regManage">注册管理员账号</a>
            </div>
            <a href="javascript:;" class="login_btn_zy" @click="login" >登录</a>
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
      if(this.username==""){
        layer.msg("用户名不能为空", {skin: "Smsg_w",icon: 2,offset: "60px",time: 2000});
        return;
      }
      if(this.password==""){
        layer.msg("密码不能为空", {skin: "Smsg_w",icon: 2,offset: "60px",time: 2000});
        return;
      }
      var param = {
        username: this.username,
        password: this.password
      };
      this.$axios.post(process.env.API_SERVER+"/api/login", param)
      .then((res) => {
        if(res){
          sessionStorage.setItem("user",JSON.stringify(res));
          store.state.user = res;
          if(res.domainStatus=='1'){//this.$router.push({ name: "domainStep2" });
            this.$router.push({ name: "index" });
          }else if(res.domainStatus=='2'){//
            this.$router.push({ name: "domainStep2" });
          }else if(res.domainStatus=='0'){
            this.$router.push({ name: "domainStep1" });
          }else if(res.domainStatus=='8'){
            window.location.href = "/";
          }else if(res.domainStatus=='9'){
            window.location.href = "/";
          }
        }
      })
      
    },
    regManage(){
      window.location.href = "/reg/step1";
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

