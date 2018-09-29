const v = function(s) {
  let video;
  let poses = [];
  let skeletons = [];

  s.setup = function() {
    s.createCanvas(640, 480);

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
        if (keypoint.score > 0.2) {
          s.fill(255, 0, 0);
          s.noStroke();
          s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
        }
      }
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        s.stroke(255, 0, 0);
        s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      }
    }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
  }
}

const vidGame = new p5(v);
