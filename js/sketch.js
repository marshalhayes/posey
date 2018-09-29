let video;
let poses = [];
let skeletons = [];

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  const poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', function (results) {
    poses = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < poses.length; i++) {
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      let keypoint = poses[i].pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}

function modelLoaded() {
  console.log('Model Loaded!');
}