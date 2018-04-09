<template>
  <div>
    <p class="mb-20">
        <a class="logBtn_w on mr40_w" href="javascript:;">部门管理</a> 
        <a href="javascript:;" class="logBtn_w" @click="getSearch">成员管理</a></p>
        <div class="admin_bigWhite log_w p30">
        <p class="dPN_w"><b class="pl190">部门</b><b class="dPNR_w">操作</b></p>
        <!--展开收起 start-->
        <ul class="deptL_w deptLW100_w grade1">
           <Department :dept="root" :grade="grade"></Department>
        </ul>
        <!--展开收起 over-->
    </div>
    <div class="admin_bigWhite log_w pt-30 pb-30 hide">
        <div class="deptML_w">
            <ul class="deptL_w grade1">
                <DepartmentTree :dept="root" :grade="grade"></DepartmentTree>
            </ul>
        </div>
        <Members></Members>
    </div>
</div>
</template>
<script>
import Department from "./subcomponents/Department";
import DepartmentTree from "./subcomponents/DepartmentTree";
import Members from "./subcomponents/MemberComponent"
import axios from '../../utils/ajax.js';
import store from '../../store/index';
import '../../assets/css/pagination.css';
import '../../assets/js/jquery.pagination';
export default {
  name:'Account',
  components:{
      Department,
      DepartmentTree,
      Members
  },
  created:function(){
       axios.get(process.env.API_SERVER+"/api/dept/allDeptTree")
      .then((res)=>{
          if(process.env.NODE_ENV=="development"){
              console.log(res);
          }
          this.$store.commit({
              type:"setState",
              field:"rootdept",
              data:res
          });
      })
  },
  mounted:function(){
       //展开/收起操作
    $(".deptL_w").on("click","li a",function(){
        $(this).toggleClass("down").siblings("ul").slideToggle()
        $(this).parent().find("ul").find("a").removeClass("down").siblings("ul").slideUp()
        $(this).parent().siblings().find("a").removeClass("down")
        $(this).parent().siblings().find("ul").slideUp();
    })
    $(".logBtn_w").click(function(){
        $(this).addClass("on").siblings().removeClass("on")
        var index=$(this).index();
        $(".log_w").eq(index).show().siblings(".log_w").hide()
    })
     $(".pagination").pagination(100,{
                items_per_page:4,
                num_display_entries:4,
                current_page:0,
                num_edge_entries:1

            });
  },
  computed:{
      root(){
          return this.$store.getters.rootdept;
      },
      grade(){
          return 2;
      }
  },
  methods:{
      getSearch:function(){
         this.$store.commit({
              type:"setState",
              field:"getAll",
              data:true
          })
      }
  }
}
</script>
<style scoped>
@import '../../assets/css/wy_manage.css';
</style>