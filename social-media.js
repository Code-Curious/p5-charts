function socialmedia() {

  this.bubbles = [];
  //this.years = [];
  // this.maxAmt;
  //this.yearButtons = [];


  // Name for the visualisation to appear in the menu bar.
  this.name = 'Most used social media platforms : 2021';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'Most-used-social-media-platforms';

  // Property to represent whether data has been loaded.
  this.loaded = false;

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

  var rows = this.data.getRows();
  var numColumns = this.data.getColumnCount();

  // for(var i = 5; i < numColumns; i++)
  // {
  //     var that = this;
  //     var y = this.data.columns[i];
  //     this.years.push(y);
  //     b = createButton(y,y);
  //     b.parent('years')
  //     b.elt.addEventListener("click", function(ev){
  //       console.log('ev.target.value :', ev.target.value);
  //       that.changeYear(ev.target.value);
  //       // that.changeYear(this.elt.value);
  //     })
  //     this.yearButtons.push(b);
  // }

    // this.maxAmt = 0;

  // to create new bubbles
  for(var i = 0; i < rows.length; i++)
  {
      if(rows[i].get(0) != "")
      {
          let numberOfUsers = rows[i].obj["Number of users"]
          let size = 60 * numberOfUsers
          let b = new Bubble(rows[i].get(0), size);
          this.bubbles.push(b);
      }

  }

    // for(var i = 0; i < this.bubbles.length; i++)
    // {
    //     this.bubbles[i].setData(0);
    // }

  
  };

  

  this.draw = function() {
    push() //to save current drawing config.
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

  // Draw the bubbles
  translate(width/2, height/2);
  for(var i = 0; i < this.bubbles.length; i++)
  {
    if (i === 16) { break; } // ends the loop when the loop counter i=16
      this.bubbles[i].update(this.bubbles);
      this.bubbles[i].draw();
  }
  

    pop() //to restore last drawing config.
  };


 
}
