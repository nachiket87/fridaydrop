const NAMES = ["Nick", "Lucas", "Johnny", "Kiril", "Nirmohi", "Martin", "Yann"];

const DROP_RATE = 100; // Rate/speed at which the players will drop

const AVATAR_URLS = {
  Nick: "https://avatars.githubusercontent.com/u/7636254?v=4",
  Lucas: "https://avatars.githubusercontent.com/u/26128560?v=4",
  Johnny: "https://avatars.githubusercontent.com/u/42249198?v=4",
  Kiril: "https://avatars.githubusercontent.com/u/19571383?v=4",
  Nirmohi: "https://avatars.githubusercontent.com/u/12480324?v=4",
  Martin: "https://avatars.githubusercontent.com/u/19353631?v=4",
  Yann: "https://avatars.githubusercontent.com/u/6068943?v=4",
};
document.addEventListener("DOMContentLoaded", () => {
  const mainGrid = document.getElementById("grid");
  let players = [];
  mainGrid.style.width = window.innerWidth;
  mainGrid.style.height = window.innerHeight;

  class Player {
    constructor(name, left) {
      this.left = left;
      this.interval = null;
      this.visual = document.createElement("div");
      this.img = document.createElement("img");
      this.bottom = 430;
      this.name = name;
      this.direction = Math.random() < 0.5 ? "left" : "right";
      const visual = this.visual;
      const img = this.img;

      img.src = AVATAR_URLS[this.name];
      img.classList.add("avatar");

      visual.classList.add("player");
      visual.id = name;
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      visual.innerText = name;
      visual.appendChild(img);
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

  const getPlayerLeft = (player) => {
    if (player.direction === "left") {
      if (player.left < -(window.innerWidth / 2)) {
        player.direction = "right";
        return player.left + Math.floor(Math.random() * 50 + 50);
      } else {
        return player.left - Math.floor(Math.random() * 50 + 50);
      }
    } else {
      if (player.left > 600) {
        player.direction = "left";
        return player.left - Math.floor(Math.random() * 50 + 50);
      } else {
        return player.left + Math.floor(Math.random() * 50 + 50);
      }
    }
  };

  let completed_players = [];

  const movePlayer = (player) => {
    player.bottom -= DROP_RATE;
    player.left = getPlayerLeft(player);
    let visual = player.visual;
    visual.style.bottom = player.bottom + "px";
    visual.style.left = player.left + "px";
    if (player.bottom < -Math.round(window.innerHeight / 2)) {
      clearInterval(player.interval);
      completed_players.push(player);
      if (completed_players.length === NAMES.length) {
        alertWinner();
      }
    }
  };

  const movePlayers = () => {
    players.forEach((player) => {
      const intervalID = setInterval(
        () => movePlayer(player),
        Math.floor(Math.random() * 200 + 500)
      );
      player.interval = intervalID;
    });
  };

  movePlayers();
});
