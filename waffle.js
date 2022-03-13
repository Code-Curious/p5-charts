function Waffle(x, y, width, height, boxes_across, boxes_down, data, name, possibleValues) {
    var x = x;
    var y = y;
    var height = height;
    var width = width;
    var boxes_across = boxes_across;
    var boxes_down = boxes_down;
    var name = name;
    var possibleValues = possibleValues;
    var colours = ['#f0f0f0', '#d6caeb'];
    var categories = [];
    var boxes = [];


    function addCategories() {
        for (var i = 0; i < possibleValues.length; i++) {
            categories.push({
                name: possibleValues[i],
                boxesCount: round(boxes_across * boxes_down * (data[i]/100)),// number of boxes to color
                colour: colours[i % colours.length]
            })
            //console.log('categories after add :', categories);
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
                if (currentCategoryBox == categories[currentCategory].boxesCount) {
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

    this.draw = function () {
        // iterate over boxes 
        push();
        for (var i = 0; i < boxes.length; i++) {
            for (var j = 0; j < boxes[i].length; j++) { //iterate each element in the array
                if (boxes[i][j].category != undefined) {
                    boxes[i][j].draw();
                }
            }
        }

        strokeWeight(1);
        fill("#718096");
        textSize(20);
        text(name, x + 50, y - 20);
        pop();

    }
    this.checkMouse = function (mouseX, mouseY) {
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

    //add categories 
    addCategories();
    addBoxes();
    
}

function Box(x, y, width, height, category) {
    var x = x;
    var y = y;
    var height = height;
    var width = width;
    this.category = category;

    // hovering over with the mouse
    this.mouseOver = function (mouseX, mouseY) {
        // is the mouse over this box
        if (mouseX > x && mouseX < x + width &&
            mouseY > y && mouseY < y + height) {
            return this.category.name;

        }
        return false;

    }

    // draw each box
    this.draw = function () {
        stroke(255)
        fill(category.colour);
        rect(x, y, width, height);
    }

}




