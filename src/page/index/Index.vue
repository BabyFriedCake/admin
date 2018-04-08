<template>
  <div>
    <Header></header>
    <!-- <ChangePswd></ChangePswd> -->
    <div class="admin_wrapper_zy">
      <div class="admin_nav_zy">
          <ul>
              <router-link to="/account"><li><i class="nav_icon1"></i><a href="javascript:;">账户信息</a></li></router-link>
              <router-link to="/memberManage"><li><i class="nav_icon2"></i><a href="javascript:;">成员管理</a></li></router-link>
              <router-link to="/paper"><li><i class="nav_icon3"></i><a href="javascript:;">信纸</a></li></router-link>
              <router-link to="/spam"><li><i class="nav_icon4"></i><a href="javascript:;">反垃圾</a></li></router-link>
              <router-link to="/dilatation"><li><i class="nav_icon5"></i><a href="javascript:;">申请扩容</a></li></router-link>
              <router-link to="/log"><li><i class="nav_icon6"></i><a href="javascript:;">日志</a></li></router-link>
          </ul>
      </div>
      <div class="admin_con_zy" style="overflow: hidden">
        <router-view/>
      </div>
      <Footer></Footer>
    </div>

    
  </div>
  
</template>

<script>
import '../../assets/js/jquery-1.11.3.min.js'

import '../../assets/js/layer/layer.js'
import '../../assets/js/layer/skin/default/layer.css';
import '../../assets/css/public.css';
import '../../assets/css/wy_manage.css';


import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
export default {
  name: 'IndexMain',
  components:{Header,Footer},
  computed:{
    // if(adPopMW == 1){
    //   //添加子部门
    //   $(".addDpart_w").click(function(){
    //       layer.open({
    //           id:'dlayer1',
    //           type:1,
    //           skin:"pop_w",
    //           title:"添加部门",
    //           area:["580px","auto"],
    //           btn:["确认","取消"], 
    //           content:$(".adPopM_w"),
    //       })
    //   })
    // }
  },
  mounted(){
    // 页面最小高度
    var winH=$(window).height()-$('.header_w').outerHeight();
    $(".admin_nav_zy").css({
        "height":winH,
    });
    $(".admin_con_zy").css({
        "minHeight":winH,
    });
  }
}
</script>

<style>
@import '../../assets/css/select.css';
@import '../../assets/css/common.css';
@import '../../assets/css/public.css';
.router-link-active a{background: #279afc;color: #fff !important;}
.router-link-active i{background-position: 0 -23px !important }
</style>
