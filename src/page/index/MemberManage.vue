<template>
  <div>
    <p class="mb-20">
        <router-link to="/memberManage/dept" active-class="on" class="logBtn_w mr40_w">部门管理</router-link>
        <router-link to="/memberManage/member" active-class="on" class="logBtn_w">成员管理</router-link>
        </p>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
</div>
</template>
<script>
import axios from '../../utils/ajax.js';
import store from '../../store/index';
import '../../assets/css/pagination.css';
import '../../assets/js/jquery.pagination';
export default {
  name:'Account',
  created:function(){
   
  }
}
</script>
<style scoped>
@import '../../assets/css/wy_manage.css';
</style>