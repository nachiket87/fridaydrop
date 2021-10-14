const all_names = [
  "Nick",
  "Lucas",
  "Johnny",
  "Kiril",
  "Nirmohi",
  "Martin",
  "Yann",
  "Sam",
  "Pawan",
  "Nachiket",
];

const shuffle_names = (names) => {
  let currentIndex = names.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [names[currentIndex], names[randomIndex]] = [
      names[randomIndex],
      names[currentIndex],
    ];
  }

  return names;
};

const NAMES = shuffle_names(all_names);
const DROP_SIZE = 20;

const AVATAR_URLS = {
  Nick: "https://avatars.githubusercontent.com/u/7636254?v=4",
  Lucas: "https://avatars.githubusercontent.com/u/26128560?v=4",
  Johnny: "https://avatars.githubusercontent.com/u/42249198?v=4",
  Kiril: "https://avatars.githubusercontent.com/u/19571383?v=4",
  Nirmohi: "https://avatars.githubusercontent.com/u/12480324?v=4",
  Martin: "https://avatars.githubusercontent.com/u/19353631?v=4",
  Yann: "https://avatars.githubusercontent.com/u/6068943?v=4",
  Vention: "https://avatars.githubusercontent.com/u/19786058?v=4",
  Sam: "https://avatars.githubusercontent.com/u/59837266?v=4",
  Nachiket: "https://avatars.githubusercontent.com/u/33430835?v=4",
};
document.addEventListener("DOMContentLoaded", () => {
  const mainGrid = document.getElementById("grid");
  const halfInnerHeight = Math.round(window.innerHeight / 2);
  const halfInnerWidth = Math.round(window.innerWidth / 2);
  let players = [];
  let completed_players = [];
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

      img.src = AVATAR_URLS[this.name] || AVATAR_URLS["Vention"];
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
    let left = index + 1;
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
    const notice = document.createElement("div");
    notice.innerText = `${players[0].name} won the game`;
    notice.classList.add("notice");
    const mainGrid = document.getElementById("container");
    mainGrid.appendChild(notice);

    //alert(`${players[0].name} won the game`);
  };

  const getPlayerLeft = (player) => {
    const randomNumberBetween100And50 = Math.floor(Math.random() * 20 + 20);
    if (player.direction === "left") {
      if (player.left < -halfInnerWidth + 50) {
        player.direction = "right";
        return player.left + randomNumberBetween100And50;
      } else {
        return player.left - randomNumberBetween100And50;
      }
    } else {
      if (player.left > halfInnerWidth - 180) {
        player.direction = "left";
        return player.left - randomNumberBetween100And50;
      } else {
        return player.left + randomNumberBetween100And50;
      }
    }
  };

  const movePlayer = (player) => {
    player.bottom -= DROP_SIZE;
    player.left = getPlayerLeft(player);
    let visual = player.visual;
    visual.style.bottom = player.bottom + "px";
    visual.style.left = player.left + "px";
    if (player.bottom < -(halfInnerHeight - 5)) {
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
