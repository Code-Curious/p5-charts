const colors = ['#654b75', '#a3544b', '#4a8a53', 'pink','#6c8394','#949621'];  
const thickness = 40;
let radius = 150, centerX, centerY;
let labelSpace = 30;



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
    this.select.position(400, 80); //350 , 40 

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
    push(); // save current drawing config

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
    // Make a title.
    var title = 'Employee diversity at ' + companyName;

    strokeCap(SQUARE);
    ellipseMode(RADIUS);

    strokeWeight(2)
    textAlign('center', 'center');
    textSize(24);
    text(title, x, y -250);
    // format data for doughnut input
    segments = {};
    col.forEach((value, index) => {
      segments[labels[index]] = value;
    });

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

      // Create a new doghnut chart .
    for (let i = 0; i < keys.length; i++) {
      noFill();
      stroke(colors[i]);
      strokeWeight(80);
      let angle = segments[keys[i]] / total * TWO_PI;
      arc(centerX, centerY, radius, radius, start + 100, start + angle);

      // Check mouse pos
      var d = mouseDist > radius - thickness ; 
      var ds =  mouseDist < radius + thickness ;

      // console.log(ds)

      if (d  && ds ) {
        if (mouseAngle > start && mouseAngle < start + angle +100) {
          // If the mouse is the correct distance from the center to be hovering over
          // our "donut" and the angsle to the mouse cursor is in the range for the
          // current slice, display the slice information

          push();
          noStroke();
          fill(colors[i]);
          textSize(20);
          text(segments[keys[i]]  ,centerX,centerY);
          //text(`${keys[i]}: ${segments[keys[i]]}`, centerX, centerY);
          pop();
        }
    } 
      if(keys){
        this.makeLegendItem(keys[i], i, colors[i]);
      }
      start += angle;
    }
    pop(); // restore last drawing config
  };
}
