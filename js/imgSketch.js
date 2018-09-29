const p = function(s) {
  let video;
  let imageUrls = ["assets/images/man-screaming.jpg", "assets/images/pexels-photo-270968.jpeg",
                  "assets/images/pexels-photo-415212.jpeg"];
  let images = [];
  let img;
  let poses = [];
  let skeletons = [];

  s.preload = function() {
    for (let i = 0; i < imageUrls; i++) {
      images[i] = s.loadImage(imageUrls[i]);
    }
  }

  s.setup = function() {
    let canvas = s.createCanvas(500, 375);
    canvas.parent("#imagebox");

    const poseNet = ml5.poseNet(s.modelLoaded);

    // Create an <img> and attach a random url to it
    img = s.createImg(s.random(imageUrls));
    img.hide();
  }

  s.draw = function() {
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

const imgGame = new p5(p);
