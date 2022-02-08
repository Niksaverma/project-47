class Game {
  constructor() {}

  start() {
    form = new Form();
    form.play();

    player = new Player();
    //Adding the Images
    car1 = createSprite(width / 2 - 100, height - 100);
    car1.addImage("car1", playerCarimg);
    car1.addImage("flip", carFlipImg);
    car1.changeImage("car1");
    car1.scale = 1;
    car1.velocityY = -1;
    car1.setCollider("rectangle",0,0,100,170);
    //car1.debug=true

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", playerCarimg2);
    car2.scale = 0.9;
    car2.velocityY = -1.5;
    car2.setCollider("rectangle",0,0,100,170);
   // car2.debug=true

   
    coinGrp = new Group();
    oilGrp = new Group();
    this.addSprites(coinGrp, 3, coinImg, 0.6);
    this.addSprites(oilGrp, 7, oilCanImg, 0.8);
  }
  play() {
    // background(TrackImg);
    image(TrackImg, 0, -height, width, height * 3);
    // background("white");
    // track = createSprite(width/2,height/2, width*2,height*2);
    // track.addImage("track", TrackImg);

    textSize(30);
    fill("black");
    text("Score: " + Score, 170, car1.y -200);
   

    //  track.velocityY= -3
    camera.position.y = car1.position.y;
    //For moving the car in Up direction
    if (keyIsDown(UP_ARROW)) {
      car1.y -= 9;

      console.log(car1.x);
      console.log(car1.y);
    }
    //For moving the car in Left direction
    if (keyIsDown(LEFT_ARROW)) {
      car1.x -= 5;
    }
    //For moving the car in Right direction
    if (keyIsDown(RIGHT_ARROW)) {
      car1.x += 5;
    }
    this.collisionWithOIL();
    this.collisionWithCoin();
    this.collisionOfCars();
    drawSprites();
  }
  addSprites(spritegroup, numberOfSprites, spriteImage, spriteScale) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;
      x = random(270, width - 270);
      y = random(50, height - 50);

      var Sprite = createSprite(x, y);
      Sprite.addImage("sprites", spriteImage);
      spritegroup.add(Sprite);
      Sprite.scale = spriteScale;
    }
  }

  collisionWithOIL() {
    car1.overlap(oilGrp, function (collector, collected) {
      collected.remove();
      flipped = createSprite(collector.x, collector.y);
      collector.remove();
      flipped.addImage("flippedCar", carFlipImg);
    });
  }


  collisionWithCoin() {
    car1.overlap(coinGrp , function (collector, collected) {
      collected.remove(); 
      Score= Score+ 5;
     
    });
  }

  collisionOfCars(){
    if(car1.isTouching(car2)){
      swal(
          {
            title: ` Opps,Your Car Collied`,
            text: "Wanna Try again? If yes the click ",
            imageUrl:
              "data:image/png;base64,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",
            imageSize: "150x150",
            confirmButtonText: "YES",
          },
          function (isConfirm) {
               if (isConfirm) {
               location.reload();

               }
           } )
    }
  }
}
