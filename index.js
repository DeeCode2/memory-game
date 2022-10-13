//get all cards
const cards = document.querySelectorAll(".card");

//matching cards
let hasFlipped = false; //initially none of the cards are flipped and so the default is false
let lockBoard = false; //restrict board to only allow two flipped cards at a time
let firstCard, secondCard;
let count = 0;

//function to flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlipped) {
    //!hasFlipped = opposite of false aka "if this card has been clicked" - will always be true when the function is clicked
    hasFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  matchCard();
}

//function to check if flipped cards match by comparing data attributes
function matchCard() {
  //flip or freeze card pairs depending on whether or not they match
  let cardMatch = firstCard.dataset.animal === secondCard.dataset.animal;
  cardMatch ? freezeCards() : unflip();
}

//function to disable cards by making then unclickable
function freezeCards() {
  firstCard.removeEventListener("click", flipCard);
  firstCard.classList.add("flipped"); //keep track of the matched cards

  secondCard.removeEventListener("click", flipCard);
  secondCard.classList.add("flipped");

  count += 20;
  console.log(count);

  //check if all cards are flipped
  if (document.querySelectorAll(".flipped").length === 16) {
    //end the game when all cards are flipped
    const modal = document.getElementById("modal");
    const score = document.getElementById("score");
    finalScore = String(count);
    modal.style.visibility = "visible";
    score.innerText = `Score: ${finalScore}`;
  } else {
    //subtract points and continue playing
    console.log("some cards are still unmatched");
    resetGrid();
  }
}

//function to unflip cards if they dont match
function unflip() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetGrid();
  }, 1400); //wait before unflipping cards
}

//make all cards clickable again by setting the card and board to initial values
function resetGrid() {
  [hasFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
  count -= 3;
  console.log(count);
}

//shuffle card order by changing flex item order
(function shuffle() {
  cards.forEach((card) => {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  });
})(); //function is an immediately invoked function and shuffles the card after loading

//add eventlistener to all cards on grid
cards.forEach((card) => card.addEventListener("click", flipCard));
