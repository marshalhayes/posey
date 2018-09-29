let img = document.getElementById('img');

const p = function(s) {
  let video;
  let imageJSON;
  let images = {}
  let poseNet;
  let poses = [];
  let skeletons = [];

  s.preload = function() {
    imageJSON = s.loadJSON('http://localhost:8080/js/images.json');
  }

  s.setup = function() {
    for (let i = 0; i < imageJSON["images"].length; i++) {
        images[`${imageJSON["images"][i]}`] = s.loadImage(`${imageJSON["images"][i]}`);
    }

    let canvas = s.createCanvas(500, 375);
    canvas.parent("#imagebox");

    console.log(images);

    poseNet = ml5.poseNet(s.modelLoaded);

    // Create an <img> and attach a random url to it
    img.src = s.random(imageUrls);
  }

  s.draw = function() {
    s.background(images[img.src]);
    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let keypoint = poses[i].pose.keypoints[j];
        if (keypoint.score > 0.5) {
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
        let score = s.round(keypoint.score * 255);
        s.stroke(255 - score, score, 0);
        s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
    detectPoses();
  }

  async function detectPoses() {
    poses = await poseNet.multiPose(img);
    console.log(poses);
  }
}

const imgGame = new p5(p);
