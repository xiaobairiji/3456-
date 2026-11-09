# 3456视频倍速插件

## 开发者

本插件由 **3456工具导航** 开发，提供实用的在线工具与浏览器工具导航：

https://3456.com.cn/

Chrome MV3 扩展，为 PC 网页中的 HTML5 `<video>` 提供 0.5x、1x、1.5x、2x、3x、5x 和自定义倍速。

## 浏览器版本

- `chrome/`：Google Chrome
- `edge/`：Microsoft Edge
- `360-browser/`：360 浏览器（Chromium 内核版本）
- `firefox/`：Mozilla Firefox

每个文件夹都可独立加载，不要把多个文件夹同时加载。

## Chrome 试用

1. 打开 `chrome://extensions/`。
2. 打开右上角“开发者模式”。
3. 点击“加载已解压的扩展程序”。
4. 选择本文件夹 `chrome-video-speed-extension`。
5. 打开含视频的网页，点击浏览器工具栏中的插件图标。

## 说明

- 只控制 HTML5 视频；Flash、DRM 或画布渲染的视频不一定能控制。
- 某些站点的 CSP、跨域 iframe 或自定义播放器可能限制效果。
- 这是首版试用，不包含快捷键和后台 Service Worker。
