function internetspeedsbycountry() {

  this.bubbles = [];
  this.years = [];
  this.maxAmt;
  this.yearButtons = [];


  // Name for the visualisation to appear in the menu bar.
  this.name = 'Internet speeds by country';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'internet speeds by country: 2021';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/internet/socialmediadata.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        table.rows = table.rows.map(function(row) {
          row.arr[1] = parseFloat(row.arr[1]);
          row.obj["Number of users"] = parseFloat(row.obj["Number of users"]);
          return row;
        })

        console.log('table :', table);
        self.loaded = true;
    });

    console.log(this.data)

  };

  this.setup = function() {
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    var rows = this.data.getRows();
    var numColumns = this.data.getColumnCount();

    for(var i = 5; i < numColumns; i++)
    {
        var that = this;
        var y = this.data.columns[i];
        this.years.push(y);
        b = createButton(y,y);
        b.parent('years')
        b.elt.addEventListener("click", function(ev){
          console.log('ev.target.value :', ev.target.value);
          that.changeYear(ev.target.value);
          // that.changeYear(this.elt.value);
        })
        this.yearButtons.push(b);
    }

    this.maxAmt = 0;

    for(var i = 0; i < rows.length; i++)
    {
        if(rows[i].get(0) != "")
        {
            var b = new Bubble(rows[i].get(0));

            for(var j = 5; j < numColumns; j++)
            {
                if(rows[i].get(j) != "")
                {
                    var n = rows[i].getNum(j);
                    if(n > this.maxAmt)
                    {
                        this.maxAmt = n; //keep a tally of the highest value
                    }
                    b.data.push(n);
                }
                else
                {
                     b.data.push(0);
                }

            }

            this.bubbles.push(b);
        }

    }

    for(var i = 0; i < this.bubbles.length; i++)
    {
        this.bubbles[i].setData(0);
    }


    
  };

    // // Create a select DOM element.
    // this.select = createSelect();
    // this.select.position(400, 80);

    // // Fill the options with all company names.
    // // var companies = this.data.columns;
    // // // First entry is empty.
    // // for (let i = 1; i < companies.length; i++) {
    // //   this.select.option(companies[i]);
    // // }

  // this.destroy = function() {
  //   this.select.remove();
  // };

  // Create a new pie chart object.

  // this.bubble = new Bubble(width / 2, height / 2, 20);

  this.changeYear = function(year)
  {
      var y = this.years.indexOf(year);
      
      for(var i = 0; i < this.bubbles.length; i++)
      {
          this.bubbles[i].setData(y);
      }
  }
  

  this.bubble = new Bubble(width / 2, height / 2, 20);
  // this.bubble = new Bubble()


  this.draw = function() {
    push() //to save current drawing config.
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }
    
    // Draw the bubble
    translate(width/2, height/2);
    for(var i = 0; i < this.bubbles.length; i++)
    {
        this.bubbles[i].update(this.bubbles);
        this.bubbles[i].draw();
    }

    pop() //to restore last drawing config.
  };


 
}
