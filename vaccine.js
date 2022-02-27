function Vaccine(){
    // Name for the visualisation to appear in the menu bar.
  this.name = 'COVID vaccine percentages per country 2022';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'vaccine-percentages-per-country';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //make a title for the chart 
  this.title = 'COVID-19 vaccine doses percentage at ';

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
    
    this.select = createSelect();
    this.select.position(400, 80); 
    console.log('this.data :', this.data);

    var countries = this.data.getRows().map( x => x.get(0));
    console.log('countries :', countries);
    for (let i = 0; i < countries.length; i++) {
      this.select.option(countries[i]);
    }
    console.log('this.select :', this.select);
    
    this.select.changed(x => {
      this.selectedCountry = this.select.value();
      this.relevantRow = this.data.getRows().find(element => element.get(0).trim().toLowerCase() == this.selectedCountry.trim().toLowerCase());

      // console.profile('data-prep')
      // let row = this.csvRows.find(element => element.get(0).trim().toLowerCase() == this.selectedCountry.trim().toLowerCase());
      let firstDosePercentage = parseInt(this.relevantRow.get(1).trim().substring(0, this.relevantRow.get(1).trim().length - 1));
      let remainingPercentageFromFirstDose = 100 - firstDosePercentage;
      let secondDosePercentage = parseInt(this.relevantRow.get(2).trim().substring(0, this.relevantRow.get(2).trim().length - 1));
      let remainingPercentageFromSecondDose = 100 - secondDosePercentage;
      let boosterDosePercentage = parseInt(this.relevantRow.get(3).trim().substring(0, this.relevantRow.get(3).trim().length - 1));
      let remainingPercentageFromBoosterDose = 100 - boosterDosePercentage;
      
      var waffleNames = ["First dose", "Second dose", "Booster dose"];
      
      var valuesNames = ['Remaining Population', 'Vaccinated'];
      
      let wafflesData = [[remainingPercentageFromFirstDose, firstDosePercentage],[remainingPercentageFromSecondDose, secondDosePercentage], [remainingPercentageFromBoosterDose, boosterDosePercentage]]; 
      console.log('wafflesData :', wafflesData);

      // console.profileEnd('data-prep')
      for (var i = 0; i < wafflesData.length; i++) {
        let x = 200 + (i * 220);
        this.waffles.push(new Waffle(x, 200, 200, 200, 10, 10, wafflesData[i], waffleNames[i], valuesNames));
      }
    })

    this.select.elt.selectedIndex = 0;
    this.select.elt.dispatchEvent(new Event('change'));

  };

  this.destroy = function() {
    this.select.remove();
  };

  this.draw = function() {
    push(); // save current drawing config.
    frameRate(24);
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var x = width /2; 
    var y = height/2;
    //draw the title of the chart
    var title = this.title + this.selectedCountry;
    strokeWeight(2)
    textAlign('center', 'center');
    textSize(24);
    textStyle(NORMAL)
    text(title, x, y - 300);

    if (!this.relevantRow) {
      console.log('this.relevantRow :', this.relevantRow);
      return;
    }
    
    for(var i = 0; i < this.waffles.length;i++){
      this.waffles[i].draw();
    }
    for(var i= 0; i < this.waffles.length;i++ ){
      this.waffles[i].checkMouse(mouseX,mouseY);
  
    }


    pop();
  };
}