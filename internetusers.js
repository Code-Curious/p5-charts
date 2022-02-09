function InrnetUsers(){
    // Name for the visualisation to appear in the menu bar.
  this.name = 'Distribution of internet users worldwide';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Distribution-of-internet-users-worldwide';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //make a title for the chart 
  this.title = 'Distribution of internet users worldwide as of 2019, by age group';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/internet/internetusers.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };
}