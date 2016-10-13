(function (window) {

    var Tools = {
        palySound: function (soundName) {
            var audio = new Audio('./wav/' + soundName + '.wav');
            audio.currentTime = 0;
            audio.play();
        },
        windowInit: function (ipcRenderer) {
            if (process.platform == 'win32') {
                $('.sysmenu').show();

                //关闭，最小化，最大化
                $('.fa-close').click(function () {
                    ipcRenderer.send('close');
                });
                $('.fa-square-o').click(function () {
                    var _this = $(this);
                    if (_this.hasClass('fa-clone')) {
                        ipcRenderer.send('restore');
                        _this.removeClass('fa-clone');
                    } else {
                        _this.addClass('fa-clone');
                        ipcRenderer.send('maximize');
                    }
                });
                $('.fa-minus').click(function () {
                    ipcRenderer.send('minimize');
                });
            };
        }
    }






    if (typeof define === 'function' && define.amd) {
        define(function () { return Tools; });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = Tools;
    }
    else {
        window.Tools = Tools;
    }

} (window));