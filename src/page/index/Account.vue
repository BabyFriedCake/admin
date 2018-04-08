<template>
  <div>
    <p class="admin_tit">账户信息</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="w100_w verAB_w">
                <span>头像</span>
                <img src="../../assets/images/headIMW.png" alt=""/>
                <label class="upLoadT_w"><input type="file" class="file_w"/>上传</label>
            </li>
            <li><span>企业名称</span>
                <input class="input_w unInput_w" type="text"  value="" readonly="readonly" v-model="$store.state.user.contact"/>
            </li>
            <li><span>邮箱域名</span><input class="input_w unInput_w" type="text" value="" readonly="readonly" /></li>
            <li class="mb0_w"><span>手机号</span><input class="input_w unInput_w" type="text" value="" readonly="readonly"/> <a class="modify_w" href="javascript:;" @click="changeMobile">修改</a></li>
            <div class="c-both"></div>
        </ul>
    </div>

    <p class="admin_tit mt-40">使用情况</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="po-re"><span>总容量</span><div class="proBox_w"><p class="proNum_w"></p></div><i class="numBox_w"><b class="usNum_w">150G</b>/<b class="allNum_w">500G</b></i></li>
            <li><span>成员默认容量</span>
                <div class="selectBox_w w150">
                    <select name="" id="">
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                    </select>
                </div>
            </li>
            <li class="po-re mb0_w w100_w"><span>成员数量</span><div class="proBox_w"><p class="proNum_w"></p></div><i class="numBox_w"><b class="usNum_w">10</b>/50</i></li>
            <div class="c-both"></div>
        </ul>
    </div>

    <p class="admin_tit mt-40">企业出口IP设置</p>
    <div class="admin_whiteList">
        <ul class="moduleB_w">
            <li class="w100_w mb0_w"><span>出口IP</span><input class="input_w" type="text"  value="XXX;XXX" /><i class="noteT_w">（IP之间以；隔开）</i></li>
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
        <a href="javascript:;" class="admin_btn_solid w-80 mr-20 fr" @click="save">保存更改</a>
    </div>
    <!--解绑原始手机号 弹窗 start-->
    <div class="pop1_w hide">
        <ul class="telB_w">
            <li class="on mr45">解绑原始手机号</li>
            <li>设置新手机号</li>
            <div class="clear"></div>
        </ul>
        <ul class="telNumB_w">
            <li class="mb-20"><span>原始手机号</span><input class="input_w" type="text" value="15911111111"/></li>
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
                <span>新手机号</span><input class="input_w" type="text" value="15911111111"/>
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
import axios from "../../utils/ajax.js";
export default {
  name: "Account",
  data() {
    return {
      enterpriseName: "",
      mobile: "",
      eMail: ""
    };
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
              mask.appendTo(layero.parent());
            }
          });

          layer.close(index1);
        },
        btn2: function() {
          //点击取消
        },
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          mask.appendTo(layero.parent());
        }
      });
    },
    save() {
      var param = {
        enterpriseName: this.enterpriseName,
        mobile: this.mobile,
        eMail: this.eMail
      };
      axios
        .post(process.env.API_SERVER + "/api/enterprise", param)
        .then(res => {
          console.log(res);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    
  },
  mounted() {
    $("select").selectOrDie();
    // axios.get(process.env.API_SERVER + "/api/contact/personal", {
    //     params: {
    //     ID: stroe.state.user.id
    //     }
    // }).then(res => {
    //     console.log(res);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    console.log(this.$store.state.user);
  }
};
</script>
<style scoped>
@import "../../assets/css/wy_manage.css";
@import "../../assets/css/public.css";
</style>
