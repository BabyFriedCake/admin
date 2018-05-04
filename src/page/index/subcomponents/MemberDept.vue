<template>
         <div class="admin_bigWhite log_w p30">
        <p class="dPN_w"><b class="pl190">部门</b><b class="dPNR_w">操作</b></p>
        <!--展开收起 start-->
        <ul class="deptL_w deptLW100_w grade1">
           <Department :dept="root" :grade="grade"></Department>
        </ul>
        <!--展开收起 over-->
    </div>
</template>
<script>
import Department from './Department'
export default {
  name:"MemberDept",
  components:{
      Department
  },
   computed:{
      root(){
          return this.$store.getters.getItemWithSessionStorage("rootdept");
      },
      grade(){
          return 2;
      }
  },
    mounted:function(){
      $(".deptL_w").on("click","li a",function(){
        $(this).toggleClass("down").siblings("ul").slideToggle()
        $(this).parent().find("ul").find("a").removeClass("down").siblings("ul").slideUp()
        $(this).parent().siblings().find("a").removeClass("down")
        $(this).parent().siblings().find("ul").slideUp();
    })
  },
  watch:{
     
  },
  created:function(){
       this.$axios.get(process.env.API_SERVER+"/api/dept/allDeptTree")
      .then((res)=>{
          if(process.env.NODE_ENV=="development"){
              console.log(res);
          }
          this.$store.commit({
              type:"setStateWithSessionStorage",
              field:"rootdept",
              data:res
          });
      })
  }
}
</script>


<style scoped>
@import '../../../assets/css/wy_manage.css';
</style>