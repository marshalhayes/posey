let videoPoses = [];
let imagePoses = [];

const v = function(s) {
  let video;

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent(videobox);

    video = s.createCapture(s.VIDEO);
    video.size(s.width, s.height);
    video.hide();

    const poseNet = ml5.poseNet(video, s.modelLoaded);
    poseNet.on('pose', function (results) {
      videoPoses = results;
    });
  }

  s.draw = function() {
    s.image(video, 0, 0, s.width, s.height);

    for (let i = 0; i < videoPoses.length; i++) {
      for (let j = 0; j < videoPoses[i].pose.keypoints.length; j++) {
        let keypoint = videoPoses[i].pose.keypoints[j];
        let score = s.round(keypoint.score * 255);
        s.fill(255 - score, score, 0);
        s.noStroke();
        s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
      for (let j = 0; j < videoPoses[i].skeleton.length; j++) {
        let partA = videoPoses[i].skeleton[j][0];
        let partB = videoPoses[i].skeleton[j][1];
        let score = videoPoses[i].pose.keypoints[j].score * 255
    		s.stroke(255 - score, score, 0);
        s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
  }
}

const p = function(s) {
  let video;
  let imageJSON;
  let images = {}
  let poseNet;

  s.preload = function() {
    s.loadJSON('http://localhost:8080/js/images.json', function(data) {
      for (let i = 0; i < data["images"].length; i++) {
        s.loadImage(data["images"][i], function(x) {
          images[data["images"][i]] = x;
        });
      }
      // Select a rnndom images from the loaded images
      img.src = s.random(data["images"]);
    });
  }

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent("#imagebox");
    poseNet = ml5.poseNet(s.modelLoaded);
  }

  s.draw = function() {
    s.background(images[img.src]);
    // s.image(images[img.src], 0, 0, images[img.src].width, images[img.src].height);
    for (let i = 0; i < imagePoses.length; i++) {
      for (let j = 0; j < imagePoses[i].pose.keypoints.length; j++) {
        let keypoint = imagePoses[i].pose.keypoints[j];
        if (keypoint.score > 0.2) {
          let score = s.round(keypoint.score * 255);
          s.fill(255 - score, score, 0);
          s.noStroke();
          s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
      for (let j = 0; j < imagePoses[i].skeleton.length; j++) {
        let partA = imagePoses[i].skeleton[j][0];
        let partB = imagePoses[i].skeleton[j][1];
        let keypoint = imagePoses[i].pose.keypoints[j]
        if (keypoint.score > 0.2) {
          let score = s.round(keypoint.score * 255);
          s.stroke(255 - score, score, 0);
          s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
      }
    }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
    detectPoses();
  }

  async function detectPoses() {
    imagePoses = await poseNet.singlePose(img);
  }
}