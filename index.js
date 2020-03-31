var __awesome_qr_base_path = "js"; 
////20200304讀取上傳圖片 || Folder檔案
var nowLoadFile ="";
var nowLoadFileType ="";
function filecheck(FileURL){
    JsciiCovert(FileURL,'AsciiSet');
}
////////////20200321新增Ascii轉換為圖片 20200330更新至Example版本
function getPixelRatio(context){
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
}
function htmlToCanvas(dom){
    var shareContent = dom;// 獲取內容，請記得使用固定寬度，勿使用比例寬度
    var width = shareContent.offsetWidth+700;  // 獲取元件寬度
    var height = shareContent.offsetHeight; // 獲取元件高度
    var offsetTop = shareContent.offsetTop+300;  //取得offset距離
    //alert(width);
    var canvas = document.createElement('canvas');  //建立canvas
    var context = canvas.getContext('2d');
    var scaleBy = this.getPixelRatio(context);  //取得像素密度
    canvas.width = width * scaleBy ;   //設定寬度及偏移
    //canvas.width = 300;
    canvas.height = (height + offsetTop) * scaleBy;  // 設定高度及偏移
    //canvas.height = 315;
    context.scale(scaleBy, scaleBy);

    var opts = {
        allowTaint: true,//允許跨域加載圖片
        tainttest: true, //檢測圖片加載狀態
        scale: scaleBy, // 設定像素密度
        canvas: canvas, //設定指定 canvas
        logging: false, //預設關閉(套件日誌)
        width: width, //物件寬度
        height: height //物件高度
    };    
    html2canvas(shareContent, opts).then(function (canvas) {
        canvas.setAttribute('id', 'thecanvas');
        document.getElementById('Ascii_image').src =  Canvas2Image.saveAsPNG(canvas, true).getAttribute('src');
        /////20200330新增影片轉Ascii圖片
        document.getElementById('jscii-element-video').play();
    });
}
////////////////////20200331將生成的Ascii圖片組合成GIF
function creatAsciiGIF(){
    let video = document.getElementById('jscii-element-video');
    video.pause();
    video.currentTime = 0;
    video.load();
    let gif = new GIF({
        workers: 2,
        quality: 10,
        workerScript: './gif.worker.js' 
    });
    gif.on('finished', function (blob) {
        isWorking = false;
        let url = URL.createObjectURL(blob);
        gifData = blob;
        document.getElementById('Ascii_End_image').src = url;
        console.log('finished');
        // 
    });
    htmlToCanvas(document.getElementById('ascii-container-video'));
    video.onplay = function() {
        ///慢速生成相關圖片           
            gif.addFrame(document.getElementById('Ascii_image'));
            video.pause();
            htmlToCanvas(document.getElementById('ascii-container-video'));
    };
    video.onended  = function() {
        video.pause();
        console.log('結束');
        gif.render();
    };
}