<template>
   <li>
                <a href="javascript:;" @click="shownext">天津卓朗科技发展有限公司</a>
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
                <p class="operList"><a class="addDpart_w" href="javascript:;">添加子部门</a><a class="mDpart_w" href="javascript:;">修改</a><a class="dDpart_w" href="javascript:;">删除</a></p>
            </li>
</template>
<script>
import '../../../assets/js/jquery-1.11.3.min.js'
export default {
  name:"Department",
  mounted(){
    //展开/收起操作
    $(".deptL_w li>a").click(function(){
        $(this).toggleClass("down").siblings("ul").slideToggle()
        $(this).parent().find("ul").find("a").removeClass("down").siblings("ul").slideUp()
        $(this).parent().siblings().find("a").removeClass("down")
        $(this).parent().siblings().find("ul").slideUp();
    })
  }
}
</script>
<style scoped>
@import '../../../assets/css/public.css';
@import '../../../assets/css/wy_manage.css';
</style>

