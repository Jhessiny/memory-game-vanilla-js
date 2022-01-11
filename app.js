class MemoryGame {
  gameBox = document.querySelector(".game__box");
  image1 = null;
  image2 = null;
  images = [
    "/images/cheeseburger.png",
    "/images/fries.png",
    "/images/hotdog.png",
    "/images/ice-cream.png",
    "/images/milkshake.png",
    "/images/pizza.png",
  ];

  concatImages = this.images.concat(this.images);
  randomImagesArray = new Array(12);
  score = 0;
  scoreEl = document.querySelector(".game__score span");
  bindedHandleClick = this.handleClick.bind(this);

  constructor() {
    this.generateUI();
    this.updateScore();
    this.cardsBacks = document.querySelectorAll(".card--back");
  }

  generateRandomImagesArray() {
    this.concatImages.forEach((img, i) => {
      let random = Math.floor(Math.random() * 12);
      if (i === 0) this.randomImagesArray[random] = img;
      else {
        while (this.randomImagesArray[random])
          random = Math.floor(Math.random() * 12);
        this.randomImagesArray[random] = img;
      }
    });
  }

  generateUI() {
    this.generateRandomImagesArray();
    this.randomImagesArray.forEach((img) => {
      const html = `
            <div class="card" data-img="${img}" >
              <img src="${img}"/>
              <div class="card--back"></div>
            </div>`;
      this.gameBox.insertAdjacentHTML("beforeend", html);
    });

    this.cards = document.querySelectorAll(".card");

    this.cards.forEach((card) =>
      card.addEventListener("click", this.bindedHandleClick)
    );
  }

  showImg(back) {
    back.classList.add("card--back--invisible");
  }

  handleClick(e) {
    const currentCard = e.target;
    if (this.image1 && this.image2) this.hideCards();
    this.showImg(currentCard);

    if (!this.image1) this.image1 = currentCard.closest(".card").dataset.img;
    else if (!this.image2) {
      this.image2 = currentCard.closest(".card").dataset.img;
      this.evaluateImages();
    }
  }

  evaluateImages() {
    if (this.image1 === this.image2) {
      this.score += 1;
      this.updateScore();
    } else {
      console.log("wrong");
    }
  }

  hideCards() {
    if (this.image1 === this.image2)
      this.updateClassList("card--back--scored", true);
    this.updateClassList("card--back--invisible");

    this.image1 = null;
    this.image2 = null;
  }

  updateClassList(myClass, scored) {
    this.cardsBacks.forEach((c) => {
      if (c.classList.length > 1) {
        if (scored) {
          c.classList.add(myClass);
          c.closest(".card").removeEventListener(
            "click",
            this.bindedHandleClick
          );
        } else c.classList.remove(myClass);
      }
    });
  }

  updateScore() {
    this.scoreEl.innerHTML = this.score;
    if (this.score === 6) {
      alert("You Won!");
      this.cardsBacks.forEach((c) => {
        c.classList.add("card--back--invisible");
      });
    }
  }
}

new MemoryGame();
