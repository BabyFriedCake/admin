<template>
  <div>
    <p class="mb-20">
        <a class="logBtn_w on mr40_w" href="javascript:;">部门管理</a> 
        <a href="javascript:;" class="logBtn_w">成员管理</a></p>
        <div class="admin_bigWhite log_w p30">
        <p class="dPN_w"><b class="pl190">部门</b><b class="dPNR_w">操作</b></p>
        <!--展开收起 start-->
        <ul class="deptL_w deptLW100_w grade1">
            <li>
                <a href="javascript:;">天津卓朗科技发展有限公司</a>
                <ul class="grade2 hide">
                    <li>
                        <a href="javascript:;">软件事业部</a>
                        <ul class="grade3 hide">
                            <li>
                                <a href="javascript:;">卓朗云邮</a>
                                <ul class="grade4 hide">
                                    <li>
                                        <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                                    </li>
                                    <li>
                                        <a  class="noIcon_w" href="javascript:;">卓朗网盘</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a class="noIcon_w" href="javascript:;">卓朗网盘</a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;">软件事业部</a>
                        <ul class="grade3 hide">
                            <li>
                                <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                            </li>
                            <li>
                                <a href="javascript:;">卓朗云邮</a>
                                <ul class="grade4 hide">
                                    <li>
                                        <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                                    </li>
                                    <li>
                                        <a  class="noIcon_w" href="javascript:;">卓朗网盘</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
        <!--展开收起 over-->
    </div>
    <div class="admin_bigWhite log_w pt-30 pb-30 hide">
        <div class="deptML_w">
            <ul class="deptL_w grade1">
                <li>
                    <a href="javascript:;">天津卓朗科技发展有限公司</a>
                    <ul class="grade2 hide">
                        <li>
                            <a href="javascript:;">软件事业部</a>
                            <ul class="grade3 hide">
                                <li>
                                    <a href="javascript:;">卓朗云邮</a>
                                    <ul class="grade4 hide">
                                        <li>
                                            <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                                        </li>
                                        <li>
                                            <a  class="noIcon_w" href="javascript:;">卓朗网盘</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a class="noIcon_w" href="javascript:;">卓朗网盘</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;">软件事业部</a>
                            <ul class="grade3 hide">
                                <li>
                                    <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                                </li>
                                <li>
                                    <a href="javascript:;">卓朗云邮</a>
                                    <ul class="grade4 hide">
                                        <li>
                                            <a class="noIcon_w" href="javascript:;">卓朗云邮</a>
                                        </li>
                                        <li>
                                            <a  class="noIcon_w" href="javascript:;">卓朗网盘</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="deptMR_w">
            <p class="tableBtnL_w">
                <a class="addBtnT_w " href="javascript:;">添加成员</a>
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
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name=""/></td>
                        <td>肉小虎</td>
                        <td>liuliu@troila.com</td>
                        <td>软件事业部</td>
                        <td>15911111111</td>
                        <td>是</td>
                        <td>是</td>
                        <td>50/500M</td>
                        <td><a class="mdf_w" href="javascript:;">修改</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="page_box pb0">
                <div class="pagination">
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  name:'Account'
}
</script>
<style scoped>
@import '../assets/css/wy_manage.css';
</style>
