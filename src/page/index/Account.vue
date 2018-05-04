<template>
  <div>
    <p class="admin_tit">账户信息</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="w100_w verAB_w">
                <span>头像</span>
                <img :src="hdImage" alt=""/>
                <label class="upLoadT_w"><input type="file" class="file_w" accept="image/gif,image/jpeg,image/png,image/jpg" />上传</label>
            </li>
            <li><span>企业名称</span>
                <input class="input_w unInput_w" type="text"  value="" readonly="readonly" v-model="enterprise.name"/>
            </li>
            <li>
                <span>邮箱域名</span>
                <input class="input_w unInput_w" type="text" value="" readonly="readonly" v-model="settings.domainName"/>
            </li>
            <li class="mb0_w">
                <span>手机号</span>
                <input class="input_w unInput_w" type="text" value="" readonly="readonly" v-model="enterprise.contact"/> 
                <a class="modify_w" href="javascript:;" @click="changeMobile">修改</a>
            </li>
            <div class="c-both"></div>
        </ul>
    </div>

    <p class="admin_tit mt-40">使用情况</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="po-re">
              <span>总容量</span>
              <div class="proBox_w"><p class="proNum_w" :style="{width:proNumW}"></p></div>
              <i class="numBox_w"><b class="usNum_w">{{sumAccountCap|division}}G</b>/<b class="allNum_w">{{settings.maxStorageCapacity|division}}G</b></i></li>
            <li><span>成员默认容量</span>
                <div class="selectBox_w w150">
                    <select name="" id="defaultStorageCapacity">
                        <option value="1024">1G</option>
                        <option value="2048">2G</option>
                        <option value="5120">5G</option>
                    </select>
                </div>
            </li>
            <li class="po-re mb0_w w100_w">
              <span>成员数量</span>
              <div class="proBox_w">
                <p class="proNum_w" :style="{width:w}"></p>
              </div>
              <i class="numBox_w"><b class="usNum_w">{{accountNum}}</b>/{{settings.userQuotas}}</i></li>
            <div class="c-both"></div>
        </ul>
    </div>

    <p class="admin_tit mt-40">企业出口IP设置</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="w100_w mb0_w">
              <span>出口IP</span>
              <input class="input_w" type="text"  v-model="settings.validIpaddress" />
              <i class="noteT_w">（IP之间以；隔开）</i>
              </li>
            <div class="c-both"></div>
        </ul>
    </div>

    <p class="admin_tit mt-40">企业名片模板<i class="noteT_w">（设置成功后，员工才可使用名片）</i></p>
    <div class="admin_whiteList">
        <ul class="moduleL_w">
            <li v-show="cardImgFlag"><img class='cardImg' :src='cardImgUrl'></li>
            <li>
              <div class="fileBox_w">
              <input class="fileBtn_w" type="file"/>
              <a class="btnFile_w" href="javascript:;">浏览</a>
              </div><span class="fileN_w" >{{originalFilename}}</span>
            </li>
            <li><input class="input_w unInput_w" type="text" placeholder="员工姓名，由员工自行填写"/></li>
            <li><input class="input_w unInput_w" type="text" placeholder="职位，由员工自行填写"/></li>
            <li><input class="input_w unInput_w" type="text" placeholder="联系电话，由员工自行填写"/></li>
            <li><input class="input_w unInput_w" type="text" placeholder="传真，由员工自行填写"/></li>
            <li class="clearfix mt-20"><input class="input_w fr" type="text" placeholder="企业英文名称，不填时自动隐藏该项" v-model="settings.bizEnglishCard"/></li>
            <li class="mb0_w clearfix"><input class="input_w fr" type="text" placeholder="企业名称，不填时自动隐藏该项" v-model="settings.bizCard"/></li>
        </ul>
    </div>
    <div class="mt-20 clearfix">
        <a href="javascript:;" class="admin_btn_border w-80 fr">取消</a>
        <a href="javascript:;" class="admin_btn_solid w-80 mr-20 fr" @click="submitAll">保存更改</a>
    </div>
    <!--解绑原始手机号 弹窗 start-->
    <div class="pop1_w hide">
        <ul class="telB_w">
            <li class="on mr45">解绑原始手机号</li>
            <li>设置新手机号</li>
            <div class="clear"></div>
        </ul>
        <ul class="telNumB_w">
            <li class="mb-20"><span>原始手机号</span><input class="input_w" type="text"  v-model="oldPhone" readonly="readonly"/></li>
            <li>
                <span>手机验证码</span><input class="input_w w180 mr-10" type="text" v-model="tempValidataCode1" @focus="v1=true" @blur="v1=false"/><a class="btnBorder_w" href="javascript:;" @click="getPhoneValidateCode">{{validateTip}}</a>
                <p v-show="v1 && validateCode1" class="error_w" :key="vc1">手机验证码错误</p>
            </li>
        </ul>
    </div>
    <!--解绑原始手机号 弹窗 over-->
    <!--设置新手机号码弹窗 start-->
    <div class="pop2_w hide">
        <ul class="telB_w">
            <li class="mr45">解绑原始手机号</li>
            <li class="on">设置新手机号</li>
            <div class="clear"></div>
        </ul>
        <ul class="telNumB_w">
            <li class="mb-20">
                <span>新手机号</span><input class="input_w" type="text" value="" v-model="newMobile" v-validate="{ required: true, regex: /^[1][3,4,5,7,8][0-9]{9}$/}" name="newphone"/>
                <p v-show="errors.has('newphone')" class="error_w">手机号格式不正确，请重新输入</p>
            </li>
            <li>
                <span>手机验证码</span><input class="input_w w180 mr-10" type="text" @focus="v2=true" @blur="v2=false" v-model="tempValidataCode2"/><a class="btnBorder_w" href="javascript:;" @click="getPhoneValidateCode2">{{validateTip2}}</a>
                <p  v-show="v2 && validateCode2" class="error_w" :key="vc2">手机验证码错误</p>
            </li>
        </ul>
    </div>
    <!--设置手机号码弹窗 over-->
</div>
</template>
<script>
import "../../assets/js/select.js";
export default {
  name: "Account",
  data() {
    return {
      newMobile:"",
      enterprise: {},
      settings:{
        bizCard:"",
        bizEnglishCard:"",
        bizCardPicture:"",
        defaultStorageCapacity:"",
        domainName:"",
        userQuotas:50,
        validIpaddress:"",
        domainName:""
      },
      v1:false,
      v2:false,
      tempValidataCode1:"",
      tempValidataCode2:"",
      validateCode1:false,
      validateCode2:false,
      accountNum: "",
      waitTime:60,
      leftTime:0,
      leftTime2:0,
      timerID:0,
      timerID2:0,
      sumAccountCap: "",
      oldPhone:"",
      hdImg: this.$store.state.user.headImg,
      cardImg:'',
      // cardImgFlag:false,
      originalFilename:'未选择文件',
      cardUrl:"",
      bizCardPicture:"",
      defaultStorageCapacitys:[
        {
          val : 1024,
          name : 1
        },
        {
          val : 2048,
          name : 2
        },
        {
          val : 5120,
          name : 5
        },
      ]
    };
  },
  filters: {
    division: function(value) {
      if (!value) return 0;
      value = Math.round(value / 1024);
      return value;
    }
  },
  computed: {
    vc1(){
      var __this = this;
      if(this.tempValidataCode1.length == 6){
        this.$axios.get(process.env.API_SERVER + "/api/account/validatePhoneValidateCode?phoneValidateCode="+__this.tempValidataCode1)
          .then(res=>{
            if(res==true){
              this.validateCode1 = false;
            }else{
              this.validateCode1 = true;
            }
          });
        return false;
      }
      this.validateCode1 = true;
      return true;
    },

    vc2(){
    var __this = this;
      if(this.tempValidataCode2.length == 6){
        this.$axios.get(process.env.API_SERVER + "/api/account/validatePhoneValidateCode?phoneValidateCode="+__this.tempValidataCode2)
          .then(res=>{
            if(res==true){
              this.validateCode2 = false;
            }else{
              this.validateCode2 = true;
            }
          });
        return false;
      }
      this.validateCode2 = true;
      return true;
    },
    validateTip(){
      if(this.leftTime == 0){
        return "获取手机验证码";
      }else{
        return this.leftTime+"s后重新获取";
      }
    },
    validateTip2(){
      if(this.leftTime2 == 0){
        return "获取手机验证码";
      }else{
        return this.leftTime2+"s后重新获取";
      }
    },
    hdImage(){
      var ImgUrl = process.env.API_SERVER + this.hdImg;
      // 默认头像
      var DefaultImg = "";
      if (this.hdImg=='null' || this.hdImg==null) {
        return DefaultImg;
      } else {
        return ImgUrl;
      }
    },
    proNumW() {
      var proNumW = Math.round(
        this.sumAccountCap /
          1024 /
          1024 /
          1024 /
          (this.settings.maxStorageCapacity / 1024)
      );
      return proNumW * 100 + "%";
    },
    w() {
      return this.accountNum / this.settings.userQuotas * 100 + "%";
    },
    defaultStorageCapacity(){
      return (this.settings.defaultStorageCapacity / 1024) + 'G'
    },
    cardImgUrl(){
      // this.cardImgFlag = true;
      return process.env.API_SERVER + this.$store.getters.getItemWithSessionStorage("entSettings").bizCardPicture;
    },
    cardImgFlag(){
      if(this.$store.getters.getItemWithSessionStorage("entSettings").bizCardPicture){
        return true;
      }
      return false;
    }
  },
  methods: {
    setTime(){
      if(this.leftTime>0){
        this.leftTime--;
        console.log(this.leftTime)
      }else{
        console.log("停止计时")
        clearInterval(this.timerID);
      }
    },
     setTime2(){
      if(this.leftTime2>0){
        this.leftTime2--;
        console.log(this.leftTime2)
      }else{
        console.log("停止计时")
        clearInterval(this.timerID2);
      }
    },
    getNextValidateCodeTimer(){
      if(this.leftTime == 0){
        this.leftTime = this.waitTime;
        this.timerID = setInterval(this.setTime,1000);
        return true;
      }else{
        return false;
      }
    },
      getNextValidateCodeTimer2(){
      if(this.leftTime2 == 0){
        this.leftTime2 = this.waitTime;
        this.timerID2 = setInterval(this.setTime2,1000);
        return true;
      }else{
        return false;
      }
    },
    getPhoneValidateCode(){
      if(!this.getNextValidateCodeTimer()){
        return;
      }
      var __this = this;
      this.$axios.get(process.env.API_SERVER + "/api/account/getPhoneValidateCode?phoneNumber="+__this.oldPhone)
      .then(res=>{
        if(__this.DEBUG){
          console.log(res);
        }
        // __this.validateCode = res.code;
      });
    },
     getPhoneValidateCode2(){
      if(!this.getNextValidateCodeTimer2()){
        return;
      }
      var __this = this;
      this.$axios.get(process.env.API_SERVER + "/api/account/getPhoneValidateCode?phoneNumber="+__this.newMobile)
      .then(res=>{
        if(__this.DEBUG){
          console.log(res);
        }
        // __this.validateCode = res.code;
      });
    },
    changeMobile() {
      let __this = this
      this.oldPhone = this.enterprise.contact;
      var layer1 = layer.open({
        id: "wlayer1",
        type: 1,
        skin: "pop_w",
        title: "更换手机号",
        area: ["580px", "auto"],
        btn: ["下一步", "取消"],
        content: $(".pop1_w"),
        btn1: function(index1, layero) {
          //点击确定
          if(__this.validateCode1){
            return;
          }
          $(".pop1_w").hide();
          var layer2 = layer.open({
            id: "wlayer2",
            type: 1,
            skin: "pop_w",
            title: "更换手机号",
            area: ["580px", "auto"],
            btn: ["完成", "取消"],
            content: $(".pop2_w"),
            success: function(layero) {
              var mask = $(".layui-layer-shade");
              layero.appendTo(layero.parents("body"));
              mask.appendTo(layero.parents("body"));
            },
            btn1:function(index){
              // __this.$store.state.user.contact = __this.newMobile
              // console.log(__this.$store.state.user);
              if(__this.validateCode2){
                return;
              }
              __this.modifyMobile()
              layer.close(index)
            } ,cancel: function(){
              $(".pop2_w").hide();
              layer.closeAll();
            }
          });

          layer.close(index1);
        },
        btn2: function() {
          $(".pop1_w").hide();
        },
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          layero.appendTo(layero.parents(".admin_wrapper_zy"));
          mask.appendTo(layero.parents(".admin_wrapper_zy"));
        }
        ,cancel: function(){ 
           $(".pop1_w").hide();
              layer.closeAll();
        }
      });
    },
    modifyMobile(){
      let __this = this;
      // var params = {
      //   userCode: this.$store.state.user.userCode
      // }
      // let c = JSON.stringify(this.enterprise)
      this.enterprise.contact = this.newMobile;
      console.log(this.enterprise.contact)
      this.$axios({
        method : 'put',
        url : process.env.API_SERVER + "/api/enterprise",
        data : __this.enterprise
      })
        .then(function(res){
          if(__this.DEBUG){
            console.log(res)
          }
             __this.$store.commit({
              type:"setStateWithSessionStorage",
              field:"enterpriseInfo",
              data:__this.enterprise
          });
          $(".pop2_w").hide();
          // store.commit('__this.$store.state.user.contact',this.newMobile)
          // console.log(this.$store.state.user.contact)
        })
    },
    getEnterprise() {
      let __this = this;
      this.$axios({
        method: "get",
        url: process.env.API_SERVER + "/api/enterprise/getByUserCode",
        params: {
          userCode: __this.$store.state.user.userCode
        }
      }).then(res => {
        this.enterprise = res;
             __this.$store.commit({
              type:"setStateWithSessionStorage",
              field:"enterpriseInfo",
              data:res
          });
        // console.log(__this.enterprise)
        __this.$axios
          .all([
            __this.getSettings(),
            __this.getAccountNum(),
            __this.getSumAccountCap()
          ])
          .then(
            __this.$axios.spread(function(settings, accountNum, sumAccountCap) {
              // n个请求现在都执行完成
              __this.settings = settings;
               __this.$store.commit({
              type:"setStateWithSessionStorage",
              field:"entSettings",
              data:settings
          });
              __this.accountNum = accountNum;
              __this.sumAccountCap = sumAccountCap;
              $("#defaultStorageCapacity").val(__this.settings.defaultStorageCapacity)
              $("#defaultStorageCapacity").selectOrDie('update')
              if(__this.DEBUG){
                console.log(settings)
              }
              sessionStorage.setItem("domainName",__this.settings.domainName);
              // console.log(sessionStorage)
            })
          );
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    //获取企业设置信息
    getSettings() {
      return this.$axios({
        method: "get",
        url: process.env.API_SERVER + "/api/enterprise/settings"
      }).catch(function() {
        layer.msg("获取企业配置信息失败", {
          icon: 1,
          time: 3000,
          skin: "Smsg_w"
        });
      });
    },
    //获取成员数量
    getAccountNum() {
      return this.$axios({
        method: "get",
        url: process.env.API_SERVER + "/api/enterprise/accountNum",
        params: {
          enterpriseId: this.enterprise.id
        }
      }).catch(function() {
        layer.msg("获取成员信息失败", { icon: 1, time: 3000, skin: "Smsg_w" });
      });
    },
    //获取成员用量信息失败
    getSumAccountCap() {
      return this.$axios({
        method: "get",
        url: process.env.API_SERVER + "/api/account/sumAccountCap",
        params: {
          enterpriseId: this.enterprise.id
        }
      }).catch(function() {
        layer.msg("获取成员用量信息失败", {
          icon: 1,
          time: 3000,
          skin: "Smsg_w"
        });
      });
    },
    //文件
    getFile() {
      let __this = this
      var fileM = document.querySelector(".file_w");
      $(".file_w").on("change", function() {
        //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
        var fileObj = fileM.files[0];
        //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
        
        var formData = new FormData();
        formData.append('file',fileObj);
        __this.$axios({
          url: process.env.API_SERVER + "/api/file",
          method: "post",
          data: formData
        })
          .then(function(res) {
            //修改头像
            __this.hdImg = "/api/file?fid=" + res.id
          })
          .catch(function() {
            alert("头像上传失败！");
          })
      })
    },
    // 名片logo
    getCardLogo(){
      let __this = this
      var fileM = document.querySelector(".fileBtn_w");
      $(".fileBtn_w").on("change", function() {
        var fileObj = fileM.files[0];
        var formData = new FormData();
        formData.append('file',fileObj);
        __this.$axios({
          method : 'post',
          url : process.env.API_SERVER + "/api/file",
          data : formData
        }).then(function (res) {
          if(__this.DEBUG){
            console.log(res)
          }
            // __this.cardImgFlag = true
            __this.cardImg = process.env.API_SERVER + "/api/file?fid=" + res.id
            __this.cardUrl = "/api/file?fid=" + res.id;
            __this.$store.state.entSettings.bizCardPicture = __this.cardUrl;
            __this.originalFilename = res.originalFilename
          })
          .catch(function() {
            alert("图像上传失败！");
          })
          
      })
      
    },
    // 保存
    updateEnterprise(){
      let __this = this
      let val = $("#defaultStorageCapacity").val()
      this.settings.defaultStorageCapacity = val;
      this.settings.bizCardPicture = this.cardUrl?this.cardUrl:this.$store.getters.getItemWithSessionStorage("entSettings").bizCardPicture;
      __this.$axios
            .put(process.env.API_SERVER + "/api/enterprise/updateOneEnterpriseSettings", __this.settings)
            .then(res => {
              if(__this.DEBUG){
                console.log(res)
              }
            });


      // __this.$axios({
      //   method: 'put',
      //   url: process.env.API_SERVER + "/api/enterprise/updateOneEnterpriseSettings",
      //   data:{defaultStorageCapacity : this.settings.defaultStorageCapacity}
      // })
      //   .then( returnData =>{
      //     console.log(returnData)
      //     layer.msg("保存成功！",{icon:1,time:3000,skin:'pansty'})
      //   })
      //   .catch(function(error){
      //     //蓝色提示信息
      //     layer.msg('企业配置更新失败',{icon:1,time:3000,skin:'pansty'});
      //   })
    },
    //保存头像
    updateaccount(){
      let __this = this
      let params = {
        id : __this.$store.state.user.id,
        userCode : __this.$store.state.user.userCode,
        name :  __this.$store.state.user.name,
        contact : __this.$store.state.user.contact,
        departmentId : __this.$store.state.user.departmentId,
        mailAddress :  __this.$store.state.user.mailAddress,
        password :  __this.$store.state.user.password,
        status : __this.$store.state.user.status,
        headImg : __this.hdImg
      }
      this.$axios
        .put(process.env.API_SERVER + "/api/account/update", params)
        .then(function(res) {
          // console.log(__this.hdImage)
         __this.$store.state.user.headImg = __this.hdImg;
          __this.$store.commit({
              type:"setStateWithSessionStorage",
              field:"user",
              data: __this.$store.state.user
          });
          // console.log(__this.$store.state.user.headImg)
        })
        .catch(function(error){
          layer.msg('头像保存失败',{icon:1,time:3000,skin:'pansty'});
        })
    },
    submitAll(){
      var __this = this;
      __this.$axios.all([
        __this.updateaccount(),
        __this.updateEnterprise()
      ]).then(res=>{
         layer.msg("保存成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
      }
      );
    }
  },
  created() {},
  mounted() {
      $("select").selectOrDie();
      $(".fileBtn_w").hover(function(){
          $(this).next().css("background","#e1f1ff")
      },function(){
          $(this).next().css("background","#fff")
      })
      console.log(this.$store.state.user);
      this.getEnterprise();
      this.getFile()
      this.getCardLogo()
  }
}
</script>
<style scoped>
@import "../../assets/css/wy_manage.css";
@import "../../assets/css/public.css";
.upLoadT_w, .moduleB_w li img, .moduleB_w li.verAB_w span, .input_w, .modify_w{
  vertical-align: middle;
  padding-bottom: 0;
}
.cardImg {
  width:auto;
  max-width: 100%;
}
</style>
