<template>
          <div class="deptMR_w">
            <p class="tableBtnL_w">
                <a class="addBtnT_w " href="javascript:;" @click="addMember">添加成员</a>
                <a class="dBtnT_w" :class="{unCBtn_w:temp.length==0}" href="javascript:;" @click="delMember">删 除</a>
                <a class="fBtnT_w " :class="{unCBtn_w:temp.length==0}" href="javascript:;" @click="setPublicDelivery(true)">禁止外发</a>
                <a class="rfBtnT_w w110 " :class="{unCBtn_w:temp.length==0}" href="javascript:;" @click="setPublicDelivery(false)">解除外发限制</a>
                <a class="lBtnT_w w110 " :class="{unCBtn_w:temp.length==0}" href="javascript:;" @click="setLimitIp(true)">限制登录IP</a>
                <a class="rlBtnT_w w110 " :class="{unCBtn_w:temp.length==0}" href="javascript:;" @click="setLimitIp(false)">解除登录IP限制</a>
            </p>
            <div class="table_box pt30_w">
              <!-- <input type="text" v-model="testStr"/><input type="button" value="change" @click="changeStr"/> -->
                <table>
                    <thead>
                    <tr>
                        <th width="4%"><input type="checkbox" name="checkall" class="checkAll"/></th>
                        <th width="10%">姓名</th>
                        <th width="%">邮箱账号</th>
                        <th width="14%">部门</th>
                        <th width="13%">手机号</th>
                        <th width="10%">是否限制登录IP</th>
                        <th width="10%">是否限制外发</th>
                        <th width="12%">容量</th>
                        <th width="7%">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(member,index) in members" :key="index">
                        <td><input type="checkbox" name="" :index="index"/></td>
                        <td>{{member.name}}</td>
                        <td>{{member.mailAddress}}</td>
                        <td>{{member.deptName}}</td>
                        <td>{{member.contact}}</td>
                        <td>{{member.limitIpAddressEnabled?"是":"否"}}</td>
                        <td>{{member.publicDeliveryDisabled?"是":"否"}}</td>
                        <td>{{storage(member)}}</td>
                        <td><a class="mdf_w" href="javascript:;" @click="updateMember(member)">修改</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page_box pb0">
                <div class="pagination">
                </div>
            </div>
            <div hidden>
              <a>你看不见我</a>
              <AddMember></AddMember>
            </div> 
        </div>
</template>
<script>
import "../../../assets/js/iCheck";
// import "../../../assets/js/jquery-1.11.3.min.js";
import axios from "../../../utils/ajax.js";
import AddMember from "./AddMemberComponent";
export default {
  name: "MemberComponent",
  components: {
    AddMember
  },
  methods: {},
  data: function() {
    return {
      page: 0,
      pageSize: 10,
      members: [],
      data: {},
      temp: [],
      currentPage:0
    };
  },
  created: function() {},
  updated: function() {
    var __this = this;
    $("input[type='checkbox']").iCheck({
      checkboxClass: "icheckbox_blue"
    });
    $(".checkAll").on("ifClicked", function() {
      if (!$(this).prop("checked")) {
        $(this).prop("checked", true);
        $(".table_box tbody input").iCheck("check");
      } else {
        $(this).prop("checked", false);
        $(".table_box tbody input").iCheck("uncheck");
      }
    });
    $(".pagination").pagination(__this.data.totalElements, {
      items_per_page: __this.pageSize,
      num_display_entries: 4,
      current_page: __this.data.number,
      num_edge_entries: 1,
      callback: function(index) {
        __this.currentPage = index;
        __this.getItemsByPage(index);
      }
    });

    $(".table_box tbody input").on("ifChecked", function() {
      // console.log(__this.temp)
      __this.temp.push(__this.members[parseInt($(this).attr("index"))]);
      if(__this.temp.length == __this.members.length){
        $(".checkAll").iCheck("check");
      }
    });
    $(".table_box tbody input").on("ifUnchecked", function() {
      let member = __this.members[parseInt($(this).attr("index"))];
      for (let i = 0; i < __this.temp.length; i++) {
        if (member.id == __this.temp[i].id) {
          __this.temp.splice(i, 1);
          break;
        }
      }
      if(__this.temp.length == 0 || __this.temp.length < __this.members.length){
        $(".checkAll").iCheck("uncheck");
      }
    });
  },
  computed: {
  },
  mounted: function() {
    //查询指定部门下的员工
    var __this = this;
    this.bus.$on("searchAllMember",function(){
        __this.$store.state.searchDept = __this.$store.getters.getItemWithSessionStorage("rootdept");
        axios
          .get(
            process.env.API_SERVER +
              "/api/dept/members?page=" +
              __this.page +
              "&size=" +
              __this.pageSize +
              "&dept=" +
              __this.$store.state.searchDept.id
          )
          .then(res => {
            if(__this.DEBUG){
              console.log(res);
            }
            __this.members = res.content;
            __this.data = res;
          })
          .catch(error => console.log(error));
    });
    this.bus.$on("searchMember", function(page) {
      if(page==-1){
         page = __this.currentPage;
      }
      __this.getItemsByPage(page, __this.$store.state.searchDept.id);
    });
  },
  methods: {
    getItemsByPage: function(page, deptId) {
      $(".checkAll").iCheck("uncheck");
      $(".table_box tbody input").iCheck("uncheck");
      var __this = this;
      if (!deptId) {
        deptId = __this.$store.getters.getItemWithSessionStorage('rootdept').id;
      }
      axios
        .get(
          process.env.API_SERVER +
            "/api/dept/members?page=" +
            page +
            "&size=" +
            __this.pageSize +
            "&dept=" +
            deptId
        )
        .then(res => {
          if (__this.DEBUG) {
            console.log(res);
          }
          __this.members = res.content;
          __this.data = res;
        })
        .catch(error => console.log(error));
    },
    storage(member) {
      let max;
      let used;
      if (member.maxStorageCapacity < 1024) {
        max = parseInt(member.maxStorageCapacity) + "M";
      } else {
        max = parseInt(member.maxStorageCapacity / 1024) + "G";
      }
      if (member.actualStorageOccupied < 1024 * 1024 * 1024) {
        used = parseInt(member.actualStorageOccupied / 1024 / 1024) + "M";
      } else {
        used =
          parseInt(member.actualStorageOccupied / 1024 / 1024 / 1024) + "G";
      }
      return used + "/" + max;
    },
    addMember() {
      var __this = this;
      __this.bus.$emit("reload");
      this.$store.state.tempMember.departmentId = this.$store.state.searchDept.id;
      this.$store.state.tempMember.deptName = this.$store.state.searchDept.name;
      this.$store.state.currentDeptName =  this.$store.state.searchDept.name;
      this.$store.state.memberUpdate = false;
      layer.open({
        id: "dlayer4",
        type: 1,
        skin: "pop_w",
        title: "添加成员",
        area: ["650px", "500px"],
        btn: ["确认", "取消"],
        content: $(".adTPop_w"),
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          mask.appendTo(layero.parents("body"));
          layero.appendTo(layero.parents("body"));
        },
        yes: function(index) {
          // layer.close(index);
          __this.bus.$emit("addMember",{layer,index});
        },
        btn2: function(index) {
          __this.bus.$emit("cleardata");
          // __this.$store.state.tempMember.userName = "";
          // __this.$store.state.tempMember.userEmail = "";
          // __this.$store.state.tempMember.userPhone = "";
           $(".adTPop_w").hide();
          //  $(".adTPop_w").remove();
        },cancel: function(){ 
          __this.bus.$emit("cleardata");
          $(".adTPop_w").hide();
          //  $(".adTPop_w").remove();
        }
      });
    },
    delMember() {
      var __this = this;
      if(__this.temp.length == 0){
        return;
      }
      var layerContent =
        '<div class="genPop_w dTPop_w">' +
        '<p class="mb24">是否<span class="cRed_w">删除</span>成员？</p>' +
        "<p>删除后成员的邮箱将被清空。</p>" +
        "</div>";
      layer.open({
        id: "dlayer5",
        type: 1,
        skin: "pop_w",
        title: "删除确认",
        area: ["550px", "auto"],
        btn: ["确认", "取消"],
        content: layerContent,
        yes: function(index) {
          if (__this.temp.length > 0) {
            var idList = __this.temp.map(item => item.uid);
            __this.$axios
              .delete(process.env.API_SERVER + "/api/account?uid=" + idList)
              .then(res => {
                __this.bus.$emit("searchMember", 0);
                $(".table_box tbody input").iCheck("uncheck");
                layer.msg("删除成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
              });
          }
          layer.close(index);
        }
      });
    },
    updateMember(member) {
      var __this = this;
      if(__this.DEBUG){
        console.log(member);
      }
      this.$store.state.memberUpdate = true;
      var email = member.mailAddress.split("@");
      this.$store.state.tempMember.userName = member.name;
      this.$store.state.tempMember.uid = member.uid;
      this.$store.state.tempMember.userRealName = member.name;
      this.$store.state.tempMember.userEmail = email[0];
      this.$store.state.memberEmail = email[0];
      this.$store.state.tempMember.userPhone = member.contact;
      this.$store.state.tempMember.departmentId = member.departmentId;
      this.$store.state.tempMember.deptName = member.deptName;
      this.$store.state.tempMember.storageCapacity = member.maxStorageCapacity;
      __this.bus.$emit("updateSelect", member.maxStorageCapacity);
      layer.open({
        id: "dlayer4",
        type: 1,
        skin: "pop_w",
        title: "修改成员",
        area: ["650px", "500px"],
        btn: ["确认", "取消"],
        content: $(".adTPop_w"),
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          mask.appendTo(layero.parents("body"));
          layero.appendTo(layero.parents("body"));
        },
        yes: function(index) {
          // layer.close(index);
          __this.bus.$emit("updateMember",{layer,index});
          //  $(".adTPop_w").hide();
        },
        btn2: function(index) {
          __this.bus.$emit("cleardata");
          $(".adTPop_w").hide();
          // $(".adTPop_w").remove();
        },cancel: function(){ 
          $(".adTPop_w").hide();
          //  $(".adTPop_w").remove();
        }
      });
    },
    //设置限制邮件外发
    setPublicDelivery(status) {
      var __this = this;
      if(__this.temp.length == 0){
        return;
      }
      var cids = __this.temp.map(item => item.uid);
      this.$axios
        .put(
          process.env.API_SERVER +
            "/api/account/publicDelivery?cid=" +
            cids +
            "&status=" +
            status
        )
        .then(res => {
          __this.temp.forEach(function(item, index, array) {
            item.publicDeliveryDisabled = status;
             layer.msg("修改成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
          });
        });
    },
    //设置限制ip登录
    setLimitIp(status) {
      var __this = this;
      if(__this.temp.length == 0){
        return;
      }
      var cids = __this.temp.map(item => item.uid);
      this.$axios
        .put(
          process.env.API_SERVER +
            "/api/account/limitIp?cid=" +
            cids +
            "&status=" +
            status
        )
        .then(res => {
          __this.temp.forEach(function(item, index, array) {
            item.limitIpAddressEnabled = status;
             layer.msg("修改成功", {
                  skin: "Smsg_w",
                  icon: 1,
                  offset: "60px",
                  time: 2000
                });
          });
        });
    }
  }
};
</script>
