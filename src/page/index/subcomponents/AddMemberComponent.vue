<template>
  <div class="adTPop_w hide">
        <ul>
            <li>
                <span><i class="redT_w">*</i>姓名</span>
                <input class="input_w" type="text" v-model="$store.state.tempMember.userName" v-validate="{required:true,min:1}" name="name"/>
                <p v-show="errors.has('name')" class="error_w l83 tf17_w">用户名不能为空</p>
            </li>
            <li>
                <span><i class="redT_w">*</i>邮箱账号</span>
                <input class="input_w" type="text" v-model="$store.state.memberEmail" v-validate="'required|alpha_num'" name="account" :readonly="onlyRead"/>&nbsp;&nbsp;@{{domain}}
                <p v-show="errors.has('account')" class="error_w l83 tf17_w">邮箱账号格式应由英文和数字组成</p>
            </li>
            <li>
                <span><i class="redT_w">*</i>手机号</span>
                <input class="input_w" type="text" v-model="$store.state.tempMember.userPhone" v-validate="{ required: true, regex: /^[1][3,4,5,7,8][0-9]{9}$/}" name="telephone"/>
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
                <div class="menuContentBox" :hideattr="rootdept.id">
                    <input class="input_w" id="objSel" type="text" readonly value="" v-model="$store.state.currentDeptName"/>
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
                    <select name="" id="storageCapacity">
                        <option value=1024>1G</option>
                        <option value=2048>2G</option>
                        <option value=3072>3G</option>
                        <option value=4096>4G</option>
                        <option value=5120>5G</option>
                    </select>
                </div>
            </li>
            <li class="mb0">
                <span><i class="redT_w">*</i>密码</span>
                <input class="input_w" type="text" v-model="$store.state.tempMember.userPassword" v-validate="{required:true,alpha_dash:true,min:6,max:20}" name="password" :placeholder="!$store.state.memberUpdate?'':'******'"/>
                <p v-show="errors.has('password')" class="error_w l83 tf17_w">密码应由字母、数字及下划线组成的6-20位字符</p>
            </li>

        </ul>
    </div>
</template>

<script>
import "../../../assets/js/iCheck";
// import "../../../assets/js/jquery-1.11.3.min.js";
import "../../../assets/js/zTree_v3/js/jquery.ztree.core";
import "../../../assets/js/zTree_v3/css/zTreeStyle/zTreeStyle.css";
export default {
  name: "AddMember",
  data: function() {
    return {
      userName: "123",
      newMember: this.$store.getters.tempMember,
      memail : this.$store.state.memberEmail,
      domain: sessionStorage.getItem("domainName"),
      rootdept: this.$store.getters.getItemWithSessionStorage("rootdept")
    };
  },
  methods: {
    changeData() {
      this.userName = this.$store.getters.tempMember.name;
    },
    //添加新用户
    createNewMember(member, args) {
      var __this = this;
      __this.$validator.validateAll().then(result => {
        if (result) {
          __this.$axios
            .post(process.env.API_SERVER + "/api/account/alloc", {
              userName: __this.$store.state.tempMember.userName,
              userEmail: __this.$store.state.memberEmail + "@" + __this.domain,
              userPhone: __this.$store.state.tempMember.userPhone,
              userPassword: __this.$store.state.tempMember.userPassword,
              userRealName: __this.$store.state.tempMember.userName,
              departmentId: __this.$store.state.tempMember.departmentId,
              storageCapacity: $("#storageCapacity").val()
            })
            .then(res => {
               $(".adTPop_w").hide();
              args.layer.close(args.index);
              __this.refreshData();
              __this.bus.$emit("searchMember", 0);
              layer.msg("添加成功", {
                skin: "Smsg_w",
                icon: 1,
                offset: "60px",
                time: 2000
              });
            });
          return;
        }
        // alert("请确认填写的信息");
      });
    },
    //更新用户信息
    updateMember(member,args) {
      var __this = this;
        if (!__this.$validator.errors.any()) {
      member.userRealName = member.userName;
      member.storageCapacity = $("#storageCapacity").val();
      member.userEmail = __this.$store.state.memberEmail + "@" + __this.domain;
          __this.$axios
            .put(process.env.API_SERVER + "/api/account/updateMember", member)
            .then(res => {
              $(".adTPop_w").hide();
              args.layer.close(args.index);
              __this.bus.$emit("searchMember", -1);//-1返回当前页面
              if (__this.DEBUG) {
                console.log(res);
              }
              layer.msg("修改成功", {
                skin: "Smsg_w",
                icon: 1,
                offset: "60px",
                time: 2000
              });
              __this.refreshData();
            });
            return;
        }
    },
    //清空用户信息
    refreshData() {
      this.$validator.errors.clear();
      this.$store.state.memberEmail = "";
      this.$store.state.tempMember = {
        userName: "",
        userEmail: "",
        userPhone: "",
        userPassword: "",
        userRealName: "",
        departmentId: "",
      };
      this.$store.state.memberEmail="";
    }
  },
  mounted: function() {
    var __this = this;
    this.$axios({method: "get",url: process.env.API_SERVER + "/api/enterprise/settings"}).then(res=>{
          $("#storageCapacity").val(res.defaultStorageCapacity);
          $("#storageCapacity").selectOrDie("update");
      });
    this.bus.$on("reload", function() {
      __this.$validator.errors.clear();
    });
    this.bus.$on("addMember", function(args) {
      __this.$store.state.tempMember.deptName = __this.$store.state.searchDept.name;
      __this.createNewMember(__this.newMember, args);
    });
    this.bus.$on("cleardata", function() {
      __this.refreshData();
    });
    this.bus.$on("updateMember", function(args) {
      __this.updateMember(__this.$store.state.tempMember,args);
    });
    this.bus.$on("updateSelect", function(data) {
      $("#storageCapacity").val(data);
      $("#storageCapacity").selectOrDie("update");
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
        key: {
          children: "subDepts"
        }
      },
      callback: {
        onClick: onClick
      }
    };
    function onClick(e, treeId, treeNode) {
      var zTree = $.fn.zTree.getZTreeObj("treeBox"),
        nodes = zTree.getSelectedNodes(),
        v = "";
      nodes.sort(function compare(a, b) {
        return a.id - b.id;
      });
      for (var i = 0, l = nodes.length; i < l; i++) {
        v += nodes[i].name + ",";
      }
      if (v.length > 0) v = v.substring(0, v.length - 1);
      var objSel = $("#objSel");
      objSel.attr("value", v);
      if (nodes[0]) {
        __this.$store.getters.tempMember.departmentId = nodes[0].id;
        __this.$store.state.tempMember.deptName = v;
        __this.$store.state.currentDeptName = v;
      }
    }
    function hideMenu() {
      $("#menuContent").fadeOut("fast");
      $("body").unbind("mousedown", onBodyDown);
    }
    function onBodyDown(event) {
      if (
        !(
          event.target.id == "menuBtn" ||
          event.target.id == "menuContent" ||
          $(event.target).parents("#menuContent").length > 0
        )
      ) {
        hideMenu();
      }
    }
    __this.$axios
      .get(process.env.API_SERVER + "/api/dept/allDeptTree")
      .then(res => {
        if (__this.DEBUG) {
          console.log(res);
        }
        var treeObj = $.fn.zTree.init($("#treeBox"), setting, res);
        treeObj.expandAll(true);
        onClick();
        $("#menuBtn").click(function() {
          var objSel = $("#objSel");
          $("#menuContent").show();
          $("body").bind("mousedown", onBodyDown);
        });
      });
  },
  updated: function() {},
  computed:{
    onlyRead(){
      if(this.$store.getters.memberUpdate){
        return true;
      }else{
        return false;
      }
    }
  }
};
</script>

<style scoped>
/* @import "../../../assets/js/zTree_v3/css/zTreeStyle/zTreeStyle.css"; */
.ztree li a.curSelectedNode {
  background-color: #e3f2ff;
  border: 1px #279afc solid;
}
.sod_select.above .sod_list {
  bottom: inherit;
}
</style>

