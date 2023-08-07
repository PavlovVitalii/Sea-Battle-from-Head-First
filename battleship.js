const view = {
  displayMessage: function (msg) {
    const message = document.getElementById("messageArea");
    message.innerHTML = msg;
  },

  displayHit: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },

  displayMiss: function (location) {
    const cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  },
};

const model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipSunk: 0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] },
  ],

  fire: function (guess) {
    for (let i = 0; i < this.shipLength; i++) {
      const ship = this.ships[i];
      const index = ship.locations.indexOf(guess);

      if (index >= 0) {
        ship.hits[index] = "hit";
        view.displayHit(guess);
        view.displayMessage("HIT!");

        if (this.isSunk(ship)) {
          this.shipSunk++;
        }
        return true;
      }

      view.displayMiss(guess);
      view.displayMessage("You missed.");
    }

    return false;
  },

  isSunk: function (ship) {
    return ship.hits.includes("") ? false : true;
  },
};

var controller = {
  guesses: 0,

  processGuess: function (guess) {
    var location = this.parseGuess(guess);
    console.log(location);
    if (location) {
      this.guesses++;
      var hit = model.fire(location);
      if (hit && model.shipSunk === model.numShips) {
        view.displayMessage(
          `You sunk all my battleships, in ${this.guesses} guesses`
        );
      }
    }
  },

  parseGuess: function (guess) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
      alert("Oops, please enter a letter and a number on the board.");
    } else {
      var firstChar = guess[0];
     var row = alphabet.indexOf(firstChar);
      var column = guess[1];

      if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn`t on the board.");
      } else if (
        row < 0 ||
        row >= model.boardSize ||
        column < 0 ||
        column >= model.boardSize
      ) {
        alert("Oops that`s off the board");
      } else {
        return row + column;
      }
    }
    return null;
  },
};

function init (){
    const fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    const guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function handleKeyPress(e) {
    const fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

function handleFireButton(){
    const guessInput = document.getElementById("guessInput");
    const guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

window.onload = init();



    // controller.parseGuess("A6");
    // controller.parseGuess("B6");
    // controller.parseGuess("C6");

    // controller.parseGuess("C4");
    // controller.parseGuess("D4");
    // controller.parseGuess("E4");

    // controller.parseGuess("B0");
    // controller.parseGuess("B1");
    // controller.parseGuess("B2");