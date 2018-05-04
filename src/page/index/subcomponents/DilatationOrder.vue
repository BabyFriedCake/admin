<template>
              <div class="admin_whiteList">
                <ul class="kr_box">
                    <li>
                        <div class="kr1">已有用户数</div>
                        <div class="kr2">{{entuserQuotas}} 人</div>
                        <div class="kr3">
                            <i class="t-a-r w-70 pr-20">新增用户数</i>
                            <p class="kr_count clearfix">
                                <a href="javascript:;" class="reduceBtn" @click="deleteNum('users')">-</a>
                                <input type="text" class="countInp" value="0" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="users"/>
                                <a href="javascript:;" class="addBtn" @click="addNum('users')">+</a>
                            </p>
                            <i class="pl-20">人</i>
                        </div>
                    </li>
                    <li class="mt-20">
                        <div class="kr1">已有容量</div>
                        <div class="kr2">{{entStorage/1024}} G</div>
                        <div class="kr3">
                            <i class="t-a-r w-70 pr-20">新增容量</i>
                            <p class="kr_count clearfix">
                                <a href="javascript:;" class="reduceBtn" @click="deleteNum('storage')">-</a>
                                <input type="text" class="countInp" value="0" onkeyup="this.value=this.value.replace(/\D/g,'')" v-model="storage"/>
                                <a href="javascript:;" class="addBtn" @click="addNum('storage')">+</a>
                            </p>
                            <i class="pl-20">G</i>
                        </div>
                    </li>
                    <li class="mt-20">
                        <div class="kr1">价格</div>
                        <div class="kr2"><i>￥</i><i class="c_fc4545 f-s-16">{{totalPrice}}</i></div>
                    </li>
                    <li class="mt-20">
                        <a href="javscript:;" class="admin_btn_solid w-80 ml-10" @click="submitOrder">支 付</a>
                    </li>
                </ul>
            </div>
</template>
<script>
export default {
  name: "DilatationOrder",
  data:function(){
      return {
          users:0,
          storage:0,
          kr_min:0,
          kr_max:1000,
          userPrice:100,
          storagePrice:100
      }
  },
  methods:{
      show(){
        //   console.log(this.person);
      },
      addNum(type){
        if(this[type]<this.kr_max){
            this[type]++;
        }
      },
      deleteNum(type){
        if(this[type]>this.kr_min){
            this[type]--;
        }
      },
      submitOrder(){
          var __this = this;
          if(__this.users<=0 && __this.storage<=0){
              alert("请选择新增的使用人数和容量！");
              return;
          }
          let param = {
              enlargeUsers:this.users,
              enlargeStorageCapacity:this.storage*1024,
              totalAmount:this.totalPrice
          };
          this.$axios.post(process.env.API_SERVER + "/api/enterprise/enlarge/apply",param)
          .then(res=>{
              if(__this.DEBUG){
                  console.log(res);
              }
              __this.bus.$emit("updateDilatationLog");
          })
      }
  },
  mounted: function() {

  },
  created:function(){
      var __this = this;
      this.$axios.get(process.env.API_SERVER + "/api/enterprise/enlarge/priceConfig")
      .then(res=>{
          if(__this.DEBUG){
              console.log(res);
              __this.userPrice = res.oneUserPrice;
              __this.storagePrice = res.oneStoragePrice;
          }
      })
  },
  computed:{
      totalPrice(){
          return this.users*this.userPrice + this.storage*this.storagePrice;
      },
      entStorage(){
           return this.$store.getters.getItemWithSessionStorage("entSettings").maxStorageCapacity;
      },
      entuserQuotas(){
           return this.$store.getters.getItemWithSessionStorage("entSettings").userQuotas;
      }
  }
};
</script>
<style scoped>
@import "../../../assets/css/admin_zy.css";
</style>

