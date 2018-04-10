<template>
  <div class="adTPop_w hide">
        <ul>
            <li>
                <span><i class="redT_w">*</i>姓名</span>
                <input class="input_w" type="text" v-model="newMember.userName" v-validate="'required|alpha'" name="name"/>
                <p v-show="errors.has('name')" class="error_w l83 tf17_w">用户名不能为空</p>
            </li>
            <li>
                <span><i class="redT_w">*</i>邮箱账号</span>
                <input class="input_w" type="text" v-model="newMember.userEmail" v-validate="'required|alpha_num'" name="account"/>&nbsp;&nbsp;@{{domain}}
                <p v-show="errors.has('account')" class="error_w l83 tf17_w">邮箱账号格式应由英文和数字组成</p>
            </li>
            <li>
                <span><i class="redT_w">*</i>手机号</span>
                <input class="input_w" type="text" v-model="newMember.userPhone" v-validate="{ required: true, regex: /^[1][3,4,5,7,8][0-9]{9}$/}" name="telephone"/>
                <p v-show="errors.has('telephone')" class="error_w l83 tf17_w">手机号格式不正确，请重新输入</p>
            </li>
            <li>
                <span><i class="redT_w">*</i>部门</span>
                <!-- <div class="selectBox_w w-300">
                    <select name="">
                        <option value="">软件事业部</option>
                        <option value="">软件事业部</option>
                        <option value="">软件事业部</option>
                        <option value="">软件事业部</option>
                        <option value="">软件事业部</option>
                    </select>
                </div> -->
                <!-- 0180323新加代码 - 部门 -->
                <div class="menuContentBox">
                    <input class="input_w" id="objSel" type="text" readonly value=""/>
                    <a id="menuBtn" class="menuBtn" href="javascript:;" ></a>
                    <div id="menuContent" class="menuContent">
                        <ul id="treeBox" class="ztree"></ul>
                    </div>
                </div>
                 <!-- 0180323新加代码 - 部门 over -->
            </li>
            <li>
                <span><i class="redT_w">*</i>容量</span>
                <div class="selectBox_w w-300">
                    <select name="">
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                        <option value="">500G</option>
                    </select>
                </div>
            </li>
            <li class="mb0">
                <span><i class="redT_w">*</i>密码</span>
                <input class="input_w" type="text" v-model="newMember.userPassword"/>
            </li>

        </ul>
    </div>
</template>

<script>
import "../../../assets/js/iCheck";
import "../../../assets/js/jquery-1.11.3.min.js";
import "../../../assets/js/zTree_v3/js/jquery.ztree.core";
export default {
  name: "AddMember",
  data: function() {
    return {
      newMember: {
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        userRealName: ""
      },
      domain: sessionStorage.getItem("domainName")
    };
  },
  methods: {
    createNewMember(member) {
      this.$axios
        .post(process.env.API_SERVER + "/api/account/alloc", member)
        .then(res => {
          console.log(res);
        });
    },
    refreshData() {
      this.newMember = {
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        userRealName: ""
      };
    }
  },
  mounted: function() {
    var __this = this;
    this.bus.$on("reload", function() {
      __this.$validator.errors.clear();
    });
    this.bus.$on("addMember", function() {
      __this.createNewMember(__this.newMember);
    });
    this.bus.$on("cleardata", function() {
      __this.refreshData();
    });
    $("select").selectOrDie();
    //初始化zNodes
    var setting = {
      view: {
        dblClickExpand: false,
        showIcon: false, //是否显示图标
        selectedMulti: false //设置是否允许同时选中多个节点
      },
      data: {
        simpleData: {
          enable: true
        },
        key: {
          childen: "subDepts"
        }
      },
      callback: {
        onClick: onClick
      }
    };

    var treeObj = $.fn.zTree.init($("#treeBox"), setting, __this.$store.getters.rootdept);
    treeObj.expandAll(true);
        onClick()
        $("#menuBtn").click(function () {
            var objSel = $("#objSel");
            $("#menuContent").show();
            $("body").bind("mousedown", onBodyDown);
        })
    function onClick(e, treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("treeBox"),
            nodes = zTree.getSelectedNodes(),
            v = "";
            nodes.sort(function compare(a,b){return a.id-b.id;});
            for (var i=0, l=nodes.length; i<l; i++) {
                v += nodes[i].name + ",";
            }
            if (v.length > 0 ) v = v.substring(0, v.length-1);
            var objSel = $("#objSel");
            objSel.attr("value", v);
        }
        function hideMenu() {
            $("#menuContent").fadeOut("fast");
            $("body").unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event) {
            if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
                hideMenu();
            }
        }
        
  }
};
</script>

<style scoped>
@import '../../../assets/js/zTree_v3/css/zTreeStyle/zTreeStyle.css';
</style>

