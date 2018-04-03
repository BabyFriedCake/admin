$("document").ready(function(){
    var body=$('body');
    var num=12;//table条数
    //全选按钮
    body.on('ifChecked','.totalCheck_P',function(){
        body.find(".checkBox_P:not('.totalCheck_P') input").iCheck('check');
        $('tbody .control2_P').show()
    });
    //全选取消
    body.on('ifUnchecked','.totalCheck_P',function(){
        body.find(".checkBox_P:not('.totalCheck_P') input").iCheck('uncheck');
        $('tbody .control2_P').hide()
    });
    //全选自动触发全选按钮
    body.on('ifChecked',".checkBox_P:not('.totalCheck_P') input",function(){
        $(this).parents('tr').find('.control2_P').show();
        var list=$(this).parents('tbody').find('.checked');
        var length=list.length+1;
        if(length==num){
            $('.totalCheck_P').html('<input type="checkbox" checked/>');
            $('.totalCheck_P input').iCheck({checkboxClass: 'icheckbox_blue'});
        }
    });
    //全选取消单一选项取消全选
    body.on('ifUnchecked',".checkBox_P:not('.totalCheck_P') input",function(){
        $(this).parents('tr').find('.control2_P').hide();
        $('.totalCheck_P').html('<input type="checkbox"/>');
        $('.totalCheck_P input').iCheck({checkboxClass: 'icheckbox_blue'});
    });
    //hover效果
    body.on('mouseenter','tbody tr',function(){
        $(this).find('.control2_P').show();
    });
    body.on('mouseleave','tbody tr',function(){
        var length=$(this).find('.checked').length;
        if(length<1){
            $(this).find('.control2_P').hide();
        }
    });
    //添加联系人
    body.on('click','.addBtn1_P',function(){
        layer.open({
            type:1,
            title:'添加联系人',
            skin:'fontLayer',
            area:['475px','auto'],
            btn:['保存','取消'],
            content:$('.layerSty1'),
            success:function(){

            }
        })
    });
    //新建群组
    body.on('click','.createGroup_P',function(){
        layer.open({
            type:1,
            title:'新建组',
            skin:'fontLayer',
            area:['570px','auto'],
            btn:['保存','取消'],
            content:$('.layerSty2'),
            success:function(){

            }
        })
    });
    //点击弹窗删除按钮
    body.on('click','.closeBtn_P',function(){
        $(this).parents('li').remove()
    });
    //点击通讯录同步到右边
    body.on('click','.connectList_P li,.connectList_P dt:not(:has("a"))',function(){
        var text=$(this).text();
        var html=dataForm(text);
        $('.alreadyP_P').append(html)
    })
});
function dataForm(data){
   return ' <li> <span>'+data+'</span> <a href="javascript:;" class="closeBtn_P"></a> </li>'
}