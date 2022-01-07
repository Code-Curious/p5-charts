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

    //data = this.data;
    data = this.data.columns;


    //data= [];
/*     this.colors = [
      color(55, 255, 0),
      color(204, 255, 0),
      color(238, 255, 0),
      color(255, 212, 0),
      color(255, 182, 0),
      color(255, 157, 0),
      color(255, 123, 0),
      color(255, 97, 0),
      color(255, 63, 0),
      color(255, 16, 0),
      color(255, 97, 0)
    ] */
    this.colors = [
      '#654b75',
      '#a3544b',
      '#4a8a53',
      '#fc03b1',
      '#6c8394',
      '#949621',
      '#654b75',
      '#a3544b',
      '#4a8a53',
      '#fc03b1',
      '#6c8394'
  ];

    noStroke()
  }
  this.draw = function () {
    var that = this;

    
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
    
    console.log('data :', data);

    var title = this.title;
    var x = width / 2;
    var y = height / 2;

    background(28, 110, 127)
    // background(224, 222, 224)
    textSize(20)
    fill(255)
    textStyle(BOLD)
    text('Average Noise Level (dB)',185,40)
    textSize(12)
    push()
    translate(55,210)
    // 
    data.forEach((el,i) => {
        push()
        translate(i * 25, 0)
        let c = floor(map(el.worldPopulation,23,99,0,9))
        fill(that.colors[i])
        rect(0,0,20,-el.worldPopulation*20)
        fill(28, 110, 127)
        push()
        translate(0,10)
        text(el.worldPopulation,3.5,-18)
        rotate(HALF_PI)
        fill(255)
        textStyle(ITALIC)
        text(el.year,0,-6)
        pop()
        pop()
    })
    pop()
    
    /* strokeWeight(2);
    textSize(24);
    //fill(255)
    //textStyle(BOLD)
    //textAlign('center', 'left');
    //fill(0);
    text(title, x - 200, y - 250)
    textSize(12)
    push()
    translate(55, 210)
    // 
    console.log('data :', data);
    data.forEach((el, i) => {
      push()
      translate(i * 50, 0)
      let c = floor(map(el.year, 23, 99, 0, 9))
      fill(colors[c])
      rect(0, 0, 20, - el.year * 1.5)
      fill(28, 110, 127)
      push()
      translate(0, 10)
      text(el.year, 3.5, -18)
      rotate(HALF_PI)
      fill(255)
      textStyle(ITALIC)
      text(el.year, 0, -6)
      pop()
      pop()
    })

    pop(); */
  }

}
