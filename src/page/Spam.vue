<template>
    <div>
        <p class="admin_tit">黑名单</p>
            <div class="admin_whiteList">
                <dl>
                    <dt><a href="08_反垃圾_01设置邮件地址黑名单.html">设置邮件地址黑名单</a></dt>
                    <dd>（如果你不希望收到某人的邮件，你可以把他的邮件地址加入到黑名单。）</dd>
                </dl>
                <dl class="mt-30">
                    <dt><a href="08_反垃圾_02设置域名黑名单.html">设置域名黑名单</a></dt>
                    <dd>（例：在域名黑名单中设置“example.com”，拒绝来自该站点的邮件。）</dd>
                </dl>
            </div>

            <p class="admin_tit mt-40">白名单</p>
            <div class="admin_whiteList">
                <dl>
                    <dt><a href="08_反垃圾_03设置邮件地址白名单.html">设置邮件地址白名单</a></dt>
                    <dd>（来自邮件地址白名单中联系人的邮件，仅受用户自定义规则影响，确保你能收到他的邮件。）</dd>
                </dl>
                <dl class="mt-30">
                    <dt><a href="08_反垃圾_04设置域名白名单.html">设置域名白名单</a></dt>
                    <dd>（例：在域名白名单中设置“troila.com”，来自该站点的邮件仅受用户自定义规则影响，确保你收到“@troila.com”发来的所有邮件。）</dd>
                </dl>
            </div>

            <p class="admin_tit mt-40">反垃圾选项</p>
            <div class="admin_whiteList">
                <ul>
                    <li>垃圾邮件处理：</li>
                    <li>
                        <span><label class="mr-10"><input type="radio" name="yjcl" checked/></label>接收（临时存放在垃圾邮件中）</span>
                        <span class="mt-30"><label class="mr-10"><input type="radio" name="yjcl"/></label>拒收（直接删除）</span>
                    </li>
                </ul>
            </div>
            <div class="mt-20 clearfix">
                <a href="javascript:;" class="admin_btn_border w-80 fr">取消</a>
                <a href="javascript:;" class="admin_btn_solid w-80 mr-20 fr">保存更改</a>
            </div>
    </div>
</template>
<script>
export default {
  name:'Account'
}
</script>
<style scoped>
@import '../assets/css/admin_zy.css';
</style>
