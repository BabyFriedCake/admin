<template>
    <!-- 操作日志页面 -->
    <div class="admin_bigWhite log_w">
        <div class="table_box pt30_w">
            <table>
                <thead>
                    <tr>
                        <th width="60%">操作</th>
                        <th width="40%">操作时间</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in operateLogList" :key="index">
                        <td v-bind:title="item.executeDescription">{{item.executeDescription}}</td>
                        <td>{{loginTime(item.executeTime)}}</td>
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
  name: "OperateLog",
  data: function() {
    return { 
      operateLogList: [] ,//操作日志列表
      page: 0,
      size: 10,
      totalSize: 100
    };
  },
  create: function() {
    console.log("切换到操作日志页面");
  },
  mounted: function() {
    var __this = this;
    this.getLogsByPage(this.page).then(res => {
      __this.initPage();
    });
  },
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
            "/api/enterprise/log/listExecute?" +
            "page=" +
            page +
            "&size=" +
            __this.size
        )
        .then(res => {
          if (__this.DEBUG) {
            console.log(res);
          }
          __this.operateLogList = res.content;
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

