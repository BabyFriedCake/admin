<template>
    <div class="header_w">
        <img class="logo_w" src="../assets/images/logoMW.png" alt=""/>
        <p class="name_w">管理平台</p>
        <div class="headerR_w">
            <div class="userB_w">
                <img class="uesImg_w" src="../assets/images/userImgMW.png" alt=""/>
                <p class="userName_w">肉小虎 &lt;rouxiaohu@troila.com&gt;</p>
                <i class="userI_w"></i>
                <div class="c-both"></div>
            </div>
            <div class="userP_w">
                <dl>
                    <dt><img src="../assets/images/userImgLMW.png" alt=""/></dt>
                    <dd>肉小虎</dd>
                    <dd>暂未设置企业名称暂未设置企业名称暂未设置企业名称</dd>
                </dl>
                <div class="headerBtn_w">
                    <a class="mdfPwd_w" href="javascript:;">修改密码</a>
                    <a class="exit_w mt-10" href="javascript:;">退出</a>
                </div>
            </div>
        </div>
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
    </div>
</template>
<script>
export default {
  name:'DomainHeader'
}
</script>
<style>
@import '../assets/css/common.css';
@import '../assets/css/public.css';
</style>
