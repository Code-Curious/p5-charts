function Bubble(_name, size)
{
    this.size = size;
    this.pos = createVector(0,0,0);
    this.direction = createVector(0,0,0);
    this.name = _name;
    this.color = randomColor({ luminosity: 'light'});

//draw the bubble and names
this.draw = function()
{
    push();
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
    fill(0);
    textAlign(CENTER,CENTER);
    textStyle(BOLDITALIC);
    textSize(15);
    text(this.name,this.pos.x ,this.pos.y);
    pop();
}

//update the bubbles directions 
this.update = function(_bubbles)
{

    this.direction.set(0,0,0);
    
    for(var i = 0; i < _bubbles.length; i++)
    {
        if(_bubbles[i].name != this.name)
        {
            
            var v = p5.Vector.sub(this.pos,_bubbles[i].pos); 
            var d = v.mag();

            if(d < this.size/2 + 30 + _bubbles[i].size/2)
            {
                if(d > 0)
                {
                    this.direction.add(v)
                }
                else
                {
                    this.direction.add(p5.Vector.random2D()); //Make a new 2D unit vector from a random angle 
                        
                }
            }
            
        }
    }
    
    
    this.direction.normalize();
    this.direction.mult(2); //multiply the vector by 2
    this.pos.add(this.direction);
    }
   
}