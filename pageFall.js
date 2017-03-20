/*!
 * pageFall.v1.1
 * 解决 新站首页瀑布流定制
 * 无官网，无文档，无生产许可证。
 *
 * Copyright 2017 leon0204   forkme @ 【leon0204@github.com】
 *

 * 使用方法：1 添加 #loadsoft 的dom节点用于设置初始页码
 *          2  scroll 实现滑动翻页
 *          3 softnavClass  实现两栏即以上的当前滑动页面判断
 *          4 ajax + php 实现翻页数据获取
 *          5 设置页数15页

 *          v1.2 添加翻页加载动画 。优化加载速度。

 */

var softPage = $("#loadsoft").attr("data-page");
var eduPage = $("#loadedu").attr("data-page");
$(window).scroll(function () {
    if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
        var softClassCondition = $("#softnav").attr('class');
        var eduClassCondition = $("#edunav").attr('class');
        if (softClassCondition == 'on'  ){
            softPage++;
            var ajaxurl = 'ajax?page='+softPage+'&type=soft';
            $.get(ajaxurl, function (data) {
                addSoft(data,softPage);
            }, 'json');
        }else if (eduClassCondition =='on') {
            if(eduPage<17){
                eduPage++;
                var ajaxurl = 'ajax?page='+eduPage+'&type=edu';
                $.get(ajaxurl, function (data) {
                    addEdu(data,eduPage);
                }, 'json');
            }
        }else{
            return false;
        }
    }
});

function addSoft(data,pageCount) {
    if(pageCount>15){
        $("#loadsoft").text('进入列表页查看更多');
        $('#loadsoft').attr('href','/soft/soft-2-1.html');
        return;
    }
    var str = '';
    var length =data.length;
    if (length == 0 ||length<10){
        $("#loadsoft").text('进入列表页查看更多');
        $('#loadsoft').attr('href','/soft/soft-2-1.html');
        return;
    }
    for(var i=0,length;i<length;i++){
        //在这里进行str的拼接
        str = '<li><div class="list-box cl"><div class="list-img"><a href="'+  data[i]['infourl']+'"> <img src="'+  data[i]['titlepic']+'" alt="'+  data[i]['title']+'"/></a> </div>'
            +   '<div class="list-right  cl">   <div class="list-title"> <h2> <a href="'+  data[i]['infourl']+'">'+  data[i]['title']+'</a> </h2> </div>'
            +   '<div class="meta cl"> <em>软件大小：'+  data[i]['size']+' </em> <em> <span> 星级： </span> <div class="star-bar star-bar-show_2 size-M f-l va-m  pull-left cl"> <span class="star" style="width: '+  data[i]['star']*10 +'%"> </span></div> </em></div> '
            +   '<div class="list-bdcontent"> '+  data[i]['description']+' </div><a href="'+  data[i]['infourl']+'" class="btn">  <i class="icon-xiazai"> </i>立即下载 </a></div></div></li>';
        $(".addsoft").append(str);
    }
}

function addEdu(data,pageCount) {
    if(pageCount>15){
        $("#loadedu").text('进入教程列表页查看更多');
        $('#loadedu').attr('href','/edu/soft-15-1.html');
        return;
    }
    var str = '';
    var length =data.length;
    if (length == 0 ||length<10){
        $("#loadedu").text('进入教程列表页查看更多');
        $('#loadedu').attr('href','/edu/edu-15-1.html');
        return;
    }
    for(var i=0,length;i<length;i++){
        //在这里进行str的拼接
        str = ' <li><div class="news-img pull-left"> <a href="'+  data[i]['infourl']+'"><img src="'+  data[i]['titlepic']+'" alt="'+  data[i]['title']+'"/>'
            +  '</a> </div>    <div class="news-head">  <h2>      <a href="'+  data[i]['infourl']+'">    '+  data[i]['title']+'    </a> </h2> </div>'
            +  '<p class="meta"> <time>   '+  data[i]['lastdotime']+'   </time> <span class="author"> '+  data[i]['username']+'</span><span class="pv">阅读(  '+  data[i]['allHits']+')</span> </p>'
            +  '<p class="note">'+  data[i]['smalltext']+'  <a href=" '+  data[i]['infourl']+' " class="btn">查看全文</a></p><div class="cl"></div></li>';
        $(".addedu").append(str);

    }

}

