song1="";
song2="";
rightwristX=0;
rightwristY=0;
leftwristX=0;
leftwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
song1_status="";
song2_status="";

function preload(){
    song1=loadSound("SONG1.mp3");
    song2=loadSound("SONG2.mp3");
}

function setup(){
canvas=createCanvas(500,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelloaded);
posenet.on("pose", gotPoses);
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("leftwristX="+leftwristX+"leftwristY="+leftwristY);
    console.log("rightwristX="+rightwristX+"rightwristY="+rightwristY);
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log("scoreleftwrist="+scoreleftwrist);
    console.log("scorerightwrist="+scorerightwrist);
}
}

function draw(){
image(video,0,0,500,400);
song1_status=song1.isPlaying();
song2_status=song2.isPlaying();
fill("red");
stroke("blue");
if(scoreleftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    song1.stop();
    if(song2_status==false){
        song2.play();
        document.getElementById('song').innerHTML="SONG PLAYING : EK LADKI KO DEKHA TOH";
    }
}
if(scorerightwrist>0.2){
    circle(rightwristX,rightwristY,20);
    song2.stop();
    if(song1_status==false){
        song1.play();
        document.getElementById("song").innerHTML="SONG PLAYING : NAINA DA KYA KASOOR";
    }
}
}

 function playsong(){
     song.play();
     song.setVolume(1);
     song.rate(1);
}

 function modelloaded(){
     console.log("model Loaded");
}