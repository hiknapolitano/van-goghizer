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
        strokes.push(this);
    }

    

}


function randomPoint() {

    var x = Math.floor(Math.random() * cvs.width);
    var y = Math.floor(Math.random() * cvs.height);
    return {x, y};

}

function randomRange(min, max){
    return Math.floor(Math.random() * max + min);
}

function vanGoghizeMe(e){
    e.preventDefault();
    draw();
}

function draw(){
    window.requestAnimationFrame(draw);

    for (let i = 0; i < 50; i++) {
        var c = randomPoint();
        var thisColor = ctx.getImageData(c.x, c.y, 1, 1).data;
        var r = thisColor[0];
        var g = thisColor[1];
        var b = thisColor[2];
        var a = thisColor[3];
        new brushStroke(c, randomPoint(), randomRange(5, 19), randomRange(4, 14), `rgba(${r},${g},${b},${a})`);
        //console.log(ctx.getImageData(c.x, c.y, 1, 1).data);
        
    }

    //ctx.clearRect(0,0,cvs.width,cvs.height);

    strokes.forEach(s => {
        ctx.beginPath();
        ctx.ellipse(s.center.x, s.center.y, s.size/2, s.width/2, 0, 0, randomRange(0, 2 * Math.PI));
        ctx.fillStyle = s.color;
        ctx.fill();
    });

}


function feedImgObject(e) {
   
    var URL = window.webkitURL || window.URL;
    var url = URL.createObjectURL(e.target.files[0]);
    selectedImg = new Image();
    selectedImg.src = url;
    selectedImg.onload = function() {
        startBtn.classList.remove("invisible");
        cvs.width = selectedImg.width;
        cvs.height = selectedImg.height;
        ctx.drawImage(selectedImg, 0, 0, selectedImg.width, selectedImg.height);

    }
  }




