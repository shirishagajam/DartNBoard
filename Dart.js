class Dart{
    constructor(x,y,width,height){
        var options={
			//isStatic:true,
			friction :1,
			density :0.5
			}
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.image=loadImage("dart.png");
        World.add(world,this.body);
    }
    display(){
        //this.body.position.x = mouseX;
       // this.body.position.y = mouseY;
        imageMode(CENTER);
        image(this.image,this.body.position.x,this.body.position.y,100,80);
    }
}