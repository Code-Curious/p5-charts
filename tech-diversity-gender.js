function TechDiversityGender() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Tech Diversity: Gender';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'tech-diversity-gender';

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/tech-diversity/gender.csv', 'csv', 'header',
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
    };

    this.destroy = function() {
      this.select.remove();
    };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    push() //to save current drawing config.
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the company we're interested in from the
    // select item.
    var company = this.select.value();

    // Get the column of raw data for questionType.
    var col = this.data.getColumn(company);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the column labels from the table (the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for gender.
    var colours = ['#9e6868','#313563'];
    
    // Make a title.
    var title = 'Gender diversity at ' + company;

    textStyle(BOLD)
    // Draw the pie chart!
    this.pie.draw(col,labels, colours, title);

    pop() //to restore last drawing config.
  };

}