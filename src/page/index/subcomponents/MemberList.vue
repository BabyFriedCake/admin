<template>
    <div class="admin_bigWhite log_w pt-30 pb-30">
        <div class="deptML_w">
            <ul class="deptL_w grade1">
                <DepartmentTree :dept="root" :grade="grade"></DepartmentTree>
            </ul>
        </div>
        <Members></Members>
    </div>
</template>
<script>
import Members from './MemberComponent';
import DepartmentTree from './DepartmentTree'
export default {
  name:"MemberList",
  components:{
      Members,
      DepartmentTree
  },
    computed:{
      root(){
          return this.$store.getters.getItemWithSessionStorage("rootdept");
      },
      grade(){
          return 2;
      }
  },
  activated:function(){
      this.bus.$emit("searchAllMember");
      
  },
  mounted:function(){
      $(".deptL_w").on("click","li a",function(){
        $(this).toggleClass("down").siblings("ul").slideToggle()
        $(this).parent().find("ul").find("a").removeClass("down").siblings("ul").slideUp()
        $(this).parent().siblings().find("a").removeClass("down")
        $(this).parent().siblings().find("ul").slideUp();
    })
  }
}
</script>

