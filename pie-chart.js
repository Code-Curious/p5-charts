function PieChart(x, y, diameter) {

  this.x = x;
  this.y = y;
  this.diameter = diameter;
  this.labelSpace = 30;

  this.get_radians = function(data) {
    var total = sum(data);
    var radians = [];

    for (let i = 0; i < data.length; i++) {
      radians.push((data[i] / total) * TWO_PI);
    }

    return radians;
  };

  this.draw = function(data, labels, colours, title) {

    push(); 

    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
        Labels (length: ${labels.length})
        Colours (length: ${colours.length})
        Arrays must be the same length!`);
    }
  
    var angles = this.get_radians(data);
    var lastAngle = 0;
    var colour;

    // get mouse distance and angle on every frame 
    let mouseDist = dist(this.x, this.y, mouseX, mouseY);
    let mouseAngle = this.getMouseAngle();

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      noStroke();

      arc(this.x, this.y,
          this.diameter, this.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); 

      if (labels) {
        this.makeLegendItem(labels[i], i, colour);
      }

      // handle mouse hover
      let isCursorDistanceOnChart = mouseDist < this.diameter;
      let isCursorAngleOnCurrentSlice = mouseAngle >= lastAngle && mouseAngle < lastAngle + angles[i] + 0.001;

      if(isCursorDistanceOnChart && isCursorAngleOnCurrentSlice) {
        push()
        stroke(0);
        strokeWeight(2);
        textSize(40);
        fill(colour);
        text(data[i] + " %", this.x - 400, this.y - (this.diameter *0.6) + 200 ); 
        pop();
      }

      lastAngle += angles[i];
    }

  //make the chart title
    if (title) {
      noStroke();
      textAlign('center', 'center');
      fill('#355070');
      textSize(24);
      textStyle(BOLDITALIC);
      text(title, this.x, this.y-300);
    }
    pop();
  };

  //draw each label box
  this.makeLegendItem = function(label, i, colour) {
    var x = this.x + 50 + this.diameter / 2;
    var y = this.y + (this.labelSpace * i) - this.diameter / 3;
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    fill(colour);
    stroke(0);
    strokeWeight(1);
    rect(x, y, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(20);
    text(label, x + boxWidth + 10, y + boxWidth / 2);
  };
  
  //handle mouse angle
  this.getMouseAngle = function() {
    let angle = 0;
    angle = Math.PI / 2 - Math.atan((320 - mouseX) / (200 - mouseY));
    if(mouseY < 200) angle = angle + Math.PI;
    return angle;
  }

}