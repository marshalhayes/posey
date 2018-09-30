let videoPoses = [];
let imagePoses = [];

let averageDeviation = 0;

const v = function(s) {
  let video;
  let options = {
  	imageScaleFactor: 0.3,
  	outputStride: 16,
  	flipHorizontal: false,
  	minConfidence: 0.20,
  	maxPoseDetections: 3,
  	scoreThreshold: 0.6,
  	nmsRadius: 20,
  	detectionType: 'single',
  	multiplier: 0.75
	}

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent(videobox);

    video = s.createCapture(s.VIDEO);
    video.size(s.width, s.height);
    video.hide();

    const poseNet = ml5.poseNet(video, options, s.modelLoaded);
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

        switch (keypoint.part) {
          case 'rightEye':
            for (let x = 0; x < imagePoses.length; x++) {
              for (let y = 0; y < imagePoses[x].pose.keypoints.length; y++) {
                let imgKeypoint = imagePoses[x].pose.keypoints[y];
                if (imgKeypoint.part == "rightEye") {
                  // If the part is a righteye..., check the pixel location of the video rightEye and compare
                  // let xDeviation = imgKeypoint.position.x - keypoint.position.x;
                  // let yDeviation = imgKeypoint.position.y - keypoint.position.y;
                  // averageDeviation += (xDeviation + yDeviation);
                  // averageDeviation = averageDeviation / imagePoses.length;
                  if ((imgKeypoint.position.x - keypoint.position.x) < 10 && (imgKeypoint.position.y - keypoint.position.y) < 10) {
                    alert("You win!");
                  }
                }
              }
            }
            break;
          default:
        }
      }
      for (let j = 0; j < videoPoses[i].skeleton.length; j++) {
        let partA = videoPoses[i].skeleton[j][0];
        let partB = videoPoses[i].skeleton[j][1];
        let score = videoPoses[i].pose.keypoints[j].score * 255;
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
  let img = document.getElementById('img');
  let imageJSON;
  let images = {}
  let poseNet;

  s.preload = function() {
    s.loadJSON('./js/images.json', function(data) {
      for (let i = 0; i < data["images"].length; i++) {
        s.loadImage(data["images"][i], function(x) {
          images[data["images"][i]] = x;
        });
      }
      // Select a random images from the loaded images
      img.src = s.random(data["images"]);
    });
  }

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent("#imagebox");
    poseNet = ml5.poseNet(s.modelLoaded);

    for (let i in images) {
      images[i].resize(500, 375);
    }
  }

  s.draw = function() {
    s.background(images[img.src]);
    // s.image(images[img.src], 0, 0, s.width, s.height);
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
    detectPoses();
  }

  async function detectPoses() {
    imagePoses = await poseNet.singlePose(img);
  }
}
