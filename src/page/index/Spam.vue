<template>
    <div>
        <p class="admin_tit">黑名单</p>
        <div class="admin_whiteList">
            <dl>
                <!-- <dt><a href="08_反垃圾_01设置邮件地址黑名单.html">设置邮件地址黑名单</a></dt> -->
                <dt>
                    <!-- <a href="javascript:;" @click="setSpamType(true,false)">设置邮件地址黑名单</a> -->
                    <router-link to="/spamType/address/black">设置邮件地址黑名单</router-link>    
                </dt>
                <dd>（如果你不希望收到某人的邮件，你可以把他的邮件地址加入到黑名单。）</dd>
            </dl>
            <dl class="mt-30">
                <dt>
                    <!-- <a href="javascript:;" @click="setSpamType(false,false)">设置域名黑名单</a> -->
                    <router-link to="/spamType/domain/black">设置域名黑名单</router-link> 
                    <!-- <router-link to="{name:'spamType',params:{isAddress:false,isWhite:false}}">设置域名黑名单</router-link> -->
                </dt>
                <dd>（例：在域名黑名单中设置“example.com”，拒绝来自该站点的邮件。）</dd>
            </dl>
        </div>

        <p class="admin_tit mt-40">白名单</p>
        <div class="admin_whiteList">
            <dl>
                <dt>
                    <!-- <a href="javascript:;"  @click="setSpamType(true,true)">设置邮件地址白名单</a> -->
                    <router-link to="/spamType/address/white">设置邮件地址白名单</router-link>
                </dt>
                <dd>（来自邮件地址白名单中联系人的邮件，仅受用户自定义规则影响，确保你能收到他的邮件。）</dd>
            </dl>
            <dl class="mt-30">
                <dt>
                    <!-- <a href="javascript:;" @click="setSpamType(false,true)">设置域名白名单</a> -->
                    <router-link to="/spamType/domain/white">设置域名白名单</router-link>
                </dt>
                <dd>（例：在域名白名单中设置“troila.com”，来自该站点的邮件仅受用户自定义规则影响，确保你收到“@troila.com”发来的所有邮件。）</dd>
            </dl>
        </div>

        <p class="admin_tit mt-40">反垃圾选项</p>
        <div class="admin_whiteList">
            <ul>
                <li>垃圾邮件处理：</li>
                <li>
                    <span><label class="mr-10"><input type="radio" name="yjcl" value="moveToRubby" v-model="spamOperation"/></label>接收（临时存放在垃圾邮件中）</span>
                    <span class="mt-30"><label class="mr-10"><input type="radio" name="yjcl" value="deleteMail" v-model="spamOperation"/></label>拒收（直接删除）</span>
                </li>
            </ul>
        </div>
        <div class="mt-20 clearfix">
            <a href="javascript:;" class="admin_btn_border w-80 fr">取消</a>
            <a href="javascript:;" class="admin_btn_solid w-80 mr-20 fr" @click="saveRuleAction">保存更改</a>
        </div>
    </div>
    <!-- <SpamType v-else :isAddress="isAddress" :isWhite="isWhite"></SpamType> -->
</template>
<script>
// import "../../assets/js/jquery-1.11.3.min.js"; 
export default {
  name:'Spam',
  components : {
      
  },
  data : function(){
      return {
          rules : null,
          spamOperation:"moveToRubby"
      }
  },
  methods : {
    //反垃圾选项保存更改
    saveRuleAction : function(){
        var __this = this;
        // let spamProcessingValue = $("input[type=radio]:checked").val();
        // console.log(spamProcessingValue);
        if(this.rules != null && this.rules.action){ 
            //如果已经有反垃圾规则，对比垃圾邮件处理方式是否需要修改，如果需要，则直接进行更新修改
            console.log(this.rules.action.methods[0].methodName)       
            if(this.rules.action.methods[0].methodName === __this.spamOperation){
                console.log("保存更改成功");
                return;
            }else{
                this.rules.action.methods[0].methodName = __this.spamOperation;
                this.$axios.put(process.env.API_SERVER+"/api/enterprise/rule",this.rules)
                .then(res=>{
                    console.log(res);
                    console.log("保存更改成功");
                });
            }   
        }else{
            this.generateDefaultSpamRule(__this.spamOperation);
        }

    },
    //获取反垃圾规则
    getSpamRule : function(){
        let _this = this;
        this.$axios.get(process.env.API_SERVER+"/api/enterprise/rule/list")
        .then((res)=>{
            if(res != null && res.length != 0){
                _this.rules = res[0];      //此处返回的是一个list，因为默认每个企业只能有一条反垃圾规则，所以只取第一条就好了
                console.log(res);
                this.spamOperation = this.rules.action.methods[0].methodName;
            }else{
                _this.generateDefaultSpamRule("moveToRubby");  //默认垃圾邮件处理方式为：接收(临时存放在垃圾邮件中)
            }
        })
    },
    //生成一条默认的反垃圾规则
    generateDefaultSpamRule : function(spamProcessingValue){
        //如果没有反垃圾规则，需要为该企业先创建一条反垃圾规则
        var entities = [];
        var entity;
        var method;
        var data = {
            "addrWhiteList": [],
            "domainWhiteList": [],
            "addrBlackList": [],
            "domainBlackList": []
        }
        entity = {
            field: "",
            condition: "inner",
            value: "isMustBeRubby==\"yes\" || ${addrWhiteList} not contains email && ${domainWhiteList} not contains domain && (${addrBlackList} contains email || ${domainBlackList} contains domain)",
            data: data
        };
        method = {
            methodName: spamProcessingValue             //此处直接设成选定值垃圾邮件处理的选定值moveToRubby/deleteMail
        };
        entities.push(entity);
        var methods = [];
        methods.push(method);
        var action = {
            methods: methods
        };
        var rule = {
            type: "Spam",
            enable: true,
            entities: entities,
            action: action
        };           
        //如果没有规则，要先创建一条规则
        let _this = this;
        this.$axios.post(process.env.API_SERVER+"/api/enterprise/rule",rule)
        .then(res=>{
            console.log(res);
            console.log("创建默认的反垃圾规则成功");
            _this.rules = res;
            this.spamOperation = this.rules.action.methods[0].methodName;
        })
    }
  },
  mounted : function(){    
    //单选框
    $("input[type='radio']").iCheck({radioClass: 'iradio_square-blue'});
  },
  created : function(){
      this.getSpamRule();
    //  this.spamOperation = this.rules.action.methods[0].methodName;
    //  $("input[type=radio]:checked").val(this.rules[0].action.methods[0].methodName);
  },
  updated : function(){
      
  }
}
</script>
<style scoped>
@import '../../assets/css/admin_zy.css';
</style>
