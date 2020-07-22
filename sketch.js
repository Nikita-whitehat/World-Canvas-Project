var canavs;
var database;

var drawing = [];
var currentPath = [];

function setup() {

    canvas = createCanvas(window.innerWidth, window.innerHeight);

    database = firebase.database();

    canvas.parent('canvascontainer');
    canvas.mousePressed(startPath);

    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);
   
       
    
  

    background("purple");

    //  var ref = database.ref('drawing');
    //  ref.on("value",gotData,errData);
   
}

function startPath() {
   currentPath = [];
   drawing.push(currentPath);
}

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    currentPath.push(point);
    
}

function draw() {
    
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        
        for(var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y);
        }

        endShape();
    }

}


function saveDrawing() {
    var drawingRef = database.ref('drawing')

    var data={
        name: "Nikita",
        drawing :drawing
    }
   
    drawingRef.push(data);
}


// function gotData(data) {
//    var drawings = data.val();

// }

// function errData(err) {
//   console.log(err);
// }

function clearDrawing() {

    drawing=[];
    
    var ref = database.ref('drawing');
    ref.remove();

    background("purple");
}
