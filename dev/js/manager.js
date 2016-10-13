//引入 webcamjs
var WebCamera = require("./webcam.js");

//引入canvas
var board = require('./board.js');

(function (window) {

    var manager = {
        _tool: document.getElementsByClassName('pos-top')[0],
        _item: {
            camera: ['arrows-h', 'arrows-v', 'rotate-right'],
            canvas: [
                'folder-open', 'paint-brush', 'font', 'eraser', 'trash-o', 'video-camera', 'search-plus', 'arrows', 'rotate-right', 'crop', 'save'
            ],
            file: ['file-zip-o', 'envelope-o', 'file-pdf-o', 'file-powerpoint-o', 'file-word-o']
        },
        initCamera: function () {
            if ($('video').length > 0) return;
            board.dispose();
            WebCamera.init();
            this._initTool(this._item.camera);
            WebCamera.openDevice();
            var fun;
            this._item.camera.forEach(function (i) {
                switch (i) {
                    case 'arrow-h':
                        fun = WebCamera.flipY();
                        break;
                    case 'arrows-v':
                        fun = WebCamera.flipX();
                        break
                    case 'rotate-right':
                        fun = WebCamera.setRotate();
                        break;
                }
                document.querySelector('.fa-' + i).addEventListener('click', fun, false);
            })
        },
        initCanvas: function () {
            if ($('canvas').length > 0) return;
            board.init();
            this._initTool(this._item.canvas);
            WebCamera.closeDevice();
        },
        initFile: function () {
            this._initTool(this._item.file);
            WebCamera.closeDevice();
        },
        _initTool: function (action) {
            var t = this._tool;
            while (t.firstChild) {
                t.removeChild(t.firstChild);
            }
            action.forEach(function (i) {
                // console.log(i);
                var item = document.createElement('span');
                item.className = 'fa fa-' + i;
                t.appendChild(item);
                item = null;
            })
        }
    }






    if (typeof define === 'function' && define.amd) {
        define(function () { return manager; });
    }
    else if (typeof module === 'object' && module.exports) {
        module.exports = manager;
    }
    else {
        window.Tools = manager;
    }

} (window));