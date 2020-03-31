//20200331 方法獨立化
///使用說明：簡化後  只要直接呼叫 videoJsciiCovert( input=file讀取內容,'指定位置名稱'); 就可以直接顯示

///20200301生成圖案
var type1 = 'video/webm; codecs="vp8, vorbis"';
var type2 = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var type3 = 'video/ogg; codecs="theora, vorbis"';
function JsciiCovert(FileObject,element){
    ///取得檔案類型
    let nowLoadFileType = FileObject.value.split('.').pop();
    document.getElementById(element).innerHTML= ""; //清空先前暫存
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
            img_Ascii.style.lineHeight= '3px';
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

}