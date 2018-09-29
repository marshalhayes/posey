const p = function(s) {
  let video;
  let imageUrls = ["assets/images/man-screaming.jpg", "assets/images/pexels-photo-270968.jpeg",
                  "assets/images/pexels-photo-415212.jpeg"];
  let images = [];
  let poses = [];
  let skeletons = [];

  s.preload = function() {
    for (let i = 0; i < imageUrls.length; i++) {
      images[i] = s.loadImage(`http://localhost:8080/${imageUrls[i]}`);
    }
  }

  s.setup = function() {
    s.createCanvas(640, 480);

    const poseNet = ml5.poseNet(s.modelLoaded);
    console.log(poseNet.multiPose(images[0]));
    // poseNet.on('pose', function (results) {
    //   poses = results;
    // });
    // console.log(poseNet);
  }

  s.draw = function() {
    s.background(images[0]);
    // for (let i = 0; i < poses.length; i++) {
    //   for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
    //     let keypoint = poses[i].pose.keypoints[j];
    //     if (keypoint.score > 0.2) {
    //       s.fill(255, 0, 0);
    //       s.noStroke();
    //       s.ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    //     }
    //   }
    //   for (let j = 0; j < poses[i].skeleton.length; j++) {
    //     let partA = poses[i].skeleton[j][0];
    //     let partB = poses[i].skeleton[j][1];
    //     s.stroke(255, 0, 0);
    //     s.line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    //   }
    // }
  }

  s.modelLoaded = function() {
    console.log('Model Loaded!');
  }
}

const imgGame = new p5(p);
