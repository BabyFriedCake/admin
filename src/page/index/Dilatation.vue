<template>
    <div>
        <p class="admin_tit">申请扩容</p>
           <DilatationOrder></DilatationOrder>
            <p class="admin_tit mt-40">扩容记录</p>
            <DilatationLog></DilatationLog>
    </div>
</template>
<script>
import DilatationOrder from './subcomponents/DilatationOrder';
import DilatationLog from './subcomponents/DilatationLog';
export default {
  name:'Dilatation',
  components:{
      DilatationOrder,
      DilatationLog
  }
}
</script>
<style scoped>
@import '../../assets/css/admin_zy.css';
</style>
