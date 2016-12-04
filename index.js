'use strict';

// 创建原生窗口的模块
const {BrowserWindow} = require('electron');
//js 交互
const {ipcMain} = require('electron');

// 控制App生命周期的模块
const {app} = require('electron');
// const app = electron.app;  

// const BrowserWindow = electron.BrowserWindow;  

// 保持对窗口对象的全局引用。如果不这么做的话，JavaScript垃圾回收的时候窗口会自动关闭
var win = null;

function createWindow() {
    // 创建一个新的浏览器窗口
    win = new BrowserWindow({
        width: 1024, height: 700,
        frame: process.platform == "win32" ? false : true,
        titleBarStyle: 'hidden',// for mac
        transparent: true,
        minWidth: 1024,
        minHeight: 700
        // transparent: true
    });

    // 并且装载应用的index.html页面
    win.loadURL(`file://${__dirname}/app/index.html`);

    // 打开开发工具页面
    win.webContents.openDevTools();

    // 当窗口关闭时调用的方法
    win.on('closed', () => {
        // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
        // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
        win = null;
    });

}

// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
// 有些API只能在该事件发生后才能被使用。
app.on('ready', createWindow);

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
    // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他
    // 窗口打开
    if (win === null) {
        createWindow();
    }
});


ipcMain.on('close', (event, arg) => {
    app.quit();
});
ipcMain.on('minimize', (event, arg) => {
    win.minimize();
});
ipcMain.on('restore', (event, arg) => {
    win.unmaximize();
});
ipcMain.on('maximize', (event, arg) => {
    win.maximize();
});
