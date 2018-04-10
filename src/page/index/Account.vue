<template>
  <div>
    <p class="admin_tit">账户信息</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="w100_w verAB_w">
                <span>头像</span>
                <img :src="headImg" alt=""/>
                <label class="upLoadT_w"><input type="file" class="file_w"/>上传</label>
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
                <input class="input_w unInput_w" type="text" value="" readonly="readonly" v-model="$store.state.user.contact"/> 
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
              <i class="numBox_w"><b class="usNum_w">{{sumAccountCap|division|division|division}}G</b>/<b class="allNum_w">{{settings.maxStorageCapacity|division}}G</b></i></li>
            <li><span>成员默认容量</span>
                <div class="selectBox_w w150">
                    <select name="" id="">
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
            <li><div class="fileBox_w"><input class="fileBtn_w" type="file"/><a class="btnFile_w" href="javascript:;">浏览</a></div><span class="fileN_w">未选择文件</span></li>
            <li><input class="input_w" type="text" placeholder="员工姓名，由员工自行填写"/></li>
            <li><input class="input_w" type="text" placeholder="职位，由员工自行填写"/></li>
            <li><input class="input_w" type="text" placeholder="联系电话，由员工自行填写"/></li>
            <li><input class="input_w" type="text" placeholder="传真，由员工自行填写"/></li>
            <li class="clearfix mt-20"><input class="input_w fr" type="text" placeholder="企业英文名称，不填时自动隐藏该项"/></li>
            <li class="mb0_w clearfix"><input class="input_w fr" type="text" placeholder="企业名称，不填时自动隐藏该项"/></li>
        </ul>
    </div>
    <div class="mt-20 clearfix">
        <a href="javascript:;" class="admin_btn_border w-80 fr">取消</a>
        <a href="javascript:;" class="admin_btn_solid w-80 mr-20 fr">保存更改</a>
    </div>
    <!--解绑原始手机号 弹窗 start-->
    <div class="pop1_w hide">
        <ul class="telB_w">
            <li class="on mr45">解绑原始手机号</li>
            <li>设置新手机号</li>
            <div class="clear"></div>
        </ul>
        <ul class="telNumB_w">
            <li class="mb-20"><span>原始手机号</span><input class="input_w" type="text"  v-model="$store.state.user.contact"/></li>
            <li>
                <span>手机验证码</span><input class="input_w w180 mr-10" type="text" /><a class="btnBorder_w" href="javascript:;">获取手机验证码</a>
                <p class="error_w">手机验证码错误，请重新获取</p>
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
                <span>新手机号</span><input class="input_w" type="text" value="" />
                <p class="error_w">手机号格式不正确，请重新输入</p>
            </li>
            <li>
                <span>手机验证码</span><input class="input_w w180 mr-10" type="text" /><a class="btnBorder_w" href="javascript:;">获取手机验证码</a>
                <p class="error_w">手机验证码错误，请重新获取</p>
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
      enterprise: {},
      settings: {},
      accountNum: "",
      sumAccountCap: ""
    };
  },
  filters: {
    division: function(value) {
      if (!value) return "";
      value = Math.round(value / 1024);
      return value;
    }
  },
  computed: {
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
    headImg() {
      var ImgUrl = process.env.API_SERVER + this.$store.state.user.headImg;
      // 默认头像
      var DefaultImg = require("../../assets/images/userImgLMW.png");
      if (ImgUrl == "") {
        return DefaultImg;
      } else {
        return ImgUrl;
      }
    }
  },
  methods: {
    changeMobile() {
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
            }
          });

          layer.close(index1);
        },
        btn2: function() {
          //点击取消
        },
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          layero.appendTo(layero.parents(".admin_wrapper_zy"));
          mask.appendTo(layero.parents(".admin_wrapper_zy"));
        }
      });
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
        // console.log(res)
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
              __this.accountNum = accountNum;
              __this.sumAccountCap = sumAccountCap;
              sessionStorage.setItem("domainName",__this.settings.domainName);
              console.log(sessionStorage)
              // console.log(__this.settings.enterpriseId)
              // console.log(__this.accountNum)
            })
          );
        // .catch(__this.$axios.spread(function(err1,err2,err3) {
        //   // err1 = layer.msg('获取企业配置信息失败',{icon:1,time:3000,skin:'Smsg_w'});
        //   // err2 = layer.msg('获取成员信息失败',{icon:1,time:3000,skin:'Smsg_w'});
        //   // err3 = layer.msg('获取成员信息失败',{icon:1,time:3000,skin:'Smsg_w'});
        // }))
      });
      // .catch(function(error) {
      //   console.log(error);
      // });
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
      console.log(fileM)
      $(".file_w").on("change", function() {
        // console.log(fileM.files); 
        //获取文件对象，files是文件选取控件的属性，存储的是文件选取控件选取的文件对象，类型是一个数组
        var fileObj = fileM.files[0];
        //创建formdata对象，formData用来存储表单的数据，表单数据时以键值对形式存储的。
        console.log(fileObj);
        var formData=new FormData();
        formData.append('file',fileObj);

        __this.$axios({
          url: process.env.API_SERVER + "/api/file",
          method: "post",
          data: formData
        })
          .then(function(res) {
            console.log(res);

            // vue.account.headImg = '${apiServer}/api/file?fid='+data.id;
            // var account = {};
            // account.id = "${Session.user.id?c}";
            // account.userCode = "${Session.user.userCode!}";
            // account.name = "${Session.user.name!}";
            // account.contact = "${Session.user.contact!}";
            // account.departmentId = "${Session.user.departmentId!}";
            // account.mailAddress = "${Session.user.mailAddress!}";
            // account.password = "${Session.user.password!}";
            // account.status = "${Session.user.status?string('true','false')}";
            // account.headImg = '/api/file?fid='+data.id;
            // //更新账号头像
            // $.ajax({
            // type: 'put',
            // url: '${apiServer}/api/account/update',
            // contentType: 'application/json',
            // data:JSON.stringify(account),
            // success: function(returnData){
            // },
            // error: function(){
            //   //蓝色提示信息
            //       layer.msg('头像修改失败',{icon:1,time:3000,skin:'pansty'});
            // }
          })
          .catch(function() {
            alert("上传失败！");
          })
      })
    },
  },
  created() {},
  mounted() {
      $("select").selectOrDie();
      // console.log(this.$store.state.user);
      this.getEnterprise();
      this.getFile()
  }
}
</script>
<style scoped>
@import "../../assets/css/wy_manage.css";
@import "../../assets/css/public.css";
</style>
