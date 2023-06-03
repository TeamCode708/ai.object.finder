var object_status = "";
var objectDetector = "";
var objects = [];
var object_input = "";
function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 300);
    video.hide();
}
function start() {
    object_input = document.getElementById("object_input").value;
    if (object_input == "") {
        alert("KINDLY ENTER THE OBJECT NAME TO FIND!!");
    }
    else {
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        document.getElementById("object_status").innerHTML = "Status : Detecting Objects";
    }
}
function modelLoaded() {
    console.log("model loaded");
    object_status = true;
}
function draw() {
    image(video, 0, 0, 400, 300);
    if (object_status != "") {
        objectDetector.detect(video, gotResult); 
        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == object_input) {
                document.getElementById("object_status").innerHTML = "Status : Objects Detected";
                document.getElementById("found_status").innerHTML = object_input + " found";
                percent = floor(objects[i].confidence * 100);
                fill('#ff0000');
                text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
                noFill();
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
            else {
                document.getElementById("object_status").innerHTML = "Status : Objects Detected";
                document.getElementById("found_status").innerHTML = object_input + " not found";
                alert("The object name you entered might not be present in the CoCoSSD Model. Refresh the page and try searching with other name.");
            }
        }
    }
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    }
    objects = results;
    console.log(objects);
}