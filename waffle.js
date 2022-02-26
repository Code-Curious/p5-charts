function Waffle(x, y, width, height, boxes_across, boxes_down, table, columnHeading, possibleValues) {

    var x = x;
    var y = y;
    var height = height;
    var width = width;
    var boxes_across = boxes_across;
    var boxes_down = boxes_down;

    var coloumn = table.getColumn(columnHeading);
    var possibleValues = possibleValues;

    var colours = ['#f0f0f0', '#d6caeb'];

    var categories = [];
    var boxes = [];


    function categoryLocation(categoryName) {
        for (var i = 0; i < possibleValues.length; i++) {
            if (categoryName == categories[i].name) {
                return i;

            }
        }
        return -1; // returns -1 for the end of the for loop
    }
    function addCategories() {
        for (var i = 0; i < possibleValues.length; i++) {
            categories.push({
                'name': possibleValues[i],
                'count': 0,
                'colour': colours[i % colours.length]
            })
        }
        //iterate over the coloumn
        for (var i = 0; i < coloumn.length; i++) {

            var catLocation = categoryLocation(coloumn[i])
            if (catLocation != -1) {
                categories[catLocation].count++
            }

        }
        //iterate over the categories and add proportions
        for (var i = 0; i < categories.length; i++) {

            categories[i].boxes = round((categories[i].count /
                coloumn.length) * (boxes_down * boxes_across));
        }
    }


    function addBoxes() {
        var currentCategory = 0;
        var currentCategoryBox = 0;

        var boxWidth = width / boxes_across;
        var boxheight = height / boxes_down;


        for (var i = 0; i < boxes_down; i++) {
            boxes.push([]) // we want the boxes to be 2D
            for (var j = 0; j < boxes_across; j++) {
                if (currentCategoryBox == categories[currentCategory].boxes) {
                    currentCategoryBox = 0;
                    currentCategory++;
                }
                boxes[i].push(new Box(x + (j * boxWidth),
                    y + (i * boxheight),
                    boxWidth, boxheight,
                    categories[currentCategory]));

                currentCategoryBox++;
            }

        }

    }


    //add categories 
    addCategories();
    addBoxes();
    // draw waffle chart
    this.draw = function () {
        // iterate over boxes 
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) { //iterate each element in the array
                if (boxes[i][j].category != undefined) {
                    boxes[i][j].draw();

                }
            }
        }


    }
    this.checkMouse = function (mouseX, mouseY) {
        // 

        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) {
                if (boxes[i][j].category != undefined) {

                    var mouseOver = boxes[i][j].mouseOver(mouseX, mouseY);
                    if (mouseOver != false) {
                        push();
                        fill(0);
                        textSize(20);
                        var twidth = textWidth(mouseOver);
                        textAlign(LEFT, TOP);
                        rect(mouseX, mouseY, twidth + 20, 40);
                        fill(255);
                        text(mouseOver, mouseX + 10, mouseY + 10);
                        pop();
                        break;

                    }
                }
            }
        }
    }
}

function Box(x, y, width, height, category) {


    var x = x;
    var y = y;
    var height = height;
    var width = width;

    this.category = category;



    this.mouseOver = function (mouseX, mouseY) {
        // is the mouse over this box
        if (mouseX > x && mouseX < x + width &&
            mouseY > y && mouseY < y + height) {
            return this.category.name;

        }
        return false;

    }

    this.draw = function () {

        fill(category.colour);
        rect(x, y, width, height);
    }

}




