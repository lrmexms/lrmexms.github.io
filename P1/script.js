const content = {
    name: document.querySelectorAll(".name"),
    body: document.body,
    game:{
        gameBox: document.getElementById("game-box"),
        satOrBtc: document.getElementById("sat-or-btc"),
        satsCounter: document.getElementById("sats-counter"),
        serverMinerButton: document.getElementById("server-miner-button"),
        satsPerClick: document.getElementById("sats-per-click"),
        satsInAutoMine: document.getElementById("sats-in-auto-mine"),
        gameTimer: document.getElementById("game-timer"),
        moreSatsPerClickButton: document.getElementById("more-sats-per-click-button"),
        moreSatsPerClickPrice: document.getElementById("more-sats-per-click-price"),
        moreSatsInAutoMineButton: document.getElementById("more-sats-in-auto-mine-button"),
        moreSatsInAutoMinePrice: document.getElementById("more-sats-in-auto-mine-price"),
        gameMoreButton: document.getElementById("game-more-button")
    }
};

const constVars = {
    GameName: "Game Name",
    projectName: "Project Name"
};

let letVars = {
    game: {
        sats: 0,
        satsPerClick: 1,
        moreSatsPerClickPrice: 1,
        satsInAutoMine: 1,
        moreSatsInAutoMinePrice: 1,
        autoMineInterval: null,
        timerGame: 0,
        timerInterval: null
    },
};


function game() {
    loadGame();
    timerGame();
    autoMine();
    updateSats();
}


function saveGame() {
    const gameData = {
        sats: letVars.game.sats,
        satsPerClick: letVars.game.satsPerClick,
        moreSatsPerClickPrice: letVars.game.moreSatsPerClickPrice,
        satsInAutoMine: letVars.game.satsInAutoMine,
        moreSatsInAutoMinePrice: letVars.game.moreSatsInAutoMinePrice,
        timer: letVars.game.timerGame
    };
    localStorage.setItem("myGameSave", JSON.stringify(gameData));
}

function loadGame() {
    const saved = localStorage.getItem("myGameSave");
    if (!saved) return;

    const gameData = JSON.parse(saved);
    letVars.game.sats = gameData.sats ?? 0;
    letVars.game.satsPerClick = gameData.satsPerClick ?? 1;
    letVars.game.moreSatsPerClickPrice = gameData.moreSatsPerClickPrice ?? 1;
    letVars.game.satsInAutoMine = gameData.satsInAutoMine ?? 1;
    letVars.game.moreSatsInAutoMinePrice = gameData.moreSatsInAutoMinePrice ?? 1;
    letVars.game.timerGame = gameData.timer ?? 0;
    updateSats();
}

function updateSats() {
    if (letVars.game.sats >= 100000000) {
        content.game.satOrBtc.textContent = "BTC:";
        content.game.satsCounter.textContent =
            (letVars.game.sats / 100000000).toFixed(8);
    } else {
        content.game.satOrBtc.textContent = "SATs:";
        content.game.satsCounter.textContent = letVars.game.sats;
    }

    content.game.satsPerClick.textContent = letVars.game.satsPerClick;
    content.game.moreSatsPerClickPrice.textContent = letVars.game.moreSatsPerClickPrice;
    content.game.satsInAutoMine.textContent = letVars.game.satsInAutoMine;
    content.game.moreSatsInAutoMinePrice.textContent = letVars.game.moreSatsInAutoMinePrice;
}

function serverMinerButtonClicked() {
    letVars.game.sats += letVars.game.satsPerClick;
    updateSats();
    saveGame();
}

function timerGame() {
    if (letVars.game.timerInterval) return;

    letVars.game.timerInterval = setInterval(() => {
        letVars.game.timerGame++;
        content.game.gameTimer.textContent = toHHMMSS(letVars.game.timerGame);
    }, 1000);
}

function autoMine() {
    if (letVars.game.autoMineInterval) return;
    if (letVars.game.satsInAutoMine <= 0) return;

    letVars.game.autoMineInterval = setInterval(() => {
        letVars.game.sats += letVars.game.satsInAutoMine;
        updateSats();
    }, 1000);
}

function restartAutoMine() {
    clearInterval(letVars.game.autoMineInterval);
    letVars.game.autoMineInterval = null;
    autoMine();
}

function moreSatsPerClickButtonClicked() {
    if (letVars.game.sats < letVars.game.moreSatsPerClickPrice) return;

    letVars.game.sats -= letVars.game.moreSatsPerClickPrice;
    letVars.game.satsPerClick += 1;
    letVars.game.moreSatsPerClickPrice = Math.min(
        Math.ceil(letVars.game.satsPerClick * 1.75),
        999
    );

    updateSats();
    saveGame();
}

function moreSatsInAutoMineButtonClicked() {
    if (letVars.game.sats < letVars.game.moreSatsInAutoMinePrice) return;

    letVars.game.sats -= letVars.game.moreSatsInAutoMinePrice;
    letVars.game.satsInAutoMine += 10;
    letVars.game.moreSatsInAutoMinePrice = Math.min(
        Math.ceil(letVars.game.moreSatsInAutoMinePrice * 3.75),
        999
    );

    restartAutoMine();
    updateSats();
    saveGame();
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber/3600);
  let min = Math.floor((originalNumber - hours * 3600)/60);
  let secs = Math.floor((originalNumber - hours * 3600 - min * 60));

  if (originalNumber >= 3600) {
    return `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else if (originalNumber >= 60) {
    return `${min.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  } else {
    return secs.toString().padStart(2, "0");
  }
}

game()

content.game.moreSatsPerClickButton?.addEventListener("click", moreSatsPerClickButtonClicked);
content.game.moreSatsInAutoMineButton?.addEventListener("click", moreSatsInAutoMineButtonClicked);
content.game.serverMinerButton?.addEventListener("click", serverMinerButtonClicked);
content.game.gameMoreButton?.addEventListener("click", gameMoreButtonCliked);