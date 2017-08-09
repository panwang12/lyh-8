//前端数据
var describe={
    pagedata:[
        [
            "看一眼爱上一个人是可能的",
            "不过还得仔细看第二眼",
            "所以请你不仅要关注我",
            "最好还要认证哦"
        ],
       [
            "爱情并不在于彼此凝视",
            "而是在于朝着共同的目标向前看",
            "你凝视我，我陪你看"
        ],
        [
            "如果你的生命中有爱",
            "它可以弥补你许多缺失的东西",
            "如果我的生命中有你",
            "我会变得更加精彩"
        ],
        [
            "如果你的生命中没有爱",
            "不管你拥有什么东西它永远是不够的",
            "如果我的生命中没有你",
            "再丰富的内容也是空洞"
        ],
        [
            "再丑也要谈恋爱",
            "谈到世界充满爱",
            "再忙都要把我点开",
            "因为龙友圈里全都是爱"
        ],
        [
            "假如真的有鹊桥",
            "我要跟你走到桥的尽头",
            "然后把桥拆了，不让你走",
            "陪伴你用车的时光",
            "顺便陪伴你的人生"
        ],
        [
            "七夕其实并不美",
            "美丽的是和你共度七夕的那种感觉",
            "没有你",
            "我的存在毫无意义"
        ],
        [
            "迎着阳光开放的花朵才美丽",
            "伴着革命理想的爱情才甜蜜",
            "你若不离不弃",
            "我便生死相依"
        ],
        [
            "一起到葡萄架下去听听牛郎织女的悄悄话",
            "快来吧",
            "告诉大家你有多幸福"
        ]

    ]
}
var bgUrl={
    page1:"images/page1-bg.png",
    page2:["images/p1-bg.png",
           "images/p2-bg.png",
           "images/p3-bg.png",
           "images/p4-bg.png",
           "images/p5-bg.png",
           "images/p6-bg.png",
           "images/p7-bg.png",
           "images/p8-bg.png",
           "images/p9-bg.png"
          ]
}


//获得openid
var openid=getUrlParam("openid");
//openid="o2Ld3jvzzD";//不存在的openid
//openid="o2Ld3jvzzDmHtWAuksEqcSP-CaxI";//测试已经获取luckCode
//penid="o2Ld3jrdhvegyEgp0m5jMvs35T6c";
openid="o2Ld3jiakD4dOQh9wl9nBL7TgRN8";//未获取luckCode


//设置容器的高度
$("#my-container").css("height",$(document).height());


//页面加载完的处理函数
window.onload=function(){
    location.hash="#page0";
    getPage0()
}
window.onpopstate=function(){
    if(location.hash==="#page0"){
        getPage0()
    }
    if(location.hash==="#page1"){
        getPage1()
    }
}
function getPage0(){
    $('#covered').css("display","block");
    $('#covered').swipe({//滑动事件
        swipe:function(event, direction) {
            if (direction == "up") {
                location.hash="#page1";
                getPage1()
            }
        },
        threshold:1
    })
}
//异步加载第一页的html
function getPage1(){
    //添加背景
    $('#covered').css("display","none");
    $("#my-container").fadeIn(500);
    $("#my-container").addClass("page-bg");
    $("#main").load("component/page1.html",function(){
        $(".page-bg").css("background-image","url("+bgUrl.page1+")");
        //按钮1-提示框
        $("#page1-btn1").click(function(e){
            e.preventDefault();
            $("#hint1").css("display","block")
            $("#hint1 span").click(function(){
                $("#hint1").css("display","none")
            })
        });
        //按钮2
        $("#page1-btn2").click(function(e){
            e.preventDefault();
            $.ajax({
                type:"get",
                url:"http://tanabatamembers.dfcitroenclub.com/api/Values/GetInfoByOpenID/"+openid,
                success:function(obj){
                    if(obj.message==="会员信息不存在"){
                        $("#hint2").css("display","block");
                        $("#hint2 span").click(function(){
                            $("#hint2").css("display","none");
                        });
                        return;
                    };
                    if(obj.data.luckNo===null){
                        $("#hint4").css("display","block");
                        $("#hint4 span").click(function(){
                            $("#hint4").css("display","none");
                        });
                        return;
                    }
                    $("#main").load("component/page2.html",function() {
                        var num = parseInt(obj.data.pageNo);
                        getPage2(num,obj);
                    })
                },
                error:function(){
                    console.log("请求错误")
                }
            })
        });
        //点击九宫格跳转到指定页面
        $(".select-btn").on("click","a",function(e){
            e.preventDefault();
            var param=$(this).attr("href");
            $.ajax({
                type:"get",
                url:"http://tanabatamembers.dfcitroenclub.com/api/Values/"+openid+"/"+param,
                success:function(obj){
                    console.log(obj)
                    if(obj.message==="会员信息不存在"){
                        $("#hint2").css("display","block");
                        $("#hint2 span").click(function(){
                            $("#hint2").css("display","none");
                        });
                        return;
                    }
                    if(obj.isGet===1){
                        $("#hint3").css("display","block");
                        $("#hint3 span").click(function(){
                            $("#hint3").css("display","none");
                        });
                        return;
                    }
                    getPage2(param,obj);
                },
                error:function(){
                    console.log("请求错误")
                }
            })

        })
    });
    //加载第一页后的回调函数

}

//获得page2页面
function getPage2(param,obj){
    $("#main").load("component/page2.html",function(){
        location.hash="#page2";
        var num=parseInt(param);
        switchBg(bgUrl.page2[num-1]);//获得背景图片路径
       // operateCss(num);//设置css
        insertHtml(describe.pagedata[num-1]);//插入文字
        $("#luck-code p").html(obj.data.luckNo);
    });
}

//调整页面的css
function operateCss(num){
    switch (num){
        case 1:
            $("#luck-code").css("margin-top","80px");
            break;
        case 2:
            $("#luck-code").css("margin-top","80px")
            break;
        case 7:
            $("#luck-code").css("margin-top","100px")
            break;
        case 8:
            $("#luck-code").css("margin-top","100px")
            break;
    }
}
//通过url地址获取openid
function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return ""; //返回参数值
};
//在page2中插入htmls
function insertHtml(obj){
    var html="";
    for(var i=0;i<obj.length;i++){
        html+="<p>"+obj[i]+"</p>";
    }
    $("#paragraph").html(html)
}

//匹配背景图
function switchBg(bgImg){
    $(".page-bg").css("background-image","url("+bgImg+")")
}
//修改返回键
function preventBack(){
    var pushState = window.history.pushState;
    //点击物理返回键时，退出到跳转定义首页
    if(pushState){
        window.history.pushState({a: Math.random()},'', location.href);
        window.addEventListener('popstate', function(){
            if(i===1){
                $("#main").load("component/page1.html",p1Callback);
            }
         }, false);
    }
}


