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

const controller = {
    guesses: 0,

    processGuess: function (guess) {
        
    }
}

model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");
