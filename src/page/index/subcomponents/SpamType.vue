<template>
  <!-- 设置邮件地址白名单/设置邮件地址黑名单/设置域名白名单/设置域名黑名单 -->
    <!--右侧内容start-->
    <div>
        <p class="admin_tit">设置{{type1}}{{type2}}<a href="javascript:;" class="back fr" @click="backToSpam">返回</a> </p>
        <div class="admin_bigWhite mt-20">
            <ul class="input_list clearfix">
                <li><input type="text" class="admin_input w-300" v-model="addSpamContent"/></li>
                <li><a href="javascript:;" class="admin_btn_border w-110" @click="addSpamRule">添加到{{type2}}</a></li>
            </ul>
            <div class="mt-20 pl-30">
                <a href="javascript:;" class="admin_btn_border w-80" @click="mutliDelete">删除</a>
                <a href="javascript:;" class="admin_btn_border w-80 ml-15" @click="clearCheckbox">清空</a>
            </div>
            <div class="table_box">
                <table>
                    <thead>
                        <tr>
                            <th width="5%"><input type="checkbox" name="checkall" class="checkAll"/></th>
                            <th width="50%">{{type1}}</th>
                            <th width="45%">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tempSpam,index) in operatorPage" :key="index">
                            <td><input type="checkbox" name="" :index="index"/></td>
                            <td>{{tempSpam}}</td>
                            <td><a href="javascript:;" @click="deleteSpamRule(tempSpam)">删除</a></td>
                        </tr>
                        <!-- <tr>
                            <td><input type="checkbox" name=""/></td>
                            <td>liuliu@troila.com</td>
                            <td><a href="javascript:;">删除</a></td>
                        </tr>-->                      
                    </tbody>
                </table>
            </div>
            <div class="page_box">
                <div class="pagination">
                </div>
            </div>
        </div>
    </div>
    <!--右侧内容end-->  
</template>
<script>
import "../../../assets/js/iCheck.js";
// import "../../../assets/js/jquery-1.11.3.min.js";  
import "../../../assets/js/jquery.pagination.js";
export default {
  name : "SpamType",
  data : function(){
      return { 
          isAddress :  true,
          isWhite : false,
          type1 : '',
          type2 : '',
          currentSpamType : '',   //记录当前该页面的反垃圾规则类型
          SPAM_EMAIL_WHITE : 'SPAM_EMAIL_WHITE',  //邮件地址白名单
          SPAM_DOMAIN_WHITE : 'SPAM_DOMAIN_WHITE',//域名白名单
          SPAM_EMAIL_BLACK : 'SPAM_EMAIL_BLACK',  //邮件地址黑名单
          SPAM_DOMAIN_BLACK : 'SPAM_DOMAIN_BLACK', //域名黑名单
          addSpamContent : "" ,   //添加反垃圾规则input输入框绑定内容
          rules: [],
          entities:[],
          deleteTemp:[],         //需要进行删除操作的数据数组
          operator:[],           //当前操作的规则数据数组，根据当前页面的类型，是tempWhiteAddr/tempWhiteDomain/tempBlackAddr/tempBlackDomain中的一个
          operatorPage:[],
          tempWhiteAddr:[],
          tempWhiteDomain:[],
          tempBlackAddr:[],
          tempBlackDomain:[],
          currentPage : 0,
          pageSize : 10
      }
  },
  created : function(){
        this.getParams();
        this.getSpamRuleList();
  },
  computed : {
      
  },
  methods : {
    //用于检测路由变化
    getParams : function() {
        console.log("监视到路由参数有变化……isAddress:"+this.$route.params.isAddress+",isWhite:"+this.$route.params.isWhite)
        // 取到路由带过来的参数 
        let routerParams = this.$route.params;
        if( typeof(routerParams) == "undefined" || typeof(routerParams.isAddress) =="undefined" || typeof(routerParams.isWhite)=="undefined"){
            return;
        }
        // 将数据放在当前组件的数据内
        this.isAddress = this.$route.params.isAddress=="address"?true:false;
        this.isWhite = this.$route.params.isWhite=="white"?true:false;
        this.type1 = this.isAddress ? '邮件地址':'域名',
        this.type2 = this.isWhite ? '白名单':'黑名单'
        console.log("路由参数变化后SpamType的数据情况："+this.type1+this.type2)
        this.getCurrentSpamType();
        console.log("当前反垃圾邮件类型为："+this.currentSpamType);
        //重新刷新反垃圾规则列表信息
        this.getSpamRuleList();
    },
    //根据变化情况，更新当前页面的反垃圾规则类型
    getCurrentSpamType : function(){
        if(this.isWhite){
            if(this.isAddress){
                this.currentSpamType = this.SPAM_EMAIL_WHITE;
            }else{
                this.currentSpamType = this.SPAM_DOMAIN_WHITE;
            }
        }else{
            if(this.isAddress){
                this.currentSpamType = this.SPAM_EMAIL_BLACK;
            }else{
                this.currentSpamType = this.SPAM_DOMAIN_BLACK;
            }
        }
    },
    //点返回键返回反垃圾主页
    backToSpam : function(){
        console.log("触发回到反垃圾主页面方法backToSpamMain");
        this.$router.push("/spam");
    },
    //获取规则列表
    getSpamRuleList : function(){
        let _this = this;
        this.$axios.get(process.env.API_SERVER+"/api/enterprise/rule/list")
        .then((res)=>{
            if(res != null && res.length != 0){
                _this.rules = res;
                console.log("获取企业垃圾规则列表成功:"+res[0]);
                _this.tempWhiteAddr = res[0].entities[0].data.addrWhiteList;
                _this.tempWhiteDomain = res[0].entities[0].data.domainWhiteList;
                _this.tempBlackAddr = res[0].entities[0].data.addrBlackList;
                _this.tempBlackDomain = res[0].entities[0].data.domainBlackList;
                if(_this.currentSpamType == _this.SPAM_EMAIL_WHITE){
                    _this.operator = _this.tempWhiteAddr;
                }else if(_this.currentSpamType == _this.SPAM_DOMAIN_WHITE){
                    _this.operator = _this.tempWhiteDomain;
                }else if(_this.currentSpamType == _this.SPAM_EMAIL_BLACK){
                    _this.operator = _this.tempBlackAddr;
                }else{
                    _this.operator = _this.tempBlackDomain;
                }
                // _this.operatorPage = _this.operator;
            }
            //进行分页显示
            _this.getSpamDataByPage(_this.currentPage);
        })
    },
    //向已有规则中添加规则数据,每个企业，每个个人对应一条规则，以后都是向该规则中添加具体的数据
    addSpamRuleData : function(){
        let _this = this;
        let address = new Array();
        address.push(this.addSpamContent);               
        this.$axios.post(process.env.API_SERVER+"/api/enterprise/rule/spam?type="+_this.currentSpamType+"&address="+address)
            .then(res=>{
            console.log("添加反垃圾规则数据成功："+res);
            // _this.operator.push(_this.addSpamContent);
            _this.getSpamRuleList();
            _this.addSpamContent = '';
        }); 
    },
    //如果没有规则时，要先创建一条规则
    addSpamRule : function(){
        if(this.rules.length ==0){
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
                methodName: "moveToRubby"
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
            let _this = this;
        
            //如果没有规则，要先创建一条规则
            this.$axios.post(process.env.API_SERVER+"/api/enterprise/rule",rule)
            .then(res=>{
                console.log(res);
                _this.addSpamRuleData();
            })
        }else{
            //如果已经有规则，则直接向规则中添加数据即可
            this.addSpamRuleData();
        }  
    },
    //进行分页数据切割，截取当前页需要显示的数组内容
    getSpamDataByPage : function(currentPage){
        if(this.pageSize <= 0 || this.operator.length == 0){
            this.operatorPage = this.operator;
            return this.operatorPage;
        }
        let startIndex = (this.currentPage)*this.pageSize;
        let endIndex = (this.currentPage+1)*this.pageSize;
        this.operatorPage = this.operator.slice(startIndex,endIndex);
        console.log("operatorPage:"+this.operatorPage);
        console.log("operator:"+this.operator);
        return this.operatorPage;        
    },
    deleteSpamRule : function(tempSpam){
        console.log("当前正在进行删除规则方法,要删除的内容为:"+tempSpam);
        let tempArray = new Array();
        tempArray.push(tempSpam);
        this.setUpdatedOperatorArray(tempArray);
        this.updateSpamRuleData();
    },
    setUpdatedOperatorArray : function(spamToDeleteArray){
        if(spamToDeleteArray.length == 0){
            return;
        }
        for(var j=0; j< spamToDeleteArray.length; j++){
            for(var i=0;i<this.operator.length;i++){
                if(this.operator[i]===spamToDeleteArray[j]){
                    this.operator.splice(i,1);   //将待删除的数据该项数据先在操作数组中删除
                    break;
                }
            }
        }
        console.log(this.rules[0].entities[0].data);
        //将操作数组更新到对应的规则数据数组中,因为数组赋值是引用的相同的地址，
        //所以将operator中的对应元素去掉，那么对应的rules中的项以及以下4个临时数组对应的项就都跟着变化了
        // if(this.currentSpamType == this.SPAM_EMAIL_WHITE){
        //     this.tempWhiteAddr = this.operator ;
        // }else if(this.currentSpamType == this.SPAM_DOMAIN_WHITE){
        //     this.tempWhiteDomain = this.operator;
        // }else if(this.currentSpamType == this.SPAM_EMAIL_BLACK){
        //     this.tempBlackAddr = this.operator;
        // }else{
        //     this.tempBlackDomain = this.operator;
        // }
    },
    /**更新规则数据，删除和修改的统一接口 */
    updateSpamRuleData : function(){    
        let _this = this;   
        //如果没有规则，要先创建一条规则
        console.log(this.rules)
        //此处有些投机取巧了，因为operator数组的具体规则项变化了，那么rules中对应的内容也跟着变化了，所以更新时，直接传回后台就完成了删除操作
        this.$axios.put(process.env.API_SERVER+"/api/enterprise/rule",this.rules[0])
        .then(res=>{
            console.log(res);
            _this.getSpamRuleList();
            _this.clearCheckbox();
            _this.deleteTemp = [];
        });
    },
    clearCheckbox : function(){
        $(".table_box table input[type=checkbox]").iCheck('uncheck');
    },
    //一次删除多个规则项数据
    mutliDelete : function(){
        //获取要删除的所有规则项内容
        console.log(this.deleteTemp);
        console.log("已经获取到需要删除的所有内容数据")
        this.setUpdatedOperatorArray(this.deleteTemp);
        this.updateSpamRuleData();
    }
  },
  //监视路由的变化
  watch : {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  },
  computed : {

  },
  updated : function(){
    let _this = this;
    //复选框
    $("input[type='checkbox']").iCheck({

        checkboxClass: 'icheckbox_blue'
    });
    //分页
    $(".pagination").pagination(_this.operator.length,{
        items_per_page:_this.pageSize,
        num_display_entries:4,
        current_page:_this.currentPage,
        num_edge_entries:1,
        callback:function(index){
            _this.currentPage = index;
            _this.getSpamDataByPage(_this.currentPage);
        }
    });

    //全选、取消全选功能
    $(".checkAll").on("ifClicked",function(){
        if(!$(this).prop("checked")){
            $(this).prop("checked",true);
            $(".table_box tbody input").iCheck('check');
            console.log(1)
        }
        else{
            $(this).prop("checked",false);
            $(".table_box tbody input").iCheck('uncheck');
            console.log(2)
        }
    });

    $(".table_box tbody input").on("ifClicked",function(){
        var length=$(".table_box tbody input").length;
        var checknum=$(".table_box tbody input:checked").length+1;
        if(!$(this).prop("checked")){
            $(this).prop("checked",true);
            if(length==checknum){
                $(".checkAll").iCheck("check");
            }
        }
        else{
            $(this).prop("checked",false);
            $(".checkAll").iCheck("uncheck");
        }
        //对于选中的要删除的项进行保存
        _this.deleteTemp.push(_this.operatorPage[parseInt($(this).attr("index"))]);
    });
  },
  activated : function(){

  },
  mounted : function(){
    
  }
}
</script>
<style scoped>
@import '../../../assets/css/select.css';
@import '../../../assets/css/common.css';
@import '../../../assets/css/public.css';
@import '../../../assets/css/admin_zy.css';
@import '../../../assets/css/pagination.css';
</style>
