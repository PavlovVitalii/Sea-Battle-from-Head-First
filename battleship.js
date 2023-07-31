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
        this.hits[index] = "hit";
        if (condition) {
            
        }
        return true;
      }
    }

    return false;
  },

  isSunk: function (ship) {
    return ship.hits.includes("") ? false : true;
  },
};
