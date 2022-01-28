function BubbleChart(x,y,size,xSpeed,ySpeed,direction,_name)
{
    this.x = x;
    this.y = y;
    this.size = size;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.target_size = 20;
    this.pos = createVector(0,0);
    this.direction = createVector(0,0);
    this.name = _name;
    this.color = color(random(0,255), random(0,255), random(0,255));
    this.data = [];
    
    this.draw = function()
    {
        push();
        textAlign(CENTER);
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        fill(0);
        text(this.name,this.pos.x,this.pos.y);
        pop();
    }
    
    this.update = function(_bubbles)
    {
        this.direction.set(0,0);
        
        for(var i = 0; i < _bubbles.length; i++)
        {
            if(_bubbles[i].name != this.name)
            {
                var v = p5.Vector.sub(this.pos,_bubbles[i].pos); 
                var d = v.mag();

                if(d < this.size/2 + _bubbles[i].size/2)
                {
                    if(d > 0)
                    {
                        
                        this.direction.add(v)
                    }
                    else
                    {
                        this.direction.add(p5.Vector.random2D());    
                         
                    }
                }
            }
        }
        
        this.direction.normalize();
        this.direction.mult(2);
        this.pos.add(this.direction);
        
        if(this.size < this.target_size)
        {
            this.size += 1;
        }
        else if(this.size > this.target_size)
        {
            this.size -= 1;
        }
       
    }
    
    this.setData = function(i)
    {
        this.target_size = map(this.data[i], 0, maxAmt, 20, 250);
    }    
}