const cvs = document.getElementById("cvs");
const ctx = cvs.getContext("2d");
const imgInput = document.getElementById("imgInput");

const cvs2 = document.createElement("canvas");
const ctx2 = cvs2.getContext("2d");

var selectedImg = new Image();
var form = document.getElementById("form");
var startBtn = document.getElementById("start");
startBtn.classList.add("invisible");
startBtn.addEventListener("click", vanGoghizeMe);
var animationId;
var strokes = [];
var vanGoghPalette = [	
    [18,63,119, 1],
    [204, 49, 3, 1],
    [167, 90, 22, 1],
    [215, 164, 75, 1],
    [84, 117, 100, 1],
    [195, 195, 143],
    [63, 90, 73],
    [228, 198, 24, 1],
    [181, 138, 83],
    [15,134,182, 1]
	[55,202,229, 1],
	[245,219,55, 1],
    [251,239,203, 1],
    [0,0,0,1],
    [48,72,120, 1],
    [24,24,72, 1],
    [240,168,24],
    [173,32,4, 1],
    [235,183,61, 1],
    [157,139,27, 1],
    [141,73,8, 1],
    [101,175,26, 1]
//TODO: LOAD PALETTE FROM VAN GOGH'S ACTUAL PAINTINGS IN PNG!

]; 

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
    ctx.clearRect(0,0,cvs.width,cvs.height);
    draw();
}

function colorDifference (r1, g1, b1, r2, g2, b2) {
    var sumOfSquares = 0;

    sumOfSquares += Math.pow(r1 - r2, 2);
    sumOfSquares += Math.pow(g1 - g2, 2);
    sumOfSquares += Math.pow(b1 - b2, 2);
    
    return Math.sqrt(sumOfSquares);
}

function approximateColorToPalette(color){

var dif = 10000000;
rightC = [];

vanGoghPalette.forEach(cfp => {

        thisDif = 0;
        thisDif = colorDifference(color[0], cfp[0], color[1], cfp[1], color[2], cfp[2])

        if(thisDif < dif){
            dif = thisDif;
            rightC = cfp;
        }

})

return  rightC;


}

var frameCount = 0;

function draw(){
    animationId = window.requestAnimationFrame(draw);
    frameCount++;
    console.log(frameCount);
    if(frameCount > 60){
        cancelAnimationFrame(animationId);
        console.log("chega");
    }

        for (let i = 0; i < 600; i++) {

            var c = randomPoint();
            //var c = {x: i, y: j};
            var thisColorApproximated = approximateColorToPalette(ctx2.getImageData(c.x, c.y, 1, 1).data);
            var r = thisColorApproximated[0];
            var g = thisColorApproximated[1];
            var b = thisColorApproximated[2];
            var a = thisColorApproximated[3];
            // console.log(thisColorApproximated);
            new brushStroke(c, randomPoint(), randomRange(2, 20), randomRange(2, 7), `rgba(${r},${g},${b},${a/20})`);
            //console.log(ctx.getImageData(c.x, c.y, 1, 1).data);
            
        }

    


    //ctx.clearRect(0,0,cvs.width,cvs.height);

    strokes.forEach(s => {
        ctx.beginPath();
        ctx.ellipse(s.center.x, s.center.y, s.size/2, s.width/2, randomRange(0, Math.PI/3), 0, randomRange(0, 2 * Math.PI));
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
        cvs2.width = selectedImg.width;
        cvs2.height = selectedImg.height;
        ctx2.drawImage(selectedImg, 0, 0, selectedImg.width, selectedImg.height);
        ctx.drawImage(selectedImg, 0, 0, selectedImg.width, selectedImg.height);

    }
  }




