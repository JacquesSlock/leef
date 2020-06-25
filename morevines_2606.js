
var canvas = document.getElementById('canvas');
document.onload = function(){
  function fitToContainer(canvas){
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
};
canvas.style.width ='100%';
canvas.style.height='100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
// canvas.scale = 0.05;
var ctx = canvas.getContext('2d');
var xx = document.getElementById("canvas").offsetWidth/2;
var yy = document.getElementById("canvas").offsetHeight/2;
// var xx = document.getElementById("container").width;
// var yy = document.getElementById("container").height;
console.log(xx);
console.log(yy);
var countSplits = 0;
var branches = [];
var branches1 = [];
var startbranches = [];
var levelBranch = [];
var levelToDraw = 0;
var darkTheme = true;

var nivReached1 = 8;
var nivReached2 = 8;
var nivReached3 = 8;
var nivReached4 = 4;
var nivReached5 = 8;
var nivReached6 = 8;
var nivReached7 = 8;
var nivReached8 = 5;
var partsToDraw = [nivReached1, nivReached2, nivReached3, nivReached4, nivReached5, nivReached6, nivReached7, nivReached8 ];


// increase to go faster
var t_incr = 0.03;
// increase for larger gaps
const t_start = 0.0;
// 180 can make whole turns
const max_rot_angle = 270;

// const varLength = window.height*window.offsetWidth/25000;
// const minLength = window.height*window.offsetWidth/25000;

console.log(document.getElementById("canvas").width/20);
const varLength = document.getElementById("canvas").width/15;
const minLength = document.getElementById("canvas").width/20;

const varSplits = 1;
const minSplits = 2;
ctx.font = "10px Arial";

const week = 9;
const levelReached = 1;
const divX = 2*xx/(week+1);
const divD = 360/week;

const aantalNieuweBranches = 1;

const blobSize = 2;

// const partsToDraw = week * levelReached;
var partsDrawn = 0;

// ctx.fillStyle = "url('img/connector-response-background-day.jpg')";
// ctx.fillRect(0, 0, xx*2, yy*2);


for (var i = 1; i <= week; i++) {
  startX = Math.random()*0-0/2;
  if(i<=4){
    //startY = yy + (Math.random()*yy - yy/2)  ;
    startY = 3*2*yy/5;
    startX = divX*2*i;
  }
  else{
    startY = yy/5;
    startX = divX*2*(i-4);
  }

  dirX = minLength/2 + Math.random()*varLength;
  dirY = minLength/2 + Math.random()*varLength;

  //dirX = 0;
  //dirY = -100;
  startbranches.push({
    points: [{x: startX, y: startY}, {x: startX, y: startY},
      {x: startX + dirX , y: startY + dirY },{x: startX + dirX + Math.random()*minLength, y: startY + dirY + Math.random()*minLength},],
    //direction: divD*i
    direction:  Math.random()*90
  })
};

// startbranches.push(
//   {
//   points: [{x: xx , y: yy*2}, {x: xx, y: yy*2},{x: xx, y: yy*2},{x: xx, y: yy*2-500},],
//   //direction: divD*i
//   direction: 0
//   }
// )
//
// startbranches.push(
//   {
//   points: [{x: xx , y: yy*2}, {x: xx, y: yy*2},{x: xx, y: yy*2},{x: xx, y: yy*2-500},],
//   //direction: divD*i
//   direction: 0
//   }
// )

levelBranch.push(startbranches[0]);

// Create gradient
// var grd = ctx.createRadialGradient(xx, yy, 0, xx, yy, yy);
// grd.addColorStop(0, "rgba(50,155,155,0.3)");
// grd.addColorStop(1, "rgba(255,255,255,0.3)");
//
// // Fill with gradient
//
// //var grd = makeGradient();
// ctx.fillStyle = grd;
// ctx.fillRect(0, 0, xx*2, yy*2);


// var lattice = [
//   // [{x: xx, y: yy}, {x: xx, y: yy}],
//   [{x: 0, y: 0}, {x: xx*2, y: 0}],
//   [{x: xx*2, y: 0}, {x: xx*2, y: yy*2}],
//   [{x: xx*2, y: yy*2}, {x: 0, y: yy*2}],
//   [{x: 0, y: yy*2}, {x: 0, y: 0}],
//   [{x: 0, y: yy}, {x: xx*2, y: yy}],
//   [{x: xx, y: 0}, {x: xx, y: yy*2}]
// ];


var lattice = [
  // [{x: xx, y: yy}, {x: xx, y: yy}],
  [{x: 0, y: 0}, {x: xx*2, y: 0}],
  [{x: xx*2, y: 0}, {x: xx*2, y: yy*2}],
  [{x: xx*2, y: yy*2}, {x: 0, y: yy*2}],
  [{x: 0, y: yy*2}, {x: 0, y: 0}],
  // [{x: 0, y: yy}, {x: xx*2, y: yy}],
  // [{x: xx, y: 0}, {x: xx, y: yy*2}]
];

var image = new Image();
image.onload = function() {
    ctx.drawImage(image,0,0, canvas.width, canvas.height);
  };

randomGrey =  Math.random()*5;
if(darkTheme==false){
  var darkThemeColor ='rgba('+(randomGrey+50)+', '+(randomGrey+50)+', '+(randomGrey+100)+', '+.5+')';
  var darkThemeColor_nt ='rgba('+(randomGrey+50)+', '+(randomGrey+50)+', '+(randomGrey+100)+', '+1+')';
  image.src = 'img/SAND_day.jpg';
}
else{
  var darkThemeColor ='rgba('+(randomGrey+200)+', '+(randomGrey+200)+', '+(randomGrey+250)+', '+.5+')';
  var darkThemeColor_nt ='rgba('+(randomGrey+200)+', '+(randomGrey+200)+', '+(randomGrey+250)+', '+1+')';
  image.src = 'img/SAND_night.jpg';
}

//ctx.lineWidth = 1;
ctx.strokeStyle = 'rgb(155, 155, 155)';
// ctx.strokeStyle = 'rgb(0, 0, 0)';
//drawFromTo(0, 0, xx*2, yy*2);



function animatedVines(ctx, branches, t) {



  // Draw b-spline segment for each branch
  var r,g,b = Math.random()*155+100;
  //ctx.strokeStyle = 'rgb('+t*255+', '+t*255+', '+t*255+')';

  var normalLineWidth = Math.random()*t_incr*(canvas.width/40)+t_incr+canvas.width/5000;
  //var normalLineWidth = 3;
  var extraPathNumber = Math.floor(Math.random()*Math.random()*7.5-3.75);


  for (var i in branches) {

      ctx.strokeStyle = darkThemeColor;
      if(i%4==0){
      ctx.lineWidth = normalLineWidth + Math.sin((t-0.2)*1.25*Math.PI)*2;
      }
      //console.log(ctx.lineWidth);
      var ax = (-branches[i].points[0].x + 3 * branches[i].points[1].x - 3 * branches[i].points[2].x + branches[i].points[3].x) / 6.;
      var ay = (-branches[i].points[0].y + 3 * branches[i].points[1].y - 3 * branches[i].points[2].y + branches[i].points[3].y) / 6.;
      var bx = (branches[i].points[0].x - 2 * branches[i].points[1].x + branches[i].points[2].x) / 2.;
      var by = (branches[i].points[0].y - 2 * branches[i].points[1].y + branches[i].points[2].y) / 2.;
      var cx = (-branches[i].points[0].x + branches[i].points[2].x) / 2.;
      var cy = (-branches[i].points[0].y + branches[i].points[2].y) / 2.;
      var dx = (branches[i].points[0].x + 4 * branches[i].points[1].x + branches[i].points[2].x) / 6.;
      var dy = (branches[i].points[0].y + 4 * branches[i].points[1].y + branches[i].points[2].y) / 6.;

      if(t<0.5){
        if(t>0.35&&t<0.35+t_incr){
          ctx.beginPath();
          //console.log(  ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx);
          drawColorBlob(ay, by, cy, dy, ax, bx, cx, dx, t)
          // ctx.arc(
          //   ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
          //   ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy,
          //   3,
          //   0,
          //   2 * Math.PI);
          ctx.fillStyle = darkThemeColor_nt;
          ctx.fill();
          ctx.fillText(partsDrawn,
          ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx+10,
          ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy+10);
        }
        ctx.strokeStyle = darkThemeColor;
        ctx.lineWidth = t*t;
      }
      ctx.beginPath();
      ctx.moveTo(
        ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
        ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
      );
      ctx.lineTo(
        ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx,
        ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy
      );
      const data = ctx.getImageData(ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
      ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy, 1, 1).data;
      //console.log(data);
      //ctx.lineWidth = Math.random()*2+.5;
      // ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.stroke();
      if(Math.floor(Math.random()*2)==1){
      drawSecondPath(ax, bx, cx, dx, ay, by, cy, dy, t, extraPathNumber, i);
      }
  }

  // If finished drawing branch
  if (t >= 1) {
    // Create new branch array

    countSplits=+.3;
    //var splits = Math.max(Math.floor(Math.random()*varSplits+minSplits),1);
    //var nsplits = splits - countSplits;
    var new_branches = [];
    for (var j in branches) {
      //var toSplit_boolean = Math.random() >= countSplits;

      var toSplit_boolean = true;
      //if (toSplit_boolean) {
        // Replace each existing branch with x branches
        for (var k = 0; k < 3; k++) {
          // Generate random length and direction
          var direction = branches[j].direction - (Math.random() * max_rot_angle - max_rot_angle/2);
          var length = Math.random() * varLength + minLength;
          //var length = 50;



          // Calculate new point
          var new_point = {
            x: branches[j].points[3].x + Math.sin(Math.PI * direction / 180) * length,
            y: branches[j].points[3].y - Math.cos(Math.PI * direction / 180) * length
          }
          // console.log(branches[j].points[1]);

          var distanceToLattice = 100000;
          for (var l in lattice) {
            var result = distancePointToLine(branches[j].points[3], lattice[l]);
            if (result < distanceToLattice) distanceToLattice = result;
          }
          // Add to new branch array
          new_branches.push({
            points: [
              branches[j].points[1],
              branches[j].points[2],
              branches[j].points[3],
              new_point
            ],
            direction: direction,
            distanceToLattice: distanceToLattice
          });
          // new_branches.push({
          //   points: [
          //     new_1,
          //     new_2,
          //     new_3,
          //     new_point
          //   ],
          //   direction: direction,
          //   distanceToLattice: distanceToLattice
          // });
          //sort is only needed voor lattices
          new_branches.sort(function(a, b) {
            return  a.distanceToLattice - b.distanceToLattice;
          });
          var index = 0;
          for (var i = 0; i < new_branches.length; i++) {
            // if(new_branches[i].distanceToLattice<minLength-varLength){
            //   new_branches.splice(i, 1);
            // }
            // if(new_branches[i].distanceToLattice<100){
            //   new_branches.splice(i, 1);
            // }
            //console.log(new_branches[i]);
            if(new_branches[i].points[3].x < 0 || new_branches[i].points[3].x > xx*2  || new_branches[i].points[3].y < 0 || new_branches[i].points[3].y > yy*2 ){
              if(new_branches.length > aantalNieuweBranches){
                new_branches.splice(i, 1);
              }

            }
          }
          //console.log();
          while (new_branches.length > aantalNieuweBranches) {
            // var ddx = (branches[i].points[0].x + 4 * branches[i].points[1].x + branches[i].points[2].x) / 6.;
            // var ddy = (branches[i].points[0].y + 4 * branches[i].points[1].y + branches[i].points[2].y) / 6.;

            // index++;
            //new_branches.shift()
            new_branches.pop();
          }
        }
    }
    // Start things off with the new set
    requestAnimationFrame(function() {
      partsDrawn++;
      animatedVines(ctx, new_branches, t_start);
    });

  // Not finished drawing the old set
} else if(partsDrawn<partsToDraw[levelToDraw]){
    requestAnimationFrame(function() {
      animatedVines(ctx, branches, t + t_incr);
    });
  }
  else if(partsDrawn>=partsToDraw[levelToDraw]){
    //return;
    levelToDraw++;
    // ctx.fillStyle = "rgba(255, 255, 255, 0.1)";;
    // ctx.fillRect(0, 0, xx*2, yy*2);
    if(levelToDraw<startbranches.length){
    partsDrawn = 0;
    levelBranch.pop();
    levelBranch.push(startbranches[levelToDraw]);
    animatedVines(ctx, levelBranch, t_start);
    }
    else{
      return;
    }
    }


}

// second path for aestethics
function drawSecondPath(ax, bx, cx, dx, ay, by, cy, dy, t, extraPathNumber, i){
  ctx.lineWidth = Math.random()*.5+1;
  if(t<0.5){
    ctx.strokeStyle = 'rgba('+(randomGrey+200)+', '+(randomGrey+200)+', '+(randomGrey+200)+', '+(0)+')';
  }
  else{
    ctx.strokeStyle = 'rgba('+(randomGrey+100)+', '+(randomGrey+100)+', '+(randomGrey+200)+', '+(Math.random())+')';
  }
  ctx.beginPath();
  ctx.moveTo(
    ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx + extraPathNumber,
    ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy+ extraPathNumber
  );
  ctx.lineTo(
    ax * Math.pow(t + 0.1, 3) + bx * Math.pow(t + 0.1, 2) + cx * (t + 0.1) + dx + extraPathNumber,
    ay * Math.pow(t + 0.1, 3) + by * Math.pow(t + 0.1, 2) + cy * (t + 0.1) + dy + extraPathNumber
  );
  //ctx.lineWidth = Math.random()*2+.5;
  // ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.stroke();
}

function distancePointToLine(point, line) {
  var L, r, s;

  // Length of line segment
  L = Math.sqrt(Math.pow(line[1].x - line[0].x, 2) +
    Math.pow(line[1].y - line[0].y, 2));

  // Calculate position of projection along line segment
  r = ((point.x - line[0].x) * (line[1].x - line[0].x) +
    (point.y - line[0].y) * (line[1].y - line[0].y))
    / Math.pow(L, 2);

  // Calculate distance of point to projection
  s = ((line[0].y - point.y) * (line[1].x - line[0].x) -
    (line[0].x - point.x) * (line[1].y - line[0].y))
    / Math.pow(L, 2);

  // If perpendicular projection on line segment
  if (r >= 0 && r <= 1) {
    return Math.abs(s) * L;

  // If off line segment
  } else {
    return Math.min(
      Math.sqrt(Math.pow(point.x - line[0].x, 2) + Math.pow(point.y - line[0].y, 2)),
      Math.sqrt(Math.pow(point.x - line[1].x, 2) + Math.pow(point.y - line[1].y, 2))
    );
  }
}

function drawFromTo(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.moveTo(
    x1,y1
  );
  ctx.lineTo(
    x2,y2
  );
  ctx.stroke();
}


window.addEventListener('resize', resize, false); // JQuery: $(window).resize(function() {...});

/**
 * Scale proportionally: If the width of the canvas > the height, the canvas height
 * equals the height of the browser window. Else, the canvas width equals the width of the browser window.
 * If the window is resized, the size of the canvas changes dynamically.
 */
function resize() {
    var ratio = canvas.width / canvas.height;
    var canvas_height = getElementById('container').innerHeight;
    var canvas_width = canvas_height * ratio;
    if(canvas_width>getElementById('container').innerWidth){
        canvas_width=getElementById('container').innerWidth;
        canvas_height=canvas_width/ratio;
    }

    canvas.style.width = canvas_width + 'px';
    canvas.style.height = canvas_height + 'px';
}

function drawVine(){
  animatedVines(ctx, branches, t_start);
}


function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return [o(r()*s),
      o(r()*s),
      o(r()*s),
      (r()-.2).toFixed(1)
    ];
}
//'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + (r()).toFixed(1) + ')';
function makeGradient(){
  var gradX = Math.random()*20+1;
  var gradY = Math.random()*20+1;
  var grd = ctx.createRadialGradient(gradX, gradY, 0,gradX,gradY, Math.random()*5+50);
  var rgba = random_rgba();
  var strRgba = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
  grd.addColorStop(0, strRgba);
  rgba[3]-=0.02;
  // strRgba = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
  // grd.addColorStop(.1, strRgba);
  // rgba[3]-=0.02;
  // strRgba = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
  // grd.addColorStop(.5, strRgba);
  // rgba[3]-=0.02;
  // strRgba = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
  // grd.addColorStop(.7, strRgba);
  rgba[3]-=0.7;
  strRgba = 'rgba(' + rgba[0] + ',' + rgba[1] + ',' + rgba[2] + ',' + rgba[3] + ')';
  grd.addColorStop(1, strRgba);
  return grd;
}

function drawColorBlob(ay, by, cy, dy, ax, bx, cx, dx, t){
  aTanDerivative = Math.atan((ay * Math.pow(t, 2) + by * t + cy)/(ax * Math.pow(t, 2) + bx * t + cx)
  );
  ctx.save();
  ctx.translate(ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
  ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy);
  ctx.rotate(Math.PI/2+aTanDerivative-+.3);
  ctx.beginPath();
  // var svg_X_pos = Math.round(ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx * 100) / 100;
  // var svg_Y_pos = Math.round(ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy * 100) / 100;
  // ctx.moveTo(
  //   ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + dx,
  //   ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + dy
  // );
  var p = drawBlob(ctx);
  //var grd = makeGradient();
  ctx.fillStyle = darkThemeColor_nt;
  ctx.fill(p);
  ctx.restore();
}



animatedVines(ctx, levelBranch, t_start);
