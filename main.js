video = "";
status = "";
objects = [];

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status != "") {
        object_detector.detect(video, gotresult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("display").innerHTML = "Status : Object Detected";
            document.getElementById("no_obj").innerHTML = "Number of objects detected are " + objects.length;
            fill("blue");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("blue");
            rect(objects[i].x, objects[i].y, objects[i].height, objects[i].width);
        }
    }

}

function gotresult(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}

function start() {
    object_detector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("display").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}