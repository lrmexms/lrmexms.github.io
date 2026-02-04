const content = {
    name: document.querySelectorAll(".name"),
    body: document.body,
    game:{
        game: document.getElementById("game"),
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
    },
    home: {
        homeMenu: document.getElementById("home-menu"),
        loginButton: document.getElementById("login-button"),
        createAccountButton: document.getElementById("create-account-button"),
        gameButton: document.getElementById("game-button-home-menu")
    },
    login: {
        loginMenu: document.getElementById("login-menu"),
        userInputLoginMenu: document.getElementById("user-input-login-menu"),
        passwordInputLoginMenu: document.getElementById("password-input-login-menu"),
        loginButtonLoginMenu: document.getElementById("login-button-login-menu"),
        createAccountButtonLoginMenu: document.getElementById("create-account-button-login-menu"),
        gameButton: document.getElementById("game-button-login-menu")
    },
    createAccount: {
        createAccountMenu: document.getElementById("create-account-menu"),
        userInputCreateAccountMenu: document.getElementById("user-input-create-account-menu"),
        nameInputCreateAccountMenu: document.getElementById("name-input-create-account-menu"),
        emailInputCreateAccountMenu: document.getElementById("email-input-create-account-menu"),
        passwordInputCreateAccountMenu: document.getElementById("password-input-create-account-menu"),
        confirmPasswordInputCreateAccountMenu: document.getElementById("confirm-password-input-create-account-menu"),
        createAccountButtonCreateAccountMenu: document.getElementById("create-account-button-create-account-menu"),
        loginButtonCreateAccountMenu: document.getElementById("login-button-create-account-menu"),
        gameButton: document.getElementById("game-button-create-account-menu")
    },
    end: {
        endPage: document.getElementById("end-page"),
        userDisplayMenu: document.getElementById("user-display-menu"),
        userButtonMenu: document.getElementById("user-button-menu"),
        xButtonAccountmenu: document.getElementById("x-button-account-menu"),
        accountMenuBackground: document.getElementById("account-menu-background"),
        userDisplayAccountMenu: document.getElementById("user-display-account-menu"),
        nameDisplayAccountMenu: document.getElementById("name-display-account-menu"),
        emailDisplayAccountMenu: document.getElementById("email-display-account-menu"),
        copyButtonSha256User: document.getElementById("copy-button-sha256-user"),
        copyButtonSha256Password: document.getElementById("copy-button-sha256-password"),
        gameButtonAccountMenu: document.getElementById("game-button-account-menu")
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
    loginData: {
        logged: false,
        user: "teste ffffffffffffffffff",
        name: "Teste fffffffffffff",
        email: "teste@email.tst dv f  ff f",
        sha256User: "userf ffffffffffffff ",
        sha256Password: "password f fffffff"
    },
    end: {
        accountMenuBackground: false
    }
};

/* =======================
   UTILITÁRIOS
======================= */

async function getEmail(user) {
    checkServer();

    if (!user) return null;

    const res = await fetch("http://127.0.0.1:5000/get_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
    });

    const data = await res.json();

    if (data.status === "ok") {
        return data.email;
    } else {
        console.log(data.message);
        return null;
    }
}

function limitString(str, max) { 
    return str.length > max ? `${str.slice(0, max)}...` : str;
}

function copy(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied:", text);
        })
        .catch(err => {
            console.error("Error copying:", err);
        });
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)]
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkServer() { 
    let status = ""

    try { 
        const res = await fetch("http://127.0.0.1:5000/status", { cache: "no-store" }) 
        if (!res.ok) throw new Error("Error") 

        const data = await res.json() 

        status = data.online
            ? "ok"
            : "erro"
    } catch (e) { 
        status = "erro"
    }
    if (status == "ok") {
        console.log("Server: ON")
    } else {
        alert("SERVER: OFF")
    }
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

function isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function verifyTfa(email) {
    const res = await fetch("http://127.0.0.1:5000/tfa_email_1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const { id } = await res.json();
    const code = prompt("Enter the 6-digit code sent to your email:");

    const res2 = await fetch("http://127.0.0.1:5000/tfa_email_2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, id, code })
    });

    const data2 = await res2.json();
    alert(data2.message);
    return data2.status === "ok";
}

/* =======================
   GAME (#game)
======================= */

function gameRender(bool) {
    content.game.game.style.display = bool ? "flex" : "none";
    toggleEnd(0);
    if (bool) {
        loadGame();
        game();
    }
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
        Math.ceil(letVars.game.satsPerClick * 10.141),
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
        Math.ceil(letVars.game.moreSatsInAutoMinePrice * 5.125),
        999
    );

    restartAutoMine();
    updateSats();
    saveGame();
}

function gameMoreButtonCliked() {
    if (letVars.loginData.logged == false) {
        toggleFase(1);
    } else {
        toggleEnd(1);
        toggleFase(4);
    }
}

function game() {
    timerGame();
    autoMine();
    updateSats();
}

/* =======================
   HOME MENU (#home-menu)
======================= */

function homeMenuRender(bool) {
    content.home.homeMenu.style.display = bool ? "flex" : "none";
    toggleEnd(0);
}

function loginButtonClicked() {
    toggleFase(2);
}

function createAccountButtonClicked() {
    toggleFase(3);
}

function toGame() {
    toggleFase(0);
}

/* =======================
   LOGIN MENU (#login-menu)
======================= */

function loginMenuRender(bool) {
    content.login.loginMenu.style.display = bool ? "flex" : "none";
    toggleEnd(0);
}

async function loginButtonLoginMenuClicked() {
    const user = content.login.userInputLoginMenu.value.trim();
    const password = content.login.passwordInputLoginMenu.value.trim();
    const email = await getEmail(user)

    if (!email || !password) {
        alert("Fill all fields!");
        return;
    }

    if (!isEmail(email)) {
        alert("This is not an email");
        return;
    }

    if (!(await verifyTfa(email))) return;

    const res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);

    if (data.status === "ok") {
        letVars.loginData.logged = true;
        letVars.loginData.user = data.user;
        letVars.loginData.name = data.name;
        letVars.loginData.email = email;
        letVars.loginData.sha256User = await sha256(data.user);
        letVars.loginData.sha256Password = await sha256(password);
        toggleFase(4);
        alert("Please note that you will no longer be connected when you log out.");
    }
}

function createAccountButtonLoginMenuClicked() {
    toggleFase(3);
}

/* =======================
   CREATE ACCOUNT (#create-account-menu)
======================= */

function createAccountMenuRender(bool) {
    content.createAccount.createAccountMenu.style.display = bool ? "flex" : "none";
    toggleEnd(0);
}


async function createAccountButtonCreateAccountMenuClicked() {
    checkServer()
    const user = content.createAccount.userInputCreateAccountMenu.value.trim();
    const name = content.createAccount.nameInputCreateAccountMenu.value.trim();
    const email = content.createAccount.emailInputCreateAccountMenu.value.trim();
    const password = content.createAccount.passwordInputCreateAccountMenu.value.trim();
    const password2 = content.createAccount.confirmPasswordInputCreateAccountMenu.value.trim();

    if (!user || !name || !email || !password || !password2) {
        alert("Fill all fields!");
        return;
    }

    if (user.length < 4 || user.length > 16) {
        alert("User must be between 4 and 16 characters");
        return;
    }

    if (!isEmail(email)) {
        alert("Invalid email");
        return;
    }

    if (password !== password2) {
        alert("Passwords do not match");
        return;
    }

    if (password.length < 8 || password.length > 64) {
        alert("Password must be between 8 and 64 characters");
        return;
    }

    if (password === password.toUpperCase() || password === password.toLowerCase()) {
        alert("Password must contain upper and lower case letters");
        return;
    }

    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
        alert("Password must contain letters and numbers");
        return;
    }

    if (!(await verifyTfa(email))) return;

    fetch("http://127.0.0.1:5000/create_account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        if (data.status === "ok") {
            toggleFase(1);
        }
    })
    .catch(() => alert("Server error"));
}

function loginButtonCreateAccountMenuClicked() {
    toggleFase(2);
}

/* =======================
   END PAGE (#end-page)
======================= */

function endPage(bool) {
    content.end.endPage.style.display = bool ? "flex" : "none";
    if(bool == true) {
        toggleEnd(1);
        content.end.userDisplayMenu.innerText = letVars.loginData.user
    }
}

function printendAccountMenu() {
    const maxChars = Math.floor(
        content.end.userDisplayAccountMenu.clientWidth / 9
    );

    content.end.userDisplayAccountMenu.innerText = limitString(letVars.loginData.user, maxChars);
    content.end.nameDisplayAccountMenu.innerText = limitString(letVars.loginData.name, maxChars);
    content.end.emailDisplayAccountMenu.innerText = limitString(letVars.loginData.email, maxChars);
}

function userButtonMenuClicked() {
    letVars.end.accountMenuBackground = !letVars.end.accountMenuBackground;
    content.end.accountMenuBackground.style.display = letVars.end.accountMenuBackground ? "flex" : "none";
    if (letVars.end.accountMenuBackground) {requestAnimationFrame(printendAccountMenu)}
}


function copyButtonSha256UserClicked() {
    copy(letVars.loginData.sha256User);
}

function copyButtonSha256PasswordClicked() {
    copy(letVars.loginData.sha256Password);
}

function gameButtonAccountMenuClicked() {
    toggleFase(0);
    toggleEnd(0);
}


/* =======================
   CONTROLE DE TELAS
======================= */

function toggleFase(fase) {
    gameRender(fase === 0);
    homeMenuRender(fase === 1);
    loginMenuRender(fase === 2);
    createAccountMenuRender(fase === 3);
    endPage(fase === 4);
}

function toggleEnd(num) {
    document.title = (num === 0) ? constVars.GameName : constVars.projectName;
    content.name.forEach(el => el.textContent = (num === 0) ? constVars.GameName : constVars.projectName);
}

/* =======================
   INIT + EVENTOS
======================= */

function load() {
    toggleEnd(0);
    toggleFase(0);
}

load()

content.game.moreSatsPerClickButton?.addEventListener("click", moreSatsPerClickButtonClicked);
content.game.moreSatsInAutoMineButton?.addEventListener("click", moreSatsInAutoMineButtonClicked);
content.game.serverMinerButton?.addEventListener("click", serverMinerButtonClicked);
content.game.gameMoreButton?.addEventListener("click", gameMoreButtonCliked);

content.home.loginButton?.addEventListener("click", loginButtonClicked);
content.home.createAccountButton?.addEventListener("click", createAccountButtonClicked);
content.home.gameButton?.addEventListener("click", toGame);

content.login.loginButtonLoginMenu?.addEventListener("click", loginButtonLoginMenuClicked);
content.login.createAccountButtonLoginMenu?.addEventListener("click", createAccountButtonLoginMenuClicked);
content.login.gameButton?.addEventListener("click", toGame);

content.createAccount.loginButtonCreateAccountMenu?.addEventListener("click", loginButtonCreateAccountMenuClicked);
content.createAccount.createAccountButtonCreateAccountMenu?.addEventListener("click", createAccountButtonCreateAccountMenuClicked);
content.createAccount.gameButton?.addEventListener("click", toGame);

content.end.userButtonMenu?.addEventListener("click", userButtonMenuClicked);
content.end.xButtonAccountmenu?.addEventListener("click", userButtonMenuClicked);
content.end.copyButtonSha256User?.addEventListener("click", copyButtonSha256UserClicked);
content.end.copyButtonSha256Password?.addEventListener("click", copyButtonSha256PasswordClicked);
content.end.gameButtonAccountMenu?.addEventListener("click", gameButtonAccountMenuClicked);