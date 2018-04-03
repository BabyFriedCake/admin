$('document').ready(function(){
    var body=$('body');
    var padding=10;
    $('.comList_P').find('li').each(function(){
        var num=$(this).parents('ul').length;
        var paddingW=num*padding;
        $(this).children('dl').find('dd').css('paddingRight',paddingW+"px")
    })

});