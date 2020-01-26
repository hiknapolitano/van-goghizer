const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const imgInput = document.getElementById("imgInput");

var selectedImg = new Image();
var form = document.getElementById("form");
var startBtn = document.getElementById("start");
startBtn.classList.add("invisible");
startBtn.addEventListener("click", vanGoghizeMe);
var animationId;
var strokes = [];
var vanGoghPalette = [	
    [18,63,119, 1],
    [15,134,182, 1]
	[55,202,229, 1],
	[245,219,55, 1],
    [251,239,203, 1],
    [120,144,168, 1],
    [0,0,0,1],
    [48,72,120, 1],
    [24,24,72, 1],
    [240,168,24],


]; //[[r,g,b,a], ...]

cvs.addEventListener("click", handleClick);

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

function approximateColorToPalette(color){

var dif = 256 * 4;
rightC = [];

vanGoghPalette.forEach(cfp => {

    color.forEach(e => {
        thisDif = 0;
        thisDif += Math.abs(e - cfp[0]);
        thisDif += Math.abs(e - cfp[1]);
        thisDif += Math.abs(e - cfp[2]);
        thisDif += Math.abs(e - cfp[3]);

        if(thisDif < dif){
            dif = thisDif;
            rightC = cfp;
        }
    });
})

return rightC;


}

function draw(){
    animationId = window.requestAnimationFrame(draw);

    for (let i = 0; i < 5000; i++) {
        var c = randomPoint();
        var thisColorApproximated = approximateColorToPalette(ctx.getImageData(c.x, c.y, 1, 1).data);
        var r = thisColorApproximated[0];
        var g = thisColorApproximated[1];
        var b = thisColorApproximated[2];
        var a = thisColorApproximated[3];
        new brushStroke(c, randomPoint(), randomRange(5, 25), randomRange(3, 8), `rgba(${r},${g},${b},${a})`);
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

function handleClick(){
    cancelAnimationFrame(animationId);
    setTimeout(() => {

        var dataURL = cvs.toDataURL("image/jpeg", 1.0);
        downloadImage(dataURL, 'my-canvas.jpeg');

    }, 800);
}

function downloadImage(data, filename = 'untitled.jpeg') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
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




