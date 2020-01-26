const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const imgInput = document.getElementById("imgInput");

var selectedImg = new Image();
var form = document.getElementById("form");
var startBtn = document.getElementById("start");
startBtn.classList.add("invisible");
startBtn.addEventListener("click", vanGoghizeMe);

var strokes = [];


class brushStroke {
    
constructor(center, dir, w, s, color){
    this.center = center;
    this.direction = dir;
    this.width = w;
    this.size = s;
    this.color = color;
}

    

}

function vanGoghizeMe(e){
    e.preventDefault();



    
}

function feedImgObject(e) {
   
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    selectedImg = new Image();
    selectedImg.src = url;
    selectedImg.onload = function() {
        startBtn.classList.remove("invisible");
        ctx.drawImage(selectedImg, 0, 0, selectedImg.width, selectedImg.height, 0, 0, cvs.width, cvs.height);

    }
  }




