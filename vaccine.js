function Vaccine(){
    // Name for the visualisation to appear in the menu bar.
  this.name = 'Vaccine percentages per country';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'vaccine-percentages-per-country';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //make a title for the chart 
  this.title = 'Vaccine percentages per country as of chi le3ba';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/vaccine/vaccinesuk.csv', 'csv', 'header',
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

    this.waffles = [];
/*     this.select = createSelect();
    this.select.position(400, 80); 
    var companies = this.data.columns;
    for (let i = 1; i < companies.length; i++) {
      this.select.option(companies[i]);
    } */
    let row = this.data.getRow(0);
    let firstDosePercentage = parseInt(row.get(1).trim().substring(0, row.get(1).trim().length - 1));
    let remainingPercentageFromFirstDose = 100 - firstDosePercentage;
    let secondDosePercentage = parseInt(row.get(2).trim().substring(0, row.get(2).trim().length - 1));
    let remainingPercentageFromSecondDose = 100 - secondDosePercentage;

    var waffleNames = ["First dose", "Second dose" ];

    var valuesNames = ['Remaining Population', 'Vaccinated'];

	//waffle = new Waffle(30,30,300,300,8,8,data,"Monday",values)

	//draw all the this.waffles
    for (var i = 0; i < waffleNames.length; i++) {
      if (i < 4) {
        this.waffles.push(new Waffle(20 +
          (i * 220), 20, 200, 200, 8, 8, this.data, waffleNames[i], valuesNames));
      }
      else {
        this.waffles.push(new Waffle(120 +
          (i - 4) * 220, 240, 200, 200, 8, 8, this.data, waffleNames[i], valuesNames));

      }

    }
    
    // centerX = width / 2;
    // centerY = height / 2;
  };

  this.destroy = function() {
    this.select.remove();
  };

  this.draw = function() {
    push(); // save current drawing config.
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }


    for(var i =0; i < this.waffles.length;i++){
      this.waffles[i].draw();
    }
    for(var i=0; i < this.waffles.length;i++ ){
      this.waffles[i].checkMouse(mouseX,mouseY);
  
    }
    
  };
}