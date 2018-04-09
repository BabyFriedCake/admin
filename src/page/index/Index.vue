<template>
  <div>
    <Header></header>
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
        <keep-alive>
        <router-view/>
        </keep-alive>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import Footer from '../../components/Footer.vue'
import '../../assets/js/jquery-1.11.3.min.js'
export default {
  name: 'IndexMain',
  components:{Header,Footer},
  mounted(){
    // 页面最小高度
    var winH=$(window).height()-$('.header_w').outerHeight();
    $(".admin_nav_zy").css({
        "height":winH,
    });
    $(".admin_con_zy").css({
        "minHeight":winH-$('.admin_footer_zy').outerHeight(),
    });
    // var adminMinH = $('.admin_con_zy').outerHeight()-70-56-62
    // $('.admin_bigWhite').css('minHeight',adminMinH)
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
