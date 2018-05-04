<template>
    <div>
        <DomainHeader></DomainHeader>
        <div class="main_w">
            <ul class="stepNB_w">
                <li class="on"><i></i><div class="stepN_w"><b>1</b><span>填写信息</span></div><i></i></li>
                <li><div class="stepN_w"><b>2</b><span>等待域名解析</span></div><i></i></li>
                <div class="c-both"></div>
            </ul>
            <div class="whiteB_w">
                <div class="whiteIB_w">
                    <ul class="setList_w">
                        <li>
                            <label><input type="radio" class="publishDomain" checked name="stepRadio"/>使用卓朗云邮企业版提供的域名（无需购买备案，无域名解析失败风险）</label>
                        </li>
                        <li>
                            <label><input type="radio" class="noDName_w" name="stepRadio"/>我有域名（请将域名解析到我们的邮件服务器172.26.35.102）</label>
                        </li>
                        <li><span>企业名称</span><input class="input_w" type="text" v-model="entName"/></li>
                        <li class="hasDNameM_w"><span>域名</span><input class="input_w mr18_w" type="text" id="domain1" v-model="domain1" maxlength="64"/>.troila.com</li>
                        <li class="noDNameM_w hide"><span>域名</span><input class="input_w mr18_w" type="text" id="domain2" v-model="domain2" maxlength="64"/></li>
                        <li><a class="btnS_w ml70_w" href="javascript:;" @click="next">下一步</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <DomainFooter></DomainFooter>
    </div>
</template>
<script>
import '../../assets/js/jquery-1.11.3.min.js'
import '../../assets/js/iCheck.js'

import DomainHeader from '../../components/DomainHeader.vue'
import DomainFooter from '../../components/DomainFooter.vue'
export default {
    data() {
        return {
            entName: "",
            domain1: "",
            domain2: ""
        };
    },
  name:'DomainStep1',
  components:{DomainHeader,DomainFooter},
  methods:{
      next(){
          if (this.entName=="") {
              layer.msg("请输入企业名称！",{icon:7,time:2000,skin:'Smsg_w'});
              return;
          }
          var domain = "";
          var domainType = "";
          var isChecked = $(".publishDomain").is(':checked');
          if(isChecked){
              if(this.domain1==""){
                layer.msg("请输入域名！",{icon:7,time:2000,skin:'Smsg_w'});
                return;
              }
              domainType = "Builtin";
              domain = this.domain1+".troila.com";
          }else{
              if(this.domain2==""){
                layer.msg("请输入域名！",{icon:7,time:2000,skin:'Smsg_w'});
                return;
              }
              domainType = "Customized";
              domain = this.domain2;
          }
          var param = {
						  "enterpriseSettings": {   
						    "domainName": domain,
						    "domainType": domainType    
						  },
						  "name": this.entName
						};
            
            this.$axios.put(process.env.API_SERVER+"/api/enterprise/domain/step1", param)
            .then((res) => {
                layer.msg("操作成功", {
                        skin: "Smsg_w",
                        icon: 1,
                        offset: "60px",
                        time: 2000
                        });
                this.$router.push({name:'domainStep2'})
            })
            .catch((error)=>{
                console.log(error);
                
            });
          
      }
  },
  mounted(){
    $(window).resize(function() {
        // 页面最小高度
        var minH = $(window).height()-$('.header_w').outerHeight()-$('.footer_w').outerHeight()
        $('.main_w').css('minHeight',minH)
    });
    // 页面最小高度
    var minH = $(window).height()-$('.header_w').outerHeight()-$('.footer_w').outerHeight()
    $('.main_w').css('minHeight',minH)
    // 单选框插件
    $("input[type='radio']").iCheck({
      radioClass: 'iradio_square-blue'
    })
    // $('.noDName_w').on('ifChecked', function () {
    //     $('.btnS_w').attr("href",'02_设置域名第二步（自选）.html')
    // })
    $(".noDName_w").on('ifChanged', function(event){
        $(".noDNameM_w").toggle();
        $(".hasDNameM_w").toggle()
    })
  },
  created:function(){
      let userCode = this.$store.state.user.userCode;
      let __this = this;
      this.$axios.get(process.env.API_SERVER+"/api/enterprise/getByUserCode?userCode="+userCode).then(
          res=>{
              __this.entName = res.name;
          }
      );
  }
}
</script>
<style>
@import '../../assets/css/wy_manage.css';
</style>
