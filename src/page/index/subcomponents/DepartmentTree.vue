<template>
   <li v-if="dept!=null">
    <a href="javascript:;" @click="setSearchDept">{{dept.name}}</a>
        <ul class="hide" :class="currentGrade">
                <DepartmentTree v-for="(dept,index) in dept.subDepts" :dept="dept" :key="index" :grade="propGrade"></DepartmentTree>
        </ul>
    </li>
</template>
<script>
export default {
  name:"DepartmentTree",
  props: {
    dept: Object,
    grade: Number
  },
  methods:{
      setSearchDept(){
        this.$store.state.searchDept = this.dept;
        this.bus.$emit("searchMember",0);
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
}
</script>
<style scoped>
@import "../../../assets/css/public.css";
@import "../../../assets/css/wy_manage.css";
</style>