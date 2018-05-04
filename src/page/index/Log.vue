<template>
    <div>
        <p class="mb-20">
            <!-- <a class="logBtn_w on mr40_w" href="javascript:;">登录日志</a> -->
            <!-- <a href="javascript:;" class="logBtn_w">操作日志</a> -->
            <router-link to="/log/login" class="logBtn_w mr40_w" active-class="on">登录日志</router-link>
            <router-link to="/log/operation" class="logBtn_w" active-class="on">操作日志</router-link>
            </p>
            <router-view></router-view>
    </div>
</template>
<script>

import LoginLog from './subcomponents/LoginLog';
import OperateLog from './subcomponents/OperateLog'

export default {
  name:'Log',
  components : {
      LoginLog,
      OperateLog
  },
  data : function(){
      return {
        
      }
  },
  methods : {

  },
  computed : {

  },
  mounted : function(){
      $(".logBtn_w").click(function(){
        $(this).addClass("on").siblings().removeClass("on")
        var index=$(this).index();
        $(".log_w").eq(index).show().siblings(".log_w").hide()
    })
  },
  created : function(){
      
  }
}
</script>
<style scoped>
@import '../../assets/css/wy_manage.css';
</style>
