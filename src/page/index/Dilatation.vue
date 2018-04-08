<template>
    <div>
        <p class="admin_tit">申请扩容</p>
            <div class="admin_whiteList">
                <ul class="kr_box">
                    <li>
                        <div class="kr1">已有用户数</div>
                        <div class="kr2">100 人</div>
                        <div class="kr3">
                            <i class="t-a-r w-70 pr-20">新增用户数</i>
                            <p class="kr_count clearfix">
                                <a href="javascript:;" class="reduceBtn">-</a>
                                <input type="text" class="countInp" value="0" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
                                <a href="javascript:;" class="addBtn">+</a>
                            </p>
                            <i class="pl-20">人</i>
                        </div>
                    </li>
                    <li class="mt-20">
                        <div class="kr1">已有容量</div>
                        <div class="kr2">100 G</div>
                        <div class="kr3">
                            <i class="t-a-r w-70 pr-20">新增容量</i>
                            <p class="kr_count clearfix">
                                <a href="javascript:;" class="reduceBtn">-</a>
                                <input type="text" class="countInp" value="0" onkeyup="this.value=this.value.replace(/\D/g,'')"/>
                                <a href="javascript:;" class="addBtn">+</a>
                            </p>
                            <i class="pl-20">G</i>
                        </div>
                    </li>
                    <li class="mt-20">
                        <div class="kr1">价格</div>
                        <div class="kr2"><i>￥</i><i class="c_fc4545 f-s-16">500</i></div>
                    </li>
                    <li class="mt-20">
                        <a href="javscript:;" class="admin_btn_solid w-80 ml-10">支 付</a>
                    </li>
                </ul>
            </div>
            <p class="admin_tit mt-40">扩容记录</p>
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
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_f76f25">未支付</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_74d03d">成功</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_f76f25">未支付</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_74d03d">成功</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_f76f25">未支付</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_74d03d">成功</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_f76f25">未支付</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_74d03d">成功</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_f76f25">未支付</span></td>
                            </tr>
                            <tr>
                                <td>100</td>
                                <td>100G</td>
                                <td>2017-12-12   16:16:26</td>
                                <td><span class="c_74d03d">成功</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="page_box">
                    <div class="pagination">
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
export default {
  name:'Dilatation'
}
</script>
<style scoped>
@import '../../assets/css/admin_zy.css';
</style>
