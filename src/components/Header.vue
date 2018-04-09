<template>
  <div class="header_w header_fixed_zy">
        <img class="logo_w" src="../assets/images/logoMW.png" alt=""/>
        <p class="name_w">管理平台</p>
        <div class="headerR_w">
            <div class="userB_w">
                <img class="uesImg_w" :src="headImg" alt=""/>
                <p class="userName_w">{{$store.state.user.name}} &lt;{{$store.state.user.mailAddress}}@troila.com&gt;</p>
                <i class="userI_w"></i>
                <div class="c-both"></div>
            </div>
            <div class="userP_w">
                <dl>
                    <dt><img :src="headImg" alt=""/></dt>
                    <dd>{{$store.state.user.name}}</dd>
                    <dd>暂未设置企业名称暂未设置企业名称暂未设置企业名称</dd>
                </dl>
                <div class="headerBtn_w">
                    <a class="mdfPwd_w" href="javascript:;" @click="changePswd">修改密码</a>
                    <a class="exit_w mt-10" href="javascript:;">退出</a>
                </div>
            </div>
        </div>
        <!--修改密码弹窗 start-->
        <div class="pop3_w hide">
            <ul class="telNumB_w">
                <li class="mb-20">
                    <span>原密码</span><input class="input_w" type="password" value=""/>
                    <p class="error_w">原始密码输入有误</p>
                </li>
                <li class="mb-20">
                    <span>新密码</span><input class="input_w" type="password" value=""/>
                </li>
                <li>
                    <span>确认密码</span><input class="input_w" type="password" value=""/>
                    <p class="error_w">两次密码输入不一致</p>
                </li>

            </ul>
        </div>
        <!--修改密码弹窗 over-->
    </div>
</template>
<script>
import "../assets/js/jquery-1.11.3.min.js";
import "../assets/js/layer/layer.js";
import "../assets/js/layer/skin/default/layer.css";
import "../assets/css/public.css";
import "../assets/css/wy_manage.css";
export default {
  name: "Header",
  computed: {
    headImg() {
      var ImgUrl = process.env.API_SERVER + this.$store.state.user.headImg;
      // 默认头像
      var DefaultImg = require("../assets/images/userImgLMW.png");
      if (!ImgUrl) {
        return DefaultImg;
      } else {
        return ImgUrl;
      }
    }
  },
  methods: {
    changePswd() {
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
        }
      });
    }
  }
};
</script>



