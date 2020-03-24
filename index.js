///20200301生成圖案
function imgJsciiCovert(){
    ///document.getElementById('ascii-container-image').style.font = 'bold 8px/1.5px monospace; color: #000; clear: left;';
    document.getElementById('ascii-container-image').style.backgroundColor =  'white';
    document.getElementById('ascii-container-image').style.fontFamily= 'monospace';
    document.getElementById('ascii-container-image').style.fontSize= '10px';
    document.getElementById('ascii-container-image').style.lineHeight= '3px';
    document.getElementById('ascii-container-image').style.fontWeight= 'bold';
    document.getElementById('ascii-container-image').style.color = '#000'; 
    document.getElementById('ascii-container-image').style.clear = 'left'; 
    document.getElementById('ascii-container-image').style.width = 'fit-content';
    let imgJscii = new Jscii({
        width: document.getElementById('jscii-element-image').style.width,
        ////color: true,
        el: document.getElementById('jscii-element-image'),
        fn: function(str) {
          document.getElementById('ascii-container-image').innerHTML = str;
        }
      });
      
}
////20200313生成影片
function videoJsciiCovert(){
        ///document.getElementById('ascii-container-video').style.font = 'bold 8px/6px monospace; color: #000; clear: left;';
        document.getElementById('ascii-container-video').style.backgroundColor =  'white';
        document.getElementById('ascii-container-video').style.fontFamily= 'monospace';
        document.getElementById('ascii-container-video').style.fontSize= '8px';
        document.getElementById('ascii-container-video').style.lineHeight= '6px';
        document.getElementById('ascii-container-video').style.fontWeight= 'bold';
        document.getElementById('ascii-container-video').style.color = '#000'; 
        document.getElementById('ascii-container-video').style.clear = 'left'; 
        document.getElementById('ascii-container-video').style.width = 'fit-content';
		let videoJscii = new Jscii({
            ////color: true,
            height: document.getElementById('jscii-element-video').style.width,
			container: document.getElementById('ascii-container-video'),
			el: document.getElementById('jscii-element-video')
        });
}
var type1 = 'video/webm; codecs="vp8, vorbis"';
var type2 = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var type3 = 'video/ogg; codecs="theora, vorbis"';
////20200304讀取上傳圖片 || Folder檔案
var nowLoadFile ="";
var nowLoadFileType ="";
function filecheck(FileURL){
    nowLoadFileType = FileURL.value.split('.').pop();
    ///alert(FileURL.value.split('.').pop());
    if(nowLoadFileType == 'png' || nowLoadFileType == 'jpg' || nowLoadFileType == 'jpeg'){////檢測檔案格式(圖片)
        document.getElementById('videoSet').innerHTML= "";
        document.getElementById('picSet').innerHTML = '<img width="150" id="jscii-element-image" src="'+window.URL.createObjectURL(FileURL.files[0])+'" style="display:none"><pre id="ascii-container-image" style="background-color: white;"></pre>';
        imgJsciiCovert();
    }else if(nowLoadFileType == 'mp4' || nowLoadFileType == 'ogg'){////檢測檔案格式(圖片)
        document.getElementById('picSet').innerHTML= "";
        document.getElementById('videoSet').innerHTML = document.getElementById('videoSet').innerHTML = '<video id="jscii-element-video" width="5" style="position: absolute;"  muted="true" controls autoplay loop><source src="'+window.URL.createObjectURL(FileURL.files[0])+'" type='+"'"+type1+"'"+' /><source src="'+window.URL.createObjectURL(FileURL.files[0])+'" type='+"'"+type2+"'"+' /><source src="'+window.URL.createObjectURL(FileURL.files[0])+'" type='+"'"+type3+"'"+' />Your browser does not support video</video><div></div><pre id="ascii-container-video" style="background-color: white;"></pre>';
        videoJsciiCovert();
    }    
}
