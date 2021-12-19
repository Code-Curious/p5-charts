function Worldpopulation() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'World population projections: 2021-2031';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'population-projections';

  // Title to display above the plot.
  this.title = 'World Population Projections 2021-2031';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/population/worldPopulationProjections.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      }); 

  };
  this.setup = function()
  {
    background(255);
  }
  this.draw = function(){

  }
  
}