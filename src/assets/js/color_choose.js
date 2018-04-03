$(function(){
    $(".select_color").spectrum({
        allowEmpty:true,
        showInput: true,
        containerClassName: "full-spectrum",
        showInitial: true,
        showPalette: true,
        showSelectionPalette: true,//记住选择过的颜色
        showAlpha:false, //透明度选择
        maxPaletteSize: 6,//记住选择过的颜色的最大数量
        preferredFormat: "hex",
        localStorageKey: false,//把选择过的颜色存在浏览器上
        cancelText: "取消",//取消按钮,按钮文字
        chooseText: "选择",//选择按钮,按钮文字
        theme: "select_EP",
        move: function (color) {

        },
        //选择器面板显示时触发
        show: function () {
            $(".select_EP .sp-dd").css({
                "background":"url(../images/arrowUMW.png) no-repeat left center"
            })
        },
        //选择器面板显示之前触发
        beforeShow: function () {
        },
        //选择器面板隐藏时触发
        hide: function (color) {
            $(".select_EP .sp-dd").css({
                "background":"url(../images/arrowDMW.png) no-repeat left center"
            });
            var bgColor=($(".select_bgColor .sp-preview .sp-preview-inner").attr("style").split(":")[1]).split(";")[0];
            var color=($(".select_color .sp-preview .sp-preview-inner").attr("style").split(":")[1]).split(";")[0];

            $(".page_design_r_in").css("background-color",bgColor);
            $(".page_design_r_in p").css("color",color);

            //console.log(color,bgColor);
        },
        //选择器面板颜色设置
        palette: [
            ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
            ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)","rgb(238, 102, 102)"],
            ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)"]
        ]
    });
    //设置选择器当前颜色
    $(".select_bgColor .select_color").spectrum("set", "#ffffff");
    $(".select_color .select_color").spectrum("set", "#666666");

    //字体字号设置start

    //字体
    $(".select_fontFamily").on("change",function(){
        var fontFamily=$(this).find(".sod_list .active.selected").attr("data-value");
        $(".page_design_r_in p").css("font-family",fontFamily)
    });
    //字号
    $(".select_fontSize").on("change",function(){
        var fontSize=$(this).find(".sod_list .active.selected").attr("data-value");
        $(".page_design_r_in p").css("font-size",fontSize+"px")
    });

    //字体字号设置end

    //上传背景图start
    $(".upload_box input").on("change",function(){
        $(".page_design_r_in").css({
            "background-image":"url(../images/xinzhi1.png)",
            "background-repeat":"no-repeat",
            "background-size":"100% 100%"
        })
    })

})