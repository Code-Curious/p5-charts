function Worldpopulation() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'World population projections: 2021-2031';

  // Each visualisation have a unique ID with no special
  // characters.
  this.id = 'population-projections';

  // Title to display above the plot.
  this.title = 'World Population Projections: 2021-2031';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function () {
    var self = this;
    this.data = loadTable(
      './data/population/worldPopulationProjections.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function (table) {
        self.loaded = true;
      });

  };

  var data = this.data;
  this.setup = function () {
    background(255);

    data = this.data.columns;

    this.colors = [
      '#97c3cf', 
      '#7e9ea6',
      '#6d8c94',
      '#678187',
      '#556b70',
      '#476066',
      '#344c52',
      '#223a40',
      '#162f36',
      '#0e252b',
      '#072026'
  ];
    noStroke()
  }
  this.draw = function () {
    push();
    var that = this;
    var title = this.title;
    var x = width / 2;
    var y = height / 2;
    
    textSize(24)
    fill(0)
    textStyle(BOLD)
    text(title,x- 200,y- 250)
    var dataObj = this.data.getObject();

    // transform data object into an array
    var arr = [];
    for (var key in dataObj) {
      arr.push(dataObj[key]);
    }
    
    // rename each element properties and cast values to numbers
    var data = arr.map(x => {
      return {
        year: x["Year"],
        worldPopulation: (parseFloat(x["World Population"].replaceAll(",", "")) / 1000000000).toFixed(2)
      }
    })

   
    textSize(12)
    push()
    translate(10,200)
    // 
    data.forEach((el,i) => {
        push()
        translate(i * 60, 40) //0
        let c = floor(map(el.worldPopulation,23,99,0,9))
        fill(that.colors[i])
        rect(x-350,y-50,50,-el.worldPopulation*40)
        fill(28, 110, 127)
        push()
        translate(10,20)
        textSize(15)
        text(el.year,x-350,y-50)
        rotate(HALF_PI)
        fill(255)
        textStyle(ITALIC)
        strokeWeight(2)
        textSize(20)
        text(el.worldPopulation + ' Billion' ,x-500,y-450)

        pop()
        pop()
    })
    pop()
    pop();
  }

}
