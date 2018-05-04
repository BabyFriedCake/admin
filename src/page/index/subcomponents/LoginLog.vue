<template>
<!-- 登录日志页面 -->
    <div class="admin_bigWhite log_w">
        <div class="table_box pt30_w">
            <table>
                <thead>
                    <tr>
                        <th width="34%">登录IP</th>
                        <th width="33%">登录时间</th>
                        <th width="33%">登录地址</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in loginLogList" :key="index">
                        <td>{{item.loginIp}}</td>
                        <td>{{loginTime(item.gmtCreate)}}</td>
                        <td>{{item.loginAddress}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="page_box">
            <div class="pagination">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "LoginLog",
  data: function() {
    return {
      loginLogList: [],
      page: 0,
      size: 10,
      totalSize: 100
    };
  },
  created: function() {},
  mounted: function() {
    var __this = this;
    this.getLogsByPage(this.page).then(res => {
      __this.initPage();
    });
  },
  updated: function() {},
  methods: {
    loginTime(milliseconds) {
      var date = new Date(milliseconds).toLocaleString();
      return date;
    },
    getLogsByPage(page) {
      var __this = this;
      return this.$axios
        .get(
          process.env.API_SERVER +
            "/api/enterprise/log/listLogin?" +
            "page=" +
            page +
            "&size=" +
            __this.size
        )
        .then(res => {
          if (__this.DEBUG) {
            console.log(res);
          }
          __this.loginLogList = res.content;
          __this.totalSize = res.totalElements;
        });
    },
    initPage() {
      var __this = this;
      $(".pagination").pagination(__this.totalSize, {
        items_per_page: __this.size,
        num_display_entries: 4,
        current_page: 0,
        num_edge_entries: 1,
        callback: function(index) {
          __this.getLogsByPage(index);
        }
      });
    }
  }
};
</script>

