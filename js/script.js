document.addEventListener("DOMContentLoaded", () => {
  const cardsArray = [
    { name: "card1", img: "./assets/img1.jpg" },
    { name: "card2", img: "./assets/img2.avif" },
    { name: "card3", img: "./assets/img3.jpg" },
    { name: "card4", img: "./assets/img4.jpg" },
    { name: "card5", img: "./assets/img5.jpg" },
    { name: "card6", img: "./assets/img6.jpg" },
    { name: "card7", img: "./assets/img7.avif" },
    { name: "card8", img: "./assets/img8.avif" },
    { name: "card1", img: "./assets/img1.jpg" },
    { name: "card2", img: "./assets/img2.avif" },
    { name: "card3", img: "./assets/img3.jpg" },
    { name: "card4", img: "./assets/img4.jpg" },
    { name: "card5", img: "./assets/img5.jpg" },
    { name: "card6", img: "./assets/img6.jpg" },
    { name: "card7", img: "./assets/img7.avif" },
    { name: "card8", img: "./assets/img8.avif" },
  ];

  // Shuffle the cards
  cardsArray.sort(() => 0.5 - Math.random());

  const gameBoard = document.getElementById("game-board");
  const scoreElement = document.getElementById("score");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  let chosenCards = [];
  let chosenCardIds = [];
  let matchedCards = [];
  let score = 0;
  let timeLeft = 120;
  let timerInterval;
  let canClick = true; // Add this flag to manage click control

  // Start the timer
  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;

      // Calculate hours, minutes, and seconds
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      // Update the timer display
      hoursElement.textContent = `${hours < 10 ? "0" : ""}${hours}`;
      minutesElement.textContent = `${minutes < 10 ? "0" : ""}${minutes}`;
      secondsElement.textContent = `${seconds < 10 ? "0" : ""}${seconds}`;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        gameOver();
      }
    }, 1000);
  }

  // Create the board
  function createBoard() {
    cardsArray.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "relative");

      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner", "w-full", "h-full");

      const cardFront = document.createElement("div");
      cardFront.classList.add(
        "card-front",
        "w-full",
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "bg-gray-100",
        "rounded-lg",
        "overflow-hidden"
      );

      const img = document.createElement("img");
      img.classList.add("w-full", "h-full", "object-cover");
      cardFront.appendChild(img);

      const cardBack = document.createElement("div");
      cardBack.classList.add(
        "card-back",
        "w-full",
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "rounded-lg"
      );
      cardBack.textContent = "?";

      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);
      gameBoard.appendChild(cardElement);

      cardElement.addEventListener("click", flipCard);
      cardElement.setAttribute("data-id", index);
    });
  }

  // Flip the card
  function flipCard() {
    if (!canClick) return; // Prevent further clicks if not allowed

    const cardId = this.getAttribute("data-id");

    // Prevent clicking the same card twice
    if (chosenCardIds.includes(cardId) || this.classList.contains("flipped")) {
      return;
    }

    chosenCards.push(cardsArray[cardId].name);
    chosenCardIds.push(cardId);

    const imgElement = this.querySelector(".card-front img");
    const cardBack = this.querySelector(".card-back");

    if (imgElement) {
      imgElement.setAttribute("src", cardsArray[cardId].img);
      this.classList.add("flipped");
      // Hide the back of the card by setting its visibility to hidden
      cardBack.style.visibility = "hidden";
    }

    if (chosenCards.length === 2) {
      canClick = false; // Disable further clicks
      setTimeout(checkForMatch, 500);
    }
  }

  // Check for matches
  function checkForMatch() {
    const cards = document.querySelectorAll(".card");
    const [firstId, secondId] = chosenCardIds;

    if (chosenCards[0] === chosenCards[1] && firstId !== secondId) {
      matchedCards.push(chosenCards);
      score++;
      scoreElement.textContent = score;

      const firstCard = cards[firstId];
      const secondCard = cards[secondId];
      firstCard.querySelector(".card-back").style.visibility = "hidden";
      secondCard.querySelector(".card-back").style.visibility = "hidden";

      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
    } else {
      // Flip cards back if they don't match
      setTimeout(() => {
        cards[firstId].classList.remove("flipped");
        cards[secondId].classList.remove("flipped");
        const firstImg = cards[firstId].querySelector(".card-front img");
        const secondImg = cards[secondId].querySelector(".card-front img");
        const firstBack = cards[firstId].querySelector(".card-back");
        const secondBack = cards[secondId].querySelector(".card-back");

        if (firstImg) firstImg.setAttribute("src", "");
        if (secondImg) secondImg.setAttribute("src", "");

        // Show the back of the card again
        firstBack.style.visibility = "visible";
        secondBack.style.visibility = "visible";
      }, 500);
    }

    chosenCards = [];
    chosenCardIds = [];
    canClick = true; // Re-enable clicking after match check

    // Check for win condition
    if (matchedCards.length === cardsArray.length / 2) {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(
          `Congratulations! You found all the matches! Your score is ${score}.`
        );
      }, 500);
    }
  }

  // Game over function
  function gameOver() {
    alert("Time's up! Game Over.");
    location.reload();
  }

  createBoard();
  startTimer();
});
const refreshButton = document.getElementById("refreshButton");
refreshButton.addEventListener("click", () => {
  location.reload(); // Reloads the page to restart the game
});
document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme");

  // Apply saved theme if it exists in localStorage
  if (currentTheme) {
    document.body.setAttribute("data-theme", currentTheme);
  }

  // Toggle dark/light mode on button click
  themeToggleBtn.addEventListener("click", () => {
    let theme = document.body.getAttribute("data-theme");

    if (theme === "dark") {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
});
