var video = "";
var object_status = "";
var found_status = "";
var objectDetector = "";
function preload() {
    //video = createVideo("video.mp4");
    video.hide();
}
function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 400, 300);
}
function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("object_status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded() {
    console.log("model loaded");
    object_status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}