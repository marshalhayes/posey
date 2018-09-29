let img = document.getElementById('img');

const p = function(s) {
  let video;
  let imageJSON;
  let images = {}
  let poseNet;
  let poses = [];
  let skeletons = [];

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

    for (let i in images) {
      let imgRatio = images[i].width / images[i].height;
      let canvasRatio = s.width / s.height;
      if (imgRatio >= canvasRatio) {
        let k = s.height / images[i].height;
        images[i].resize(images[i].height * k, images[i].width * k);
      }
      else {
        let k = s.width / images[i].width;
        images[i].resize(images[i].height * k, images[i].width * k);
      }
    }
  }

  s.draw = function() {
    s.image(images[img.src], 0, 0, images[img.src].width, images[img.src].height);
    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let keypoint = poses[i].pose.keypoints[j];
        if (keypoint.score > 0.2) {
          let score = s.round(keypoint.score * 255);
          s.fill(255 - score, score, 0);
          s.noStroke();
          s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        let keypoint = poses[i].pose.keypoints[j]
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
    poses = await poseNet.singlePose(img);
  }
}

const imgGame = new p5(p);
