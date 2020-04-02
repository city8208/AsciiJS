//20200331 方法獨立化
///使用說明：簡化後  只要直接呼叫 videoJsciiCovert( input=file讀取內容,'指定位置名稱'); 就可以直接顯示
var __awesome_qr_base_path = "js"; 
///20200301生成圖案
var type1 = 'video/webm; codecs="vp8, vorbis"';
var type2 = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var type3 = 'video/ogg; codecs="theora, vorbis"';
function JsciiCovert(FileObject,element,Picelement){
    ///取得檔案類型
    let nowLoadFileType = FileObject.value.split('.').pop();
    if(document.getElementById(Picelement)){
        document.getElementById(Picelement).innerHTML= ""; //清空先前暫存
    }
    if(nowLoadFileType == 'png' || nowLoadFileType == 'jpg' || nowLoadFileType == 'jpeg'){////檢測檔案格式(圖片)
    
        let img_Jscii = document.createElement("img");   // Create a <img> element
        img_Jscii.style.width = "150";
        img_Jscii.style.display = "none";
        img_Jscii.src = window.URL.createObjectURL(FileObject.files[0]);
        document.body.appendChild(img_Jscii); 
        /////////
        if(element){
            ////確認element是否存在,確認後往內部新增pre及輸出結果
            let img_Ascii = document.createElement("pre");   // Create a <img> element
            img_Ascii.style.backgroundColor =  'white';
            img_Ascii.style.fontFamily= 'monospace';
            img_Ascii.style.fontSize= '10px';
            img_Ascii.style.lineHeight= '6px';
            img_Ascii.style.fontWeight= 'bold';
            img_Ascii.style.color = '#000'; 
            img_Ascii.style.clear = 'left'; 
            img_Ascii.style.width = 'fit-content';
            img_Ascii.src = window.URL.createObjectURL(FileObject.files[0]);
            document.getElementById(element).appendChild(img_Ascii);
            let imgJscii = new Jscii({
                width: img_Jscii.style.width,
                ////color: true,
                el: img_Jscii,
                fn: function(str) {
                    img_Ascii.innerHTML = str;
                    document.body.removeChild(img_Jscii);
                    //////////20200321 新增Ascii轉圖片 Picelement = 輸出圖案位置 && 右鍵下載列表
                    if(Picelement){
                        htmlToCanvas(document.getElementById(element),document.getElementById(Picelement));
                    }
                    /////
                return 'imgCovert Finish'; ///轉換成功後回傳Finish
                }
            });
        }else{
            return 'error : element has not found'; ///錯誤,未檢測到指定物件
        }
    }else if(nowLoadFileType == 'mp4' || nowLoadFileType == 'ogg'){////檢測檔案格式(圖片)
        ///清除影片暫存
        if(document.getElementById('jscii-element-video')){
            document.body.removeChild(document.getElementById('jscii-element-video'));
        }
        /////
        let video_Jscii = document.createElement("video");   // Create a <video> element
        video_Jscii.id= "jscii-element-video";
        video_Jscii.muted = true;
        video_Jscii.controls = true;
        video_Jscii.loop = true;
        video_Jscii.style.width = "150";
        video_Jscii.style.display = "none";
        video_Jscii.src = window.URL.createObjectURL(FileObject.files[0]);
        document.body.appendChild(video_Jscii);
        video_Jscii.play(); 
        ///新增檔案類型判別sourse (三類)
        var source = document.createElement('source');   // Create a <source> element
        source.src = window.URL.createObjectURL(FileObject.files[0]);
        source.type = type1;
        video_Jscii.appendChild(source); 
        source.src = window.URL.createObjectURL(FileObject.files[0]);
        source.type = type2;
        video_Jscii.appendChild(source); 
        source.src = window.URL.createObjectURL(FileObject.files[0]);
        source.type = type3;
        video_Jscii.appendChild(source); 
        ////////////////
        /////////
        if(element){
            ////確認element是否存在,確認後往內部新增pre及輸出結果
            
            ////////////////////////////////////////////////////
            let video_Ascii = document.createElement("pre");   // Create a <img> element
            video_Ascii.style.backgroundColor =  'white';
            video_Ascii.style.fontFamily= 'monospace';
            video_Ascii.style.fontSize= '8px';
            video_Ascii.style.lineHeight= '6px';
            video_Ascii.style.fontWeight= 'bold';
            video_Ascii.style.color = '#000'; 
            video_Ascii.style.clear = 'left'; 
            video_Ascii.style.width = 'fit-content';
            document.getElementById(element).appendChild(video_Ascii);
            let videoJscii = new Jscii({
                ////color: true,
                height: video_Jscii.style.width,
                container: video_Ascii,
                el: video_Jscii,
            });
        }else{
            return 'error : element has not found'; ///錯誤,未檢測到指定物件
        }
    
    }

}////////////20200321新增Ascii轉換為圖片
function getPixelRatio(context){
    var backingStore = context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio || 1;
    return (window.devicePixelRatio || 1) / backingStore;
}
function htmlToCanvas(dom,output){
    output.innerHTML = '';
    let output_Canvas = document.createElement("img");   // Create a <img> element
    output_Canvas.style.width = "212px";
    output_Canvas.style.height = "215px";
    output.appendChild(output_Canvas); 
    /////
        ////20200402新增生成下載清單/右鍵觸發
        output.oncontextmenu  = function(){Downloader();return false;};
        let left_list = document.createElement("div");
        left_list.id ='DowloadList';
        left_list.classList = "ts vertical compact borderless menu";
        left_list.style.position = 'absolute';
        left_list.style.top = '0px';
        left_list.style.width = '110%';
        left_list.style.display = 'none';
        output.appendChild(left_list); 
        let left_list_jpg = document.createElement("a");
        left_list_jpg.classList = 'item';                            
        left_list_jpg.onclick = function(){funDownload('img','jpg',output_Canvas);};
        left_list_jpg.style.display ='';
        left_list_jpg.innerHTML ='<i class="picture icon"></i> 下載( jpg )';
        left_list.appendChild(left_list_jpg);
        let left_list_png = document.createElement("a");
        left_list_png.classList = 'item';
        left_list_png.onclick = function(){funDownload('img','png',output_Canvas);};
        left_list_png.style.display ='';
        left_list_png.innerHTML ='<i class="picture icon"></i> 下載( png )';
        left_list.appendChild(left_list_png);
        let left_list_html = document.createElement("a");
        left_list_html.classList = 'item';
        left_list_html.id = 'choiceItem_txt';
        left_list_html.onclick = function(){funDownload('file','html',dom);};
        left_list_html.innerHTML ='<i class="book icon"></i> 下載( html )';
        left_list.appendChild(left_list_html);
        //設置移出後清單自動消失
        left_list.onmouseout = function(){if(document.getElementById('DowloadList')){document.getElementById('DowloadList').style.display='none';}};
        left_list_jpg.onmousemove = function(){if(document.getElementById('DowloadList')){document.getElementById('DowloadList').style.display='';}};
        left_list_png.onmousemove = function(){if(document.getElementById('DowloadList')){document.getElementById('DowloadList').style.display='';}};
        left_list_html.onmousemove = function(){if(document.getElementById('DowloadList')){document.getElementById('DowloadList').style.display='';}};
        ///////
        /////
    var shareContent = dom;// 獲取內容，請記得使用固定寬度，勿使用比例寬度
    var width = shareContent.offsetWidth+100;  // 獲取元件寬度
    var height = shareContent.offsetHeight; // 獲取元件高度
    var offsetTop = shareContent.offsetTop+300;  //取得offset距離
    //alert(width);
    var canvas = document.createElement('canvas');  //建立canvas
    var context = canvas.getContext('2d');
    var scaleBy = this.getPixelRatio(context);  //取得像素密度
    canvas.width = width * scaleBy ;   //設定寬度及偏移
    canvas.height = (height + offsetTop) * scaleBy;  // 設定高度及偏移
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
        output_Canvas.src =  Canvas2Image.saveAsPNG(canvas, true).getAttribute('src');
    });


}