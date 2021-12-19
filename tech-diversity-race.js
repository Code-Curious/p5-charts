const colors = ['#654b75', '#a3544b', '#4a8a53', 'pink','#6c8394','#949621'];  
const thickness = 40;
let radius = 150, centerX, centerY;
let labelSpace = 30;

// draw an arrow for a vector at a given base position (to debug mouse pointer hovering)
function drawArrow(base, vec, myColor) {
  push();
  stroke(myColor);
  strokeWeight(3);
  fill(myColor);
  translate(base.x, base.y);
  line(0, 0, vec.x, vec.y);
  rotate(vec.heading());
  let arrowSize = 7;
  translate(vec.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

function formatNumber(value) {
  return parseFloat(parseFloat(value).toFixed(2));
}



function TechDiversityRace() {
  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Race';
  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-race';
  // Property to represent whether data has been loaded.
  this.loaded = false;
  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(400, 80); 
    // Fill the options with all company names.
    var companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }
    
    centerX = width / 2;
    centerY = height / 2;
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.makeLegendItem = function(keys, i, colors) {
    var x = centerX + 80 + radius;
    var y = centerY + (labelSpace * i) - radius /3 -100;
    var boxWidth = labelSpace/2;
    var boxHeight = labelSpace/2;
    fill(colors);
    stroke(0);
    strokeWeight(1);
    rect(x, y, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    text(keys, x + boxWidth + 10, y + boxWidth/2);
  }

  this.draw = function() {
    push(); // save current drawing config.
    var that = this; 

    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    
    var x = width /2; 
    var y = height/2;

    // Get the value of the company we're interested in from the
    // select item.
    var companyName = this.select.value();
    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);
    // Convert all data strings to numbers.
    col = stringsToNumbers(col);
    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);
    // Make a title for the chart.
    var title = 'Employee diversity at ' + companyName;

    strokeCap(SQUARE);
    ellipseMode(RADIUS);

    strokeWeight(2)
    textAlign('center', 'center');
    textSize(24);
    text(title, x, y -250);
    
    segments = {}; //format data for doughnut input
    // execute each element in the data
    col.forEach((value, index) => {   
      segments[labels[index]] = value; 
    });
    // return an array of strings of companies name 
    let keys = Object.keys(segments);
    let total = keys.map(k => segments[k]).reduce((v, s) => v + s, 0);
    let startAngle = 0;
    
    // Check the mouse distance and currentSliceEndAngle
    let mouseDist = dist(centerX, centerY, mouseX, mouseY);
    let centerVector = createVector(centerX, centerY);
    let fromCenterToMousePointerVector = createVector(mouseX - centerX, mouseY - centerY);
    let rightAxisVector = createVector(centerX - radius, 289 - centerY); // DONT KNOW WHERE THIS 289 COMES FROM HONESTLY  ¯\_(ツ)_/¯

    // the currentSliceEndAngle between a vector pointing to the right, and the vector
    // pointing from the center of the window to the current mouse position.
    let mouseAngle = rightAxisVector.angleBetween(fromCenterToMousePointerVector);

    // Counter angles 
    if (mouseAngle < 0) {
      mouseAngle += TWO_PI;
    }
    
    // FOR DEBUGGING : 
    /* let angleInDegs = degrees(mouseAngle).toFixed(2);
    ellipse(centerVector.x, centerVector.y, 1, 1)
    text( formatNumber(angleInDegs) + " degrees", 200, 50);
    text( formatNumber(mouseAngle) + " radians", 200, 150);
    drawArrow(centerVector, fromCenterToMousePointerVector, 'gold');
    drawArrow(centerVector, rightAxisVector, 'cyan'); */

    // Create a new doghnut chart .
    for (let i = 0; i < keys.length; i++) {
      noFill();
      stroke(colors[i]);
      strokeWeight(80);
      let currentSliceStartAngle = startAngle;
      if (currentSliceStartAngle < 0 ) {
        currentSliceStartAngle += TWO_PI;
      }
     
      let currentSliceAngleIncrement = segments[keys[i]] / total * TWO_PI;
      // if (currentSliceAngleIncrement < 0 ) {
      //   currentSliceAngleIncrement += TWO_PI;
      // }
      let currentSliceEndAngle = currentSliceStartAngle + currentSliceAngleIncrement;
      
      // if (currentSliceEndAngle < 0 ) {
      //   currentSliceEndAngle += TWO_PI;
      // }
      
      arc(centerX, centerY, radius, radius, currentSliceStartAngle/*  + 100 */, currentSliceEndAngle);
      
      // if the mouse is inside doghnut 
      // display the percentage in the center of doghnut 
        
      // "White" race is the first value to draw (purple)
      let isCursorDistanceOnDoughnut =  (mouseDist > radius - thickness) && (mouseDist < radius + thickness);
      let isCursorAngleOnCurrentSlice = (mouseAngle > currentSliceStartAngle) && (mouseAngle < currentSliceEndAngle);
      if (isCursorDistanceOnDoughnut && isCursorAngleOnCurrentSlice) {
        push()
        noStroke();
        textSize(30);
        fill(colors[i]);
        text(formatNumber(segments[keys[i]]) + "%", centerX-20, centerY); 
        pop();
      }
      

      if(keys){
          this.makeLegendItem(keys[i], i, colors[i]);
        }
        startAngle += currentSliceAngleIncrement;
    }
    pop(); // restore last drawing config.
  };
}
