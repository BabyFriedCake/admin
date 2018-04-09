<template>
   <li v-if="dept!=null">
    <a href="javascript:;">{{dept.name}}</a>
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

