song = ""
song2 = ""
song_status = ""

leftWristX = 0
leftWristY = 0

scoreleftWrist = 0
scorerightWrist = 0

rightWristX = 0
rightWristY = 0

function preload(){
    song = loadSound("music.mp3")
    song2= loadSound("music.mp3")
}


function play(){
    song.play()
}
function stopHariPuttar(){
    song.pause()
}

function setup(){
  canvas = createCanvas(600,450);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video,modelLoaded)

  posenet.on("pose",gotPoses)
}

function gotPoses(results){
    if (results.length > 0){
        scoreleftWrist = results[0].pose.keypoints[9].score;
    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        scorerightWrist = results[0].pose.keypoints[10].score;
    
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log(scoreleftWrist+","+scorerightWrist);
        console.log("left Wrist x,y = "+leftWristX+","+leftWristY)
        console.log("right Wrist x,y = "+rightWristX+","+rightWristY)
    }
}


function modelLoaded(){
    console.log("Posenet Initialized!");

}

function draw(){
    image(video,0,0,600,450);

    fill("#FF0000");
    stroke("#FF0000");

    
    song_status = song.isPlaying()
    song2_status = song2.isPlaying()

    if(scoreleftWrist > 0.2){

        circle(leftWristX,leftWristY,20)
        song2.stop()
       
        if(song_status == false){
            song.play()
            document.getElementById("heading").innerHTML = "Song: Left Song"
        }
    
    }

    if(scorerightWrist > 0.2){

        circle(rightWristX,rightWristY,20)
        song.stop()
       
        if(song2_status == false){
            song2.play()
            document.getElementById("heading").innerHTML = "Song: Right Song"
        }
    
    }
    
}

