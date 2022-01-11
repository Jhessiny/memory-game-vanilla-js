class MemoryGame {
  gameBox = document.querySelector(".game__box");
  curImgs = [];
  images = [
    "/images/cheeseburger.png",
    "/images/fries.png",
    "/images/hotdog.png",
    "/images/ice-cream.png",
    "/images/milkshake.png",
    "/images/pizza.png",
  ];

  concatImages = this.images.concat(this.images);
  score = 0;
  scoreEl = document.querySelector(".game__score span");
  bindedHandleClick = this.handleClick.bind(this);

  constructor() {
    this.generateUI();
    this.updateScore();
    this.cardsBacks = document.querySelectorAll(".card--back");
  }

  generateUI() {
    this.concatImages.sort(() => 0.5 - Math.random());

    this.concatImages.forEach((img) => {
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

    if (this.curImgs.length === 2) this.hideCards();
    this.showImg(currentCard);

    this.curImgs.push(currentCard.closest(".card").dataset.img);
    if (this.curImgs.length === 2) {
      this.image2 = currentCard.closest(".card").dataset.img;
      this.evaluateImages();
    }
  }

  evaluateImages() {
    if (this.curImgs[0] === this.curImgs[1]) {
      this.score += 1;
      this.updateScore();
    } else {
      console.log("wrong");
    }
  }

  hideCards() {
    if (this.curImgs[0] === this.curImgs[1])
      this.updateClassList("card--back--scored", true);
    this.updateClassList("card--back--invisible");

    this.curImgs = [];
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
