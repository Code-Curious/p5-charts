function Bubble(_name, size)
{
    this.size = size;
    this.target_size = 20;
    this.pos = createVector(0,0);
    // this.x = width/2;
    // this.y = height/2;
    this.direction = createVector(0,0);
    this.name = _name;
    this.color = color(random(0,255), random(0,255), random(0,255));
    this.data = [];
    
    let ySpeed = -0.5;
    let xSpeed = 0.5;

    var rad = 60; 
    
    
    //console.log(size)
    
    this.draw = function()
    {
        push();
        // var x = this.pos.x;
        // var y = this.pos.y;
        
        textAlign(CENTER);
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);
        fill(0);
        textSize(10);
        text(this.name,this.pos.x ,this.pos.y);
        // this.pos.y = this.pos.y + ySpeed;
        // this.pos.x = this.pos.x + ySpeed;

        // moving it around
       /*  this.pos.x++
        this.pos.y++

        //bounce off left and right
        if(this.pos.x < this.pos || this.pos.x > width) {
            xSpeed = xSpeed * -1;
        }

        // bounce off top and bottom
        if(this.pos.y < this.pos || this.pos.y > height) {
            ySpeed = ySpeed * -1;
        } */
                

       
          pop();
    }

    // this.movement = function(){
    //     if(this.pos.x > width - rad || this.pos.x < rad ){
    //         this.direction = -1;
    //     }
    //     if(this.pos.y > height - rad || this.pos.y < rad){
    //         this.direction = +1;
    //     }

    // }
    
    this.update = function(_bubbles)
    {
        this.direction.set(0,0);
        
        for(var i = 0; i < _bubbles.length; i++)
        {
            if(_bubbles[i].name != this.name)
            {
                
                var v = p5.Vector.sub(this.pos,_bubbles[i].pos); 
                var d = v.mag();

                if(d < (this.maxY/2 -20) + _bubbles[i].size/2)
                // if(d < (this.size/2 -20) + _bubbles[i].size/2)
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
        
        //////////////////
        // if(this.size < this.target_size)
        // {
        //     this.size += 1;
        // }
        // else if(this.size > this.target_size)
        // {
        //     this.size -= 1;
        // }
       
    }
    
    this.setData = function(i)
    {
        this.target_size = map(this.data[i], 0, this.maxAmt, 20, 250);
    }









    
}