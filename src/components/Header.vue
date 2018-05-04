<template>
  <div class="header_w header_fixed_zy">
        <img class="logo_w" src="../assets/images/logoMW.png" alt=""/>
        <p class="name_w">管理平台</p>
        <div class="headerR_w">
            <div class="userB_w">
                <img class="uesImg_w" :src="headImg" alt=""/>
                <p class="userName_w">{{$store.state.user.name}}</p>
                <i class="userI_w"></i>
                <div class="c-both"></div>
            </div>
            <div class="userP_w">
                <dl>
                    <dt><img :src="headImg" alt=""/></dt>
                    <dd>{{$store.state.user.name}}</dd>
                    <dd>{{enterPriseName}}</dd>
                </dl>
                <div class="headerBtn_w">
                    <a class="mdfPwd_w" href="javascript:;" @click="changePswd">修改密码</a>
                    <a class="exit_w mt-10" href="javascript:;" @click="logout">退出</a>
                </div>
            </div>
        </div>
        <!--修改密码弹窗 start-->
        <div class="pop3_w hide">
            <ul class="telNumB_w">
                <li class="mb-20">
                    <span>原密码</span><input class="input_w" type="password" value="" id="resetOldPassword"/>
                    <p class="error_w hide">原始密码输入有误</p>
                </li>
                <li class="mb-20">
                    <span>新密码</span><input class="input_w" type="password" value="" id="resetNewPassword"/>
                </li>
                <li>
                    <span>确认密码</span><input class="input_w" type="password" value="" id="resetNewPassword2"/>
                    <p class="error_w hide">两次密码输入不一致</p>
                </li>

            </ul>
        </div>
        <!--修改密码弹窗 over-->
    </div>
</template>
<script>
// import "../assets/js/jquery-1.11.3.min.js";
// import "../assets/js/layer/layer.js";
// import "../assets/js/layer/skin/default/layer.css";
// import "../assets/css/public.css";
// import "../assets/css/wy_manage.css";
export default {
  name: "Header",
  computed: {
    headImg() {
      var ImgUrl = process.env.API_SERVER + this.$store.state.user.headImg;
      // 默认头像
      var DefaultImg = require("../assets/images/userImgLMW.png");
      if (this.$store.state.user.headImg=='null' || this.$store.state.user.headImg==null) {
        return DefaultImg;
      } else {
        return ImgUrl;
      }
    },
    enterPriseName(){
        var ent = this.$store.getters.getItemWithSessionStorage("enterpriseInfo")
        return ent?ent.name:"未知";
    }
  },
  methods: {
    changePswd() {
        var __this = this;
        $("#resetOldPassword").val("");
        $("#resetNewPassword").val("");
        $("#resetNewPassword2").val("");
      //修改密码弹窗
      layer.open({
        type: 1,
        skin: "pop_w",
        title: "修改密码",
        area: ["580px", "auto"],
        btn: ["确认", "取消"],
        content: $(".pop3_w"),
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          mask.appendTo(layero.parent());
        },
        btn1: function(index, layero){
            var resetOldPassword = $("#resetOldPassword").val();
            if(resetOldPassword==""){
                layer.msg("请填写原密码",{icon:7,time:2000});
                return;
            }
            var resetNewPassword = $("#resetNewPassword").val();
            if(resetNewPassword==""){
                layer.msg("请填写新密码",{icon:7,time:2000});
                return;
            }
            if(!__this.checkPwd(resetNewPassword)){
                layer.msg("密码应由字母、数字及下划线组成的6-20位字符",{icon:7,time:2000});
                return;
            }
            if(resetOldPassword==resetNewPassword){
                layer.msg("新密码不能和旧密码一样",{icon:7,time:2000});
                return;
            }
            var resetNewPassword2 = $("#resetNewPassword2").val();
            if(resetNewPassword2==""){
                layer.msg("请确认新密码",{icon:7,time:2000});
                return;
            }
            if(resetNewPassword!=resetNewPassword2){
                layer.msg("两次新密码输入不一致",{icon:7,time:2000});
                return;
            }


            __this.$axios.put(process.env.API_SERVER+"/api/account/password",{
                oldPassword:resetOldPassword,
                newPassword:resetNewPassword
            })
                .then(res=>{
                    layer.closeAll();
                    $(".pop3_w").hide();
                    layer.msg("操作成功！", {icon:1,time:2000,skin:'Smsg_w'});
                });

        },
        btn2: function(index, layero){
            $(".pop3_w").hide();
        }
      });
    },
    logout(){
        this.$axios.post(process.env.API_SERVER+"/api/logout")
        .then(res=>{
            window.location.href = "/";
            sessionStorage.clear();
            $(".pop2_w").hide();
            window.location.reload();
            }
        );
    },
    checkPwd(pwd){
        var reg = /^[A-Za-z0-9_]{6,20}$/;
        return pwd.match(reg);
    }
  }
};
</script>



