<template>
          <div class="deptMR_w">
            <p class="tableBtnL_w">
                <a class="addBtnT_w " href="javascript:;" :hattr="state" @click="addMember">添加成员</a>
                <a class="dBtnT_w unCBtn_w" href="javascript:;">删 除</a>
                <a class="fBtnT_w unCBtn_w" href="javascript:;">禁止外发</a>
                <a class="rfBtnT_w w110 unCBtn_w" href="javascript:;">解除外发限制</a>
                <a class="lBtnT_w w110 unCBtn_w" href="javascript:;">限制登录IP</a>
                <a class="rlBtnT_w w110 unCBtn_w" href="javascript:;">解除登录IP限制</a>
            </p>
            <div class="table_box pt30_w">
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
                        <td><input type="checkbox" name=""/></td>
                        <td>{{member.name}}</td>
                        <td>{{member.mailAddress}}</td>
                        <td>{{member.deptName}}</td>
                        <td>{{member.contact}}</td>
                        <td>{{member.limitIpAddressEnabled?"是":"否"}}</td>
                        <td>{{member.publicDeliveryDisabled?"是":"否"}}</td>
                        <td>{{storage(member)}}</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page_box pb0">
                <div class="pagination">
                </div>
            </div>
            <!-- <div hidden>
              <a>你看不见我</a> -->
              <AddMember></AddMember>
            <!-- </div> -->
        </div>
</template>
<script>
import "../../../assets/js/iCheck";
import "../../../assets/js/jquery-1.11.3.min.js";
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
      data: {}
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
        __this.getItemsByPage(index);
      }
    });
  },
  computed: {
    state() {
      if (this.$store.getters.getAll) {
        var __this = this;
        axios
          .get(
            process.env.API_SERVER +
              "/api/dept/members?page=" +
              __this.page +
              "&size=" +
              __this.pageSize +
              "&dept=" +
              __this.$store.getters.rootdept.id
          )
          .then(res => {
            if (process.env.NODE_ENV == "development") {
              console.log(res);
            }
            __this.members = res.content;
            __this.data = res;
          })
          .catch(error => alert(error));
      }
      return this.$store.getters.getAll;
    }
  },
  mounted: function() {
    //全选、取消全选功能
  },
  methods: {
    getItemsByPage: function(page) {
      var __this = this;
      axios
        .get(
          process.env.API_SERVER +
            "/api/dept/members?page=" +
            page +
            "&size=" +
            __this.pageSize +
            "&dept=" +
            __this.$store.getters.rootdept.id
        )
        .then(res => {
          if (process.env.NODE_ENV == "development") {
            console.log(res);
          }
          __this.members = res.content;
          __this.data = res;
        })
        .catch(error => alert(error));
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
      layer.open({
        id: "dlayer4",
        type: 1,
        skin: "pop_w",
        title: "添加成员",
        area: ["590px", "500px"],
        btn: ["确认", "取消"],
        content: $(".adTPop_w"),
        success: function(layero) {
          var mask = $(".layui-layer-shade");
          mask.appendTo(layero.parents("body"));
          layero.appendTo(layero.parents("body"));
        },
        yes:function(index){
          layer.close(index);
          __this.bus.$emit("addMember");
        },
        btn2:function(index){
          __this.bus.$emit("cleardata");
        }
      });
    }
  }
};
</script>
