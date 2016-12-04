'use strict';
//引入jquery
window.$ = window.jQuery = require('./js/jquery.min.js');

var manager = require('./js/manager.js');

//公用的库
var Tools = require("./js/tools.js");

//ipc 通讯
var ipcRenderer = require('electron').ipcRenderer;

console.log(process);

Tools.windowInit(ipcRenderer);



//菜单切换
$('#menu li').click(function () {
    // $('.content').show();
    $(this).addClass('active')
        .siblings().removeClass('active');
    var id = $(this).attr('id');
    switch (id) {
        case "caiji":
            manager.initCamera();
            break;
        case "guanli":
            manager.initCanvas();
            break;
        case "ruku":
            manager.initFile();
            break;
    }
});

 
//拍照
$('.fa-camera').click(function () {
    Tools.palySound('paizhao');
    // WebCamera.snap(function (data_uri) {
    // document.getElementById('my_result').innerHTML = '<img src="' + data_uri + '"/>';
    // });
    var offset = $("#icon-cart").offset();
    $(".addcart").click(function (event) {
        var img = $(this).parent().children('img').attr('src');//获取当前点击图片链接
        var flyer = $('<img class="flyer-img" src="' + img + '">');//抛物体对象
        flyer.fly({
            start: {
                left: event.pageX, //抛物体起点横坐标
                top: event.pageY////抛物体起点纵坐标
            },
            end: {
                left: offset.left + 10, //抛物体终点横坐标
                top: offset.top + 10, //抛物体终点纵坐标
            },
            onEnd: function () {
                $("#tip").show().animate({ width: '200px' }, 300).fadeOut(500);//成功加入购物车动画效果
                this.destory();//销毁抛物体
            }
        });
    });

});



// var canvas = $('canvas');
// var context = canvas[0].getContext('2d');
// context.lineWidth = 1;
// context.shadowBlur = 1;
// context.shadowColor = 'red';
// context.strokeStyle = 'red';
// // context.globalCompositeOperation = 'source-in'; //优化锯齿
// var mousedown = false;
// var x, y;
// canvas.on('mousedown', function (e) {
//     mousedown = true;
//     var x = e.pageX,
//         y = parseInt(e.pageY) - 120;
//     context.beginPath();
//     context.moveTo(x, y);
// })
//     .on('mousemove', function (e) {
//         if (mousedown) {
//             x = parseInt(e.pageX);
//             y = parseInt(e.pageY) - 120;
//             context.lineTo(x, y);
//             context.stroke();
//         }
//     })
//     .on('mouseup', function (e) {
//         mousedown = false;
//     })

// var enabled = false;

// var openDevice = function (ddd) {
//     // if (enabled) { // Start the camera !
//     //     WebCamera.attach('#camera-box');
//     //     console.log("The camera has been started");
//     // } else { // Disable the camera !
//     //     WebCamera.reset();
//     //     console.log("The camera has been disabled");
//     // }
//     if (!enabled) { // Start the camera !
//         enabled = true;
//         WebCamera.attach('#camera-box');
//         console.log("The camera has been started");
//     } else { // Disable the camera !
//         enabled = false;
//         WebCamera.reset();
//         console.log("The camera has been disabled");
//     }
// }

// $('body').on('resize', function () {
//     var v = $('video');
//     var p = v.parent('div');
//     v.css({ width: p.width(), height: p.height() })
//     console.log('dddddd');
// })



// $.fn.animateRotate = function (angle, duration, easing, complete) {
//     var args = $.speed(duration, easing, complete);
//     var step = args.step;
//     console.log(this);
//     return this.each(function (i, e) {
//         args.complete = $.proxy(args.complete, e);
//         args.step = function (now) {
//             $.style(e, 'transform', 'rotate(' + now + 'deg)');
//             if (step) return step.apply(e, arguments);
//         };
//         var _angle = angle - 90;
//         $({ deg: _angle }).animate({ deg: angle }, args);
//     });
// }