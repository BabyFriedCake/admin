<template>
   <li v-if="dept!=null">
        <a href="javascript:;">{{dept.name}}</a>
            <ul class="hide" :class="currentGrade">
                <Department v-for="(dept,index) in dept.subDepts" :dept="dept" :key="index" :grade="propGrade"></Department>
            </ul>
            <p class="operList">
                <a class="addDpart_w" href="javascript:;" @click="createSubDept">添加子部门</a>
                <a class="mDpart_w" href="javascript:;" @click="modify">修改</a>
                <a class="dDpart_w" href="javascript:;" @click="del">删除</a></p>
            </li>
</template>
<script>
import "../../../assets/js/jquery-1.11.3.min.js";
import axios from "../../../utils/ajax.js";
export default {
  name: "Department",
  props: {
    dept: Object,
    grade: Number
  },
  mounted() {},
  created() {},
  methods: {
    createSubDept() {
      var __this = this;
      var html =
        '<div class="adPopM_w"><span>部门名称</span><input class="input_w" type="text"/></div>';
      layer.open({
        id: "dlayer1",
        type: 1,
        skin: "pop_w",
        title: "添加部门",
        area: ["580px", "auto"],
        btn: ["确认", "取消"],
        content: html,
        yes: function(index) {
          let name = $(".adPopM_w")
            .find("input")
            .val();
          axios
            .post(process.env.API_SERVER + "/api/dept", {
              name: name,
              enterpriseId: __this.dept.enterpriseId,
              parent: __this.dept.id,
              deptCode: __this.dept.deptCode
            })
            .then(res => {
              res.subDepts = [];
              __this.dept.subDepts.push(res);
            });
          layer.close(index);
        }
      });
    },
    modify() {
        var __this = this;
      layer.open({
        id: "dlayer1",
        type: 1,
        skin: "pop_w",
        title: "修改部门",
        area: ["580px", "auto"],
        btn: ["确认", "取消"],
        content:
          '<div class="adPopM_w"><span>部门名称</span><input class="input_w" type="text"/></div>',
        yes: function(index) {
             let name = $(".adPopM_w")
            .find("input")
            .val();
            axios.put(process.env.API_SERVER + "/api/dept",{
                id:__this.dept.id,
                name:name,
                enterpriseId: __this.dept.enterpriseId,
                deptCode: __this.dept.deptCode,
                gmtCreate:__this.dept.gmtCreate,
                parent: __this.dept.parent,
            })
            .then((res)=>{
                __this.dept.name = name;
                layer.close(index);
                 layer.msg("修改成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
            });
        },
        success:function(){
            $(".adPopM_w")
            .find("input")
            .val(__this.dept.name);
        }
      });
    },
    del() {
      var __this = this;
      if (this.dept.subDepts.length == 0) {
        layer.open({
          id: "dlayer3",
          type: 1,
          skin: "pop_w",
          title: "删除",
          area: ["580px", "auto"],
          btn: ["确认", "取消"],
          content:
            '<p class="dPopM_w">确定要删除部门：' + __this.dept.name + "。</p>",
          yes: function(index) {
            axios
              .delete(
                process.env.API_SERVER + "/api/dept?ids=" + __this.dept.id
              )
              .then(res => {
                for (var i = 0; i < __this.$parent.dept.subDepts.length; i++) {
                  if ((__this.$parent.dept.subDepts[i].id = __this.dept.id)) {
                    __this.$parent.dept.subDepts.splice(i, 1);
                    break;
                  }
                }
                layer.close(index);
                layer.msg("删除成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
              });
          }
        });
      } else {
        layer.open({
          id: "dlayer3",
          type: 1,
          skin: "pop_w",
          title: "删除",
          area: ["580px", "auto"],
          btn: ["确认", "取消"],
          content:
            '<p class="dPopM_w">部门下还存在下级部门或员工，无法删除。</p>'
        });
      }
      console.log(this.dept.subDepts.length);
    }
  },
  computed: {
    currentGrade() {
      return "grade" + this.grade;
    },
    propGrade() {
      let grade = this.grade + 1;
      return grade;
    }
  }
};
</script>
<style scoped>
@import "../../../assets/css/public.css";
@import "../../../assets/css/wy_manage.css";
</style>

