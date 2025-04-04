let words = [];

async function fetchWords(k) {
  try {
    const response = await fetch(`fetch.php?k=${k}`);
    const newWords = await response.json();
    words = words.concat(newWords);
  } catch (error) {
    console.error("Error fetching words:", error);
  }
}

async function startNewGame() {
  if (words.length <= 1) {
    await fetchWords(5 - words.length);
  }

  word = words.pop();
  if (!word) {
    alert("No words available. Please try again later.");
    return;
  }

  guess = "_".repeat(word.length);
  lives = 10;

  const keyboard = document.getElementById("keyboard");
  keyboard.style.display = "grid";
  createKeyboard();
  updateDisplay();
}

let word;
let guess;
let lives;
let gamesPlayed = 0;
let totalScore = 0;

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  letters.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "key";
    button.setAttribute("data-letter", letter);
    button.textContent = letter;
    button.onclick = () => handleKeyClick(letter);
    keyboard.appendChild(button);
  });
  keyboard.style.display = "grid";
}

function handleKeyClick(letter) {
  const key = document.querySelector(`button[data-letter="${letter}"]`);
  if (
    !key ||
    key.classList.contains("correct") ||
    key.classList.contains("wrong")
  ) {
    return;
  }

  if (word.includes(letter)) {
    key.classList.add("correct");
    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        guess = guess.substring(0, i) + letter + guess.substring(i + 1);
      }
    }
  } else {
    key.classList.add("wrong");
    lives--;
  }

  updateDisplay();
  checkGameStatus();
}

function updateDisplay() {
  document.getElementById("guess").innerHTML = guess.split("").join(" ");
  const heartsDisplay = "❤️".repeat(lives) + "🖤".repeat(10 - lives);
  document.getElementById("lives").innerHTML = heartsDisplay;
}

function checkGameStatus() {
  if (lives === 0) {
    // Show all remaining letters in red
    const remainingLetters = word
      .split("")
      .filter((letter) => !guess.includes(letter));
    remainingLetters.forEach((letter) => {
      const key = document.querySelector(`button[data-letter="${letter}"]`);
      if (key) key.classList.add("wrong");
    });

    // Update the guess display to show the full word in red
    document.getElementById("guess").innerHTML = word
      .split("")
      .map(
        (letter) =>
          `<span style="color: ${
            guess.includes(letter) ? "#0f0" : "#ff0000"
          }">${letter}</span>`
      )
      .join(" ");

    setTimeout(() => {
      alert("Game Over! The word was: " + word);
      endGame();
    }, 500);
  } else if (!guess.includes("_")) {
    // Show winning animation with the word in green
    document.getElementById("guess").innerHTML = word
      .split("")
      .map(
        (letter) => `<span style="color: #0f0" class="winner">${letter}</span>`
      )
      .join(" ");

    setTimeout(() => {
      alert("Congratulations! You won!");
      endGame();
    }, 500);
  }
}

function endGame() {
  gamesPlayed++;
  totalScore += lives;
  let avgScore = (totalScore / gamesPlayed).toFixed(2);
  document.getElementById("avgScore").innerHTML =
    "Average score after " + gamesPlayed + " games: " + avgScore;

  // Disable all keyboard buttons after game ends
  const keys = document.querySelectorAll(".key");
  keys.forEach((key) => {
    key.disabled = true;
    key.style.cursor = "not-allowed";
  });
}

// Add keyboard event listener for physical keyboard support
document.addEventListener("keydown", (event) => {
  if (document.getElementById("keyboard").style.display === "none") {
    return; // Don't process keyboard events if game hasn't started
  }

  const letter = event.key.toLowerCase();
  if (/^[a-z]$/.test(letter)) {
    handleKeyClick(letter);
  }
});

window.onload = async () => {
  await fetchWords(5);
  startNewGame();
};
