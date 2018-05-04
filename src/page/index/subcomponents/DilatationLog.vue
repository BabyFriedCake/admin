<template>
     <div class="admin_bigWhite mt-20">
                <div class="table_box">
                    <table>
                        <thead>
                            <tr>
                                <th width="20%">用户数</th>
                                <th width="20%">容量</th>
                                <th width="40%">时间</th>
                                <th width="20%">扩容状态</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(log,index) in logs" :key="index">
                                <td>{{log.enlargeUsers}}</td>
                                <td>{{log.enlargeStorageCapacity/1024}}G</td>
                                <td>{{createTime(log.gmtCreate)}}</td>
                                <td><span class="c_f76f25">{{log.gmtPurchase?"已支付":"未支付"}}</span></td>
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
  name: "DilatationLog",
  data: function() {
    return {
      page: 0,
      size: 10,
      logs: [],
      totalElements: 10
    };
  },
  mounted: function() {
    var __this = this;
    this.getDilatationLogs(this.page).then(res => {
      __this.initPagination();
    });
    this.bus.$on("updateDilatationLog", function() {
      //   alert("更新扩容记录")
      __this.getDilatationLogs(__this.page).then(res => {
        __this.initPagination();
      });
    });
  },
  created: function() {},
  updated: function() {},
  methods: {
    getDilatationLogs(page) {
      var __this = this;
      return this.$axios
        .get(
          process.env.API_SERVER +
            "/api/enterprise/enlarge/list?" +
            "page=" +
            page +
            "&size=" +
            __this.size
        )
        .then(res => {
          if (__this.DEBUG) {
            console.log(res);
          }
          __this.logs = res.content;
          __this.totalElements = res.totalElements;
        });
    },
    createTime(milliseconds) {
      var date = new Date(milliseconds).toLocaleString();
      return date;
    },
    initPagination() {
      var __this = this;
      $(".pagination").pagination(__this.totalElements, {
        items_per_page: __this.size,
        num_display_entries: 4,
        current_page: 0,
        num_edge_entries: 1,
        callback: function(index) {
          __this.getDilatationLogs(index);
        }
      });
    }
  }
};
</script>

