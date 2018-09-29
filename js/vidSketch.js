const v = function(s) {
  let video;
  let poses = [];
  let skeletons = [];

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent("#videobox");

    video = s.createCapture(s.VIDEO);
    video.size(s.width, s.height);
    video.hide();

    const poseNet = ml5.poseNet(video, s.modelLoaded);
    poseNet.on('pose', function (results) {
      poses = results;
    });
  }

  s.draw = function() {
    s.image(video, 0, 0, s.width, s.height);

    for (let i = 0; i < poses.length; i++) {
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let keypoint = poses[i].pose.keypoints[j];
        let score = s.round(keypoint.score * 255);
        s.fill(0, score, 0)
        s.noStroke();
        s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        if (poses[i].pose.keypoints[j].score > 0.70) {
            s.stroke(0, 255, 0);
        } else if (poses[i].pose.keypoints[j].score > 0.40) {
            s.stroke(0, 127, 127);
        } else {
            s.stroke(255, 0, 0);
        }
        s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
  }
}

const vidGame = new p5(v);
