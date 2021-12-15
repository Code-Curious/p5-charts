const colors = ['red', 'green', 'blue', 'pink','yellow','purple'];
const thickness = 40;
//segments = {};

// col : [565, 54487, 4548]
// this.dat.twichya : ['woman', 'male' 'nes ness']


/* let segments = {
  foo: 34,
  bar: 55,
  baz: 89
};
 */
let radius = 150, centerX, centerY;
let labelSpace = 30;

function makeLegendItem(keys, i, colors) {


  var x = centerX + 100 + radius;
  var y = centerY + (labelSpace * i) - radius / 3;
  var boxWidth = labelSpace/2
  // var boxWidth = labelSpace / 2;
  var boxHeight = labelSpace/2;
  // var boxHeight = labelSpace / 2;

  fill(colors);
  stroke(0);
  strokeWeight(1);

  rect(x, y, boxWidth, boxHeight);

  fill('black');
  noStroke();
  textAlign('left', 'center');
  textSize(12);
  text(keys, x + boxWidth + 20, y +boxWidth/2);
  // nofill()
};

// function mySetup() {
  
//   /* // createCanvas(windowWidth, windowHeight);
//   noFill();
//   strokeWeight(thickness);
//   strokeCap(SQUARE);
//   ellipseMode(RADIUS);
//   textAlign(CENTER, CENTER);
//   textSize(20);

//   centerX = width / 2;
//   centerY = height / 2; */
// }

function myDraw() {
  // console.log('this.data :', this.data);

  // console.log('segments :', segments);

  let keys = Object.keys(segments);
  let total = keys.map(k => segments[k]).reduce((v, s) => v + s, 0);
  let start = 0;

  // Check the mouse distance and angle
  let mouseDist = dist(centerX, centerY, mouseX, mouseY);
  // Find the angle between a vector pointing to the right, and the vector
  // pointing from the center of the window to the current mouse position.
  let mouseAngle =
    createVector(1, 0).angleBetween(
      createVector(mouseX - centerX, mouseY - centerY)
    );

  // Counter clockwise angles will be negative 0 to PI, switch them to be from
  // PI to TWO_PI
  if (mouseAngle < 0) {
    mouseAngle += TWO_PI;
  }

  for (let i = 0; i < keys.length; i++) {
    noFill();
    stroke(colors[i]);
    strokeWeight(60);

    //noFill();
    let angle = segments[keys[i]] / total * TWO_PI;


   arc(centerX, centerY, radius, radius, start + 100, start + angle);

    // Check mouse pos
/*     if (mouseDist > radius - thickness / 2 &&
      mouseDist < radius + thickness / 2) {

      if (mouseAngle > start && mouseAngle < start + angle) {
        // If the mouse is the correct distance from the center to be hovering over
        // our "donut" and the angle to the mouse cursor is in the range for the
        // current slice, display the slice information
        push();
        noStroke();
        fill(colors[i]);
        text(`${keys[i]}: ${segments[keys[i]]}`, centerX, centerY);
        pop();
      }
    } */
    if(keys){
      this.makeLegendItem(keys[i], i, colors[i]);
    }
 

    start += angle;
  }
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
    // debugger;
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/race-2018.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
        // debugger
      });
  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Create a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);

    // Fill the options with all company names.
    var companies = this.data.columns;
    // First entry is empty.
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    }

    // createCanvas(windowWidth, windowHeight);
    noFill();
    strokeWeight(thickness);
    strokeCap(SQUARE);
    ellipseMode(RADIUS);
    textAlign(CENTER, CENTER);
    textSize(20);

    centerX = width / 2;
    centerY = height / 2;
  };

  this.destroy = function() {
    this.select.remove();
  };

  // Create a new pie chart object.
  // this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  


  this.draw = function() {
    var that = this;
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var companyName = this.select.value();

    // Get the column of raw data for companyName.
    var col = this.data.getColumn(companyName);

    // debugger

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each category.
    var colours = ['blue', 'red', 'green', 'pink', 'purple', 'yellow'];

    // Make a title.
    var title = 'Employee diversity at ' + companyName;

    // console.log('this.data :', this.data);

    // format data for doughnut input

    segments = {};
    
    col.forEach((value, index) => {
      // labels = ["name, name"]
      // col = [44, 454, 457]
      segments[labels[index]] = value;
    });

    // console.log('segments :', segments);
    myDraw();
    // this.pie.draw(col, labels, colours, title);

    
    

  };
}
