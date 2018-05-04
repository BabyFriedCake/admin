<template>
    <div>
        <DomainHeader></DomainHeader>
        <div class="main_w">
            <ul class="stepNB_w">
                <li class="on"><i></i><div class="stepN_w"><b>1</b><span>填写信息</span></div><i></i></li>
                <li class="on"><div class="stepN_w"><b>2</b><span>等待域名解析</span></div><i></i></li>
                <div class="c-both"></div>
            </ul>
            <div class="whiteB_w">
                <div class="whiteIB_w">
                    <div class="waitOwn_w">
                        <img src="../../assets/images/loadingW.gif" alt=""/>您的域名尚未解析到我们的邮件服务器
                    </div>
                    <dl class="waitB_w">
                        <dt><img src="../../assets/images/loadingW.gif" alt=""/></dt>
                        <dd><h4>域名解析中......</h4></dd>
                        <dd>12小时内，解析结果会以短信方式发送到您的手机上，若解析成功，可登录卓朗云邮企业版进行使用。<br/>
                            如长时间未通知解析结果，请致电022-87277888。
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <DomainFooter></DomainFooter>
    </div>
</template>
<script>
import DomainHeader from '../../components/DomainHeader.vue'
import DomainFooter from '../../components/DomainFooter.vue'
export default {
    data:function(){
        timeid = ""
    },
  name:'DomainStep1',
  components:{DomainHeader,DomainFooter},
  methods:{
      
  },
  // 页面最小高度
  mounted(){
    $(window).resize(function() {
        // 页面最小高度
        var minH = $(window).height()-$('.header_w').outerHeight()-$('.footer_w').outerHeight()
        $('.main_w').css('minHeight',minH)
    });
    var minH = $(window).height()-$('.header_w').outerHeight()-$('.footer_w').outerHeight()
    $('.main_w').css('minHeight',minH)

    this.timeid = setInterval(() => {
            this.$axios.get(process.env.API_SERVER+"/api/enterprise/domain/resolved", "")
            .then((res) => {
                if(res){
                    clearInterval(this.intervalid1);
                    this.$router.push({ name: "index" });
                }
            })
            .catch((error)=>{
                console.log(error);
                layer.msg(error, {
                        skin: "Smsg_w",
                        icon: 2,
                        offset: "60px",
                        time: 2000
                        });
            });
        }, 3000);
        
  },
  created(){
      this.$axios.get(process.env.API_SERVER+"/api/enterprise/domain/resolved", "")
            .then((res) => {
                if(res){
                this.$router.push({ name: "index" });
                }
            })
            .catch((error)=>{
                console.log(error);
                layer.msg(error, {
                        skin: "Smsg_w",
                        icon: 2,
                        offset: "60px",
                        time: 2000
                        });
            });

        
        

  },
  destroyed(){
      clearInterval(this.timeid);
  }
}
</script>
<style scoped>
@import '../../assets/css/wy_manage.css';
</style>
