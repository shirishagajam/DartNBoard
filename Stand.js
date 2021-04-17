class Stand{
    constructor(x,y){
        var option={
            isStatic:true
        }
        this.body = Bodies.rectangle(x,y,50,150,option);
        this.image=loadImage("wood.png");
        World.add(world,this.body);
    }
    display(){
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,150,350);
    }
}