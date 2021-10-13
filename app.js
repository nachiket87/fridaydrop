const NAMES = [
  "Nick W",
  "Lucas C",
  "Johnny C",
  "Kiril S",
  "Nirmohi D",
  "Martin G",
  "Yann T",
];
document.addEventListener("DOMContentLoaded", () => {
  const mainGrid = document.getElementById("grid");
  let players = [];
  mainGrid.style.width = window.innerWidth;
  mainGrid.style.height = window.innerHeight;

  class Player {
    constructor(name, left) {
      this.left = left;
      this.visual = document.createElement("div");
      this.bottom = 430;
      this.name = name;
      this.direction = Math.random() < 0.5 ? "left" : "right";
      const visual = this.visual;

      visual.classList.add("player");
      visual.id = name;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.innerText = name;
      mainGrid.appendChild(visual);
    }
  }

  players = NAMES.map((name, index) => {
    left = index + 1;
    if (index % 2 === 0) {
      left = -left;
    }

    const player = new Player(name, left * 100);
    return player;
  });

  const getPlayerLeft = (player) => {
    if (player.direction === "left") {
      if (player.left < -720) {
        player.direction = "right";
        return player.left + Math.floor(Math.random() * 100);
      } else {
        return player.left - Math.floor(Math.random() * 100);
      }
    } else {
      if (player.left > 600) {
        player.direction = "left";
        return player.left - Math.floor(Math.random() * 100);
      } else {
        return player.left + Math.floor(Math.random() * 100);
      }
    }
  };

  const alertWinner = () => {
    players = players.sort((player1, player2) => {
      if (Math.abs(player1.left) < Math.abs(player2.left)) {
        return -1;
      } else {
        return 0;
      }
    });
    alert(`${players[0].name} won the game`);
  };

  const movePlayers = () => {
    players.some((player) => {
      player.bottom -= 20;
      player.left = getPlayerLeft(player);
      let visual = player.visual;
      visual.style.bottom = player.bottom + "px";
      visual.style.left = player.left + "px";
      if (player.bottom < -470) {
        clearInterval(intervalID);
        alertWinner();
        return true;
      }
    });
  };

  const intervalID = setInterval(movePlayers, 100);
});
