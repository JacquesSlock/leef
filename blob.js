function create(root) {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("touch-action", "none");
  root.appendChild(canvas);

  const resize = function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();
  return canvas;
}

function getRandomArbitrary(min, max) {
  const amount = Math.random() * (max - min) + min;
  const sign = Math.random() < 0.4 ? -1 : 1;
  return sign * amount;
}

function random(min, max) {
  const amount = Math.random() * (max - min) + min;
  return Math.round(amount);
}

function getCirclePoints(base, radius) {
  //let angles = [0, 45, 90, 135, 180, 225, 270, 315]; // randomize gaps (360 omitted)
  var corners = Math.floor(Math.random()*5)+2;
  //var corners = 2;
  var degrees = 360/corners;
  var angles = [];
  for (var i = 0; i < corners; i++) {
    //angles.push(random(degrees*i, degrees*(i+1) - degrees/2));
    angles.push(degrees*i);
  }

  //let angles = [0, 90, 180, 270]; // randomize gaps (360 omitted)

  // angles = [
  //   random(0, 90 - 45),
  //   random(90, 180 - 45),
  //   random(180, 270 - 45),
  //   random(270, 360 - 45)
  // ];
  const positions = [];
  for (let a in angles) {
    const angle = (angles[a] * Math.PI) / 180;
    let ba = ((angles[a] - 20) * Math.PI) / 180;
    let rr = radius + getRandomArbitrary(blobSize/5, blobSize/2.5);
    positions.push({
      x: base.x + radius * Math.sin(angle),
      y: base.y + radius * Math.cos(angle),
      mx: base.x + rr * Math.sin(ba),
      my: base.y + rr * Math.cos(ba)
    });
  }
  //console.log(positions[0]);
  positions.push(positions[0]);
  return positions;
}

function drawPath(ctx, points) {
  let cpath = `M${points[0].x},${points[1].y}`;
  for (let point of points)
    cpath += `S${point.mx},${point.my},${point.x},${point.y}`;
  cpath += "Z";
  let p = new Path2D(cpath);
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillStyle = "rgb(229, 244, 216)";
  return p;
}

function drawBlob(ctx) {
  let points = getCirclePoints({ x: 0, y: 0 }, blobSize);
  var p = drawPath(ctx, points);
  return p;
}

// const canvas = create(document.body);
// const ctx = canvas.getContext("2d");
