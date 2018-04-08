<template>
    <div>
        <p class="admin_tit">企业信纸<a href="07_添加修改信纸.html" class="admin_btn_border w-110 fr titBtn">设计新信纸</a></p>
        <div class="admin_white_MH mt-20">
            <ul class="email_pages clearfix">
                <!--信纸分两种：自定义信纸class="ep_diy"，可编辑可删除；系统自带信纸class="ep_list"不可编辑和删除；两种信纸hover都出现大图预览-->
                <!--一个自定义信纸start-->
                <li class="ep_diy">
                    <img src="../../assets/images/xinzhi1.png" alt=""/>
                    <span>自定义信纸</span>
                    <p class="hide">
                        <a href="07_添加修改信纸.html" class="ep_edit"></a>
                        <a href="javascript:;" class="ep_delete"></a>
                    </p>
                </li>
                <!--一个自定义信纸end-->
                <li class="ep_diy">
                    <img src="../../assets/images/xinzhi1.png" alt=""/>
                    <span>自定义信纸</span>
                    <p class="hide">
                        <a href="07_添加修改信纸.html" class="ep_edit"></a>
                        <a href="javascript:;" class="ep_delete"></a>
                    </p>
                </li>
                <!--一个系统自带信纸start-->
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <!--一个系统自带信纸end-->
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <li class="ep_list"><img src="../../assets/images/xinzhi2.png" alt=""/></li>
                <!--信纸hover效果 start-->
                <div class="big_EP hide">
                    <img src="../../assets/images/big_EP.png" alt=""/>
                    <div>
                        <p>你好：</p>
                        <p class="pt-10 t-i-25">这是一封测试邮件，用来预览信纸效果。</p>
                        <p class="pt-10 t-i-25">正文AaBbCc</p>
                    </div>
                </div>
                <!--信纸hover效果 end-->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  name:'Paper'
}
</script>
<style scoped>
@import '../../assets/css/admin_zy.css';
</style>
