class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Enter your name");
    this.button = createButton("Submit");
    this.element = createElement("h2");
  }

  play() {
    this.input.position(width / 2 - 100, height / 2 + 50);
    this.button.position(width / 2 - 85, height / 2 + 120);

    this.input.class("customInput");
    this.button.class("customButton");

    this.button.mousePressed(() => {
      this.input.hide();
      this.button.hide();
      var name = this.input.value();

      swal(
        {
          title: `Welcome ${"\n"}${name}`,
          text: "Are you ready to race??",
          imageUrl:
            "https://image.freepik.com/free-vector/racing-car-icon_1063-15.jpg",
          imageSize: "150x150",
          confirmButtonText: "YES",
        },
        function (isConfirm) {
          if (isConfirm) {
            myInterval = setInterval(() => {
              flag -= 1;
              swal({
                title: `Get Set Go in .. ${"\n"}${flag}`,
                imageUrl:
                  "https://image.freepik.com/free-vector/racing-car-icon_1063-15.jpg",
                imageSize: "150x150",
                showConfirmButton: false,
              });

              if (flag === 1) {
                clearInterval(myInterval);
                swal.close();
              }

              swooshS.play();
            }, 1000);

            setTimeout(() => {
              player.getName();
              gameState = 1;
            }, 3000);
          }
        }
      );
      // player.getName();
      //        gameState = 1;
    });
  }
}