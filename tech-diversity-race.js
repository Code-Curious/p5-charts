const colors = ['#52B69A', '#34A0A4', '#168AAD', '#1A759F','#1E6091','#184E77'];  
const thickness = 40;
let radius = 180, centerX, centerY;
let labelSpace = 40;

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

//Converting strings to numbers 
//returns a floating point number with 2 dp 
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

    strokeWeight(2);
    textAlign(CENTER, CENTER);
    fill('#355070');
    textSize(24);
    textStyle(BOLDITALIC);
    text(title, x, y -300);
    
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
    let rightAxisVector = createVector(centerX - radius, 289 - centerY); 
    // the currentSliceEndAngle between a vector pointing to the right, and the vector
    // pointing from the center of the window to the current mouse position.
    let mouseAngle = rightAxisVector.angleBetween(fromCenterToMousePointerVector);

    // Counter angles 
    if (mouseAngle < 0) {
      mouseAngle += TWO_PI;
    }
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
      let currentSliceEndAngle = currentSliceStartAngle + currentSliceAngleIncrement;
      arc(centerX, centerY, radius, radius, currentSliceStartAngle, currentSliceEndAngle);      
      // if the mouse is inside doghnut 
      // display the percentage in the center of doghnut        
      // "White" race is the first value to draw 
      let isCursorDistanceOnDoughnut =  (mouseDist > radius - thickness) && (mouseDist < radius + thickness);
      let isCursorAngleOnCurrentSlice = (mouseAngle > currentSliceStartAngle) && (mouseAngle < currentSliceEndAngle);
      if (isCursorDistanceOnDoughnut && isCursorAngleOnCurrentSlice) {
      push()
      stroke(0);
      strokeWeight(2)
      textSize(35);
      fill(colors[i]);
      textAlign(CENTER,CENTER);
      text(formatNumber(segments[keys[i]]) + "%", centerX, centerY); 
      text(keys[i], centerX,centerY +30);
      pop();
    } 

  
     //text to appear under the chart to inform the user to hover with the mouse
    noStroke();
    fill('#adb5bd');
    textSize(15);
    textAlign(CENTER,CENTER);
    text('hover with mouse on each segment to show percentage', 500,600);

    //to draw legend Item
      if(keys){
          this.makeLegendItem(keys[i], i, colors[i]);
        }
        startAngle += currentSliceAngleIncrement;
    }
    pop(); // restore last drawing config.
  };
}
