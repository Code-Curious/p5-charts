function Socialmedia() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Most used social media platforms : 2021';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Most-used-social-media-platforms';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  //make a title for the chart 
  this.title = 'Most used social media platforms in 2021';

  this.bubbles = [];
  var x = width /2 ; 
  var y = height/2;
  var title = this.title;
  
  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/internet/socialmediadata.csv', 'csv', 'header',
      // Callback function to set the value.
      // Converting data strings to numbers.
      function(table) {
        table.rows = table.rows.map(function(row) {
          row.arr[1] = parseFloat(row.arr[1]);
          row.obj["Number of users"] = parseFloat(row.obj["Number of users"]);
          return row;
        })

        self.loaded = true;
    });

  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

  // to iterate rows and columns in the data.
  var rows = this.data.getRows();
  var numColumns = this.data.getColumnCount();

  // to create new bubbles
  for(var i = 0; i < rows.length; i++)
  {
      if(rows[i].get(0) != "")
      {
          let numberOfUsers = rows[i].obj["Number of users"];
          let size = 60 * numberOfUsers;
          let b = new Bubble(rows[i].get(0), size);
          this.bubbles.push(b);
      }

  }
  
  };

  this.draw = function() {
  push() //to save current drawing config.
  if (!this.loaded) {
    console.log('Data not yet loaded');
    return;
  }

  // Draw the bubbles.
  translate(width/2, height/2);
  for(var i = 0; i < this.bubbles.length; i++)
  {
      this.bubbles[i].update(this.bubbles);
      this.bubbles[i].draw();
      if (i === 16) { break; } // ends the loop when the loop counter i=16. 
  }
  
  //draw the title.
  strokeWeight(2);
  textAlign('center', 'center');
  textSize(24);
  textStyle(BOLD);
  text(title,x - 550,y - 680); //650
  
  pop() //to restore last drawing config.
  };
 
}
