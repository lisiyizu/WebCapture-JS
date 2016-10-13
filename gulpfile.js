var env = "dev";
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var path = require('path');
var concat = require('gulp-concat');
// var connect = require('gulp-connect');
var less = require('gulp-less');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');

//文件关键目录
var paths = {
    less: ['dev/css/*.less'],
    js: ['dev/js/**/*.js'],
    wav: ['dev/wav/**/*.wav'],
    img: ['dev/img/*.*',],
    // goodsimg: ['dev/goods-img/**/*.*'],
    pages: ['dev/**/*.html'],
    fonts: ['dev/fonts/*.*']
};

//js压缩和发布
gulp.task('js', function () {
    var t = gulp.src(paths.js);
    env != "development" && t.pipe(uglify()) //测试的时候先不压缩，
    //.pipe(rename({suffix:'.min'}))
    //.pipe(concat('bundle.min.js'))
    t.pipe(gulp.dest('./app/js'));
});

//lcss压缩和发布
gulp.task('less', function () {
    gulp.src(paths.less) //['res/css/style.less','res/css/common.less'])
        .pipe(less())
        .pipe(cleancss({
            advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            "compatibility": 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepSpecialComments: '*', //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
        }))
        //.pipe(rename({suffix:'.min'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./app/css'))
});
gulp.task('wav', function () {
    gulp.src(paths.wav)
        .pipe(gulp.dest('./app/wav'))
});
//图片发布
gulp.task('img', function () {
    gulp.src(paths.img)
        .pipe(gulp.dest('./app/img'))
});
// gulp.task('goodsimg', function () {
//     gulp.src(paths.goodsimg)
//         .pipe(gulp.dest('./app/goods-img'))
// });

//字体
gulp.task('fonts', function () {
    gulp.src(paths.fonts)
        .pipe(gulp.dest('./app/fonts'))
});

//页面
var nunjucksRender = require('gulp-nunjucks-api');
var global_data_path = env == "development" ? './config/global-dev.json' : './config/global.json';
gulp.task('pages', function () {
    gulp.src(paths.pages)
        .pipe(nunjucksRender({
            src: 'dev',
            data: require(global_data_path)
        }))
        .pipe(gulp.dest('./app/'))
});

//http 前端服务器
// gulp.task('connect', function () {
//     connect.server({
//         root: './app', //根目录
//         livereload: true //是否更改自动刷新页面
//     });
// });

gulp.task('reload', function () {
    gulp.src('./app/**/*')
    // .pipe(connect.reload());
});

//输出日志
var watchEvent = function (event) {
    console.log('文件 ' + path.basename(event.path) + ' 发生 ' + event.type + ', 重启任务...');
};

//监听文件改变
gulp.task('watch', function () {
    gulp.watch(paths.fonts, ['fonts', 'reload']).on("change", watchEvent);
    gulp.watch(paths.less, ['less', 'reload']).on("change", watchEvent);
    gulp.watch(paths.wav, ['wav', 'reload']).on("change", watchEvent);
    gulp.watch(paths.js, ['js', 'reload']).on("change", watchEvent);
    gulp.watch(paths.img, ['img', 'reload']).on("change", watchEvent);
    // gulp.watch(paths.goodsimg, ['goodsimg', 'reload']).on("change", watchEvent);
    gulp.watch(paths.pages, ['pages', 'reload']).on("change", watchEvent);

});
var tasks = ['pages', 'js','wav', 'less', 'img', 'fonts'];

if (env == "dev") {
    // tasks.push("connect", "reload", "watch");
    tasks.push("reload", "watch");
}
gulp.task('default', tasks);