function Worldpopulation() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'World population projections: 2021-2031';

  // Each visualisation have a unique ID with no special
  // characters.
  this.id = 'population-projections';

  // Title to display above the plot.
  this.title = 'World Population Projections 2021-2031';

  //let data = []
  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/worldPopulationProjections.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      }); 


  };

  var data = this.data;
  this.setup = function()
  {
    background();

    //data = this.data;
    data =  this.data.columns; 


    //data= [];
    colors = [color(55, 255, 0),
      color(204, 255, 0),
      color(238, 255, 0),
      color(255, 212, 0),
      color(255, 182, 0),
      color(255, 157, 0),
      color(255, 123, 0),
      color(255, 97, 0),
      color(255, 63, 0),
      color(255, 16, 0)]

  noStroke()
  }
  this.draw = function(){


    
    // // Get the column of raw data 
    var col = this.data.getColumn(year);
    // // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    var title = this.title;
    var x = width /2; 
    var y = height/2;

  strokeWeight(2);
  textSize(24);
  //fill(255)
  //textStyle(BOLD)
  //textAlign('center', 'left');
  //fill(0);
  text(title,x-200,y-250)
  textSize(12)
  push()
  translate(55,210)
  // 
  data.forEach((el,i) => {
      push()
  		translate(i * 50, 0)
      let c = floor(map(el.year,23,99,0,9))
    	fill(colors[c])
      rect(0,0,20,- el.year*1.5)
      fill(28, 110, 127)
    	push()
      translate(0,10)
      text(el.year,3.5,-18)
      rotate(HALF_PI)
      fill(255)
      textStyle(ITALIC)
      text(el.year,0,-6)
    	pop()
  		pop()
	})

  pop()

  
  }

  
}
