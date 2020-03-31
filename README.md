# Ascii轉換
改寫自EnotionZ的jscii套件

新增的Ascii匯出GIF功能則是參照imgss的gif.js生成範例

當前版本已針對目前瀏覽器版本做優化及改良，原先的彩色功能考量到實際轉化效能過低因此未開放使用，
需要的話請將color: true,註解拿掉即可。

想測試功能的話，可至<a href="https://akakaze.idv.tw/WebCoding/">官網</a> 試試。


# 撰寫方式
```html
JsciiCovert(FileURL,'AsciiSet'); // 放入物件,指定Element即可執行
```

除了 Microsoft 所提供的瀏覽器（如：Edge、Internet Explorer）外，都獲得後續的支援與開發。
|         | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_64x64.png)<br>Chrome | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_64x64.png)<br>Firefox | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_64x64.png)<br>Edge | ![WebView](https://raw.githubusercontent.com/alrra/browser-logos/master/src/android-webview-beta/android-webview-beta_64x64.png)<br>Android WebView | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_64x64.png)<br>Opera | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_64x64.png)<br>Safari |
|---------|--------|---------|------|-------------------|-------|--------|
| Android | 29+    | 28+     | N/A  | Android 5.0+      | 17+   | N/A    |
| iOS     | 29+    | 28+     | N/A  | N/A               | 17+   | 9.2+   |
| macOS   | 29+    | 28+     | N/A  | N/A               | 17+   | 9+     |
| Windows | 29+    | 28+     | ✖    | N/A               | 17+   | 9+     |
