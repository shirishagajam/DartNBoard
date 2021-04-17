class Board{
    constructor(x,y){
        var option={
            isStatic:true
        }
        this.body = Bodies.circle(x,y,50,option);
        this.image=loadImage("board.png");
        World.add(world,this.body);
    }
    display(){
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,225,225);
    }
}