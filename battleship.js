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
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
    { locations: [0, 0, 0], hits: ["", "", ""] },
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

  generateShipLocations: function () {
    let locations;

    for (let i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collisions(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip: function () {
    const direction = Math.floor(Math.random() * 2);
    const newShipLocations = [];
    let row;
    let col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.shipLength + 1));
    } else {
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
      col = Math.floor(Math.random() * this.boardSize);
    }

    for (let i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + "" + (col + i));
      } else {
        newShipLocations.push(row + i + "" + col);
      }
    }

    return newShipLocations;
  },

  collisions: function (locations) {
    for (let i = 0; i < this.numShips; i++) {
      const ship = model.ships[i];
      for (let j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }

    return false;
  },
};

const controller = {
  guesses: 0,

  processGuess: function (guess) {
    const location = this.parseGuess(guess);
    console.log(location);
    if (location) {
      this.guesses++;
      const hit = model.fire(location);
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
      const firstChar = guess[0];
      const row = alphabet.indexOf(firstChar);
      const column = guess[1];

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

function init() {
  const fireButton = document.getElementById("fireButton");
  fireButton.onclick = handleFireButton;
  const guessInput = document.getElementById("guessInput");
  guessInput.onkeypress = handleKeyPress;
  model.generateShipLocations();
}

function handleKeyPress(e) {
  const fireButton = document.getElementById("fireButton");
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

function handleFireButton() {
  const guessInput = document.getElementById("guessInput");
  const guess = guessInput.value;
  controller.processGuess(guess);
  guessInput.value = "";
}

window.onload = init();
