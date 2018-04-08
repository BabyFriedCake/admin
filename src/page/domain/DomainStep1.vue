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
                            <label><input type="radio" checked name="stepRadio"/>使用卓朗云邮企业版提供的域名（无需购买备案，无域名解析失败风险）</label>
                        </li>
                        <li>
                            <label><input type="radio" class="noDName_w" name="stepRadio"/>我有域名（请将域名解析到我们的邮件服务器172.26.35.102）</label>
                        </li>
                        <li><span>企业名称</span><input class="input_w" type="text"/></li>
                        <li class="hasDNameM_w"><span>域名</span><input class="input_w mr18_w" type="text"/>.troila.com</li>
                        <li class="noDNameM_w hide"><span>域名</span><input class="input_w mr18_w" type="text"/></li>
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
  name:'DomainStep1',
  components:{DomainHeader,DomainFooter},
  methods:{
      next(){
          this.$router.push({name:'domainStep2'})
      }
  },
  mounted(){
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
  }
}
</script>
<style>
@import '../../assets/css/wy_manage.css';
</style>
