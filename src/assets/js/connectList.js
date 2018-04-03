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
        var str='<input type="checkbox" checked/>';
        var list=$(this).parents('tbody').find('.checked');
        var length=list.length+1;
        if(length==num){
            $('.totalCheck_P').html(str);
            $('.totalCheck_P input').iCheck({
                checkboxClass: 'icheckbox_blue'
            });
        }
    });
    //全选取消单一选项取消全选
    body.on('ifUnchecked',".checkBox_P:not('.totalCheck_P') input",function(){
        $(this).parents('tr').find('.control2_P').hide();
        var str='<input type="checkbox"/>';
        $('.totalCheck_P').html(str);
        $('.totalCheck_P input').iCheck({
                checkboxClass: 'icheckbox_blue'
            });

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
    })
});
function matchHeight(){
    var windowH=$(window).height();

}