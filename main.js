img= ""
status = ""
objects = [];

function preload(){
    //img=loadImage('dog_cat.jpg')
}

function setup(){
    canvas = createCanvas(400, 300)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    video.size(400, 300)
}
function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML="Status : Detecting Objects"
}
function draw() {
    image(video, 0, 0, 640, 420)
    if(status !="")
    {
        r=random(255)
        g=random(255)
        b=random(255)
        objectDetector.detect(video, gotResult)
        for(i=0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : Object Detected";
        fill(r,g,b)
        percent=floor(objects[i].confidence * 100)
        text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15)
        noFill();
        stroke(r,g,b)
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        document.getElementById("number_of_objects").innerHTML= "# Of Objects:"+ objects.length
        if (objects[i].label == "person"){
            document.getElementById("number_of_objects").innerHTML="Baby Found"
        }
        else{
            document.getElementById("number_of_objects").innerHTML="BABY NOT FOUND!!!!!"
        }
        }
    }
}

function modelLoaded(){
    modelloaded="Model Loaded"
    console.log(modelloaded)
    status= true
}

function gotResult(error, results){
    if (error){
        console.error(error)
    }
    console.log(results)
    objects = results;
}

