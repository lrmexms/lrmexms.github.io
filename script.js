const gEl = {
    twitterButtonMenu: document.querySelector(".twitter-button-menu"),
    instagramButtonMenu: document.querySelector(".instagram-button-menu"),
    githubButtonMenu: document.querySelector(".github-button-menu")
};

const gCVars = {
    twitter: "https://x.com",
    instagram: "https://instagram.com",
    github: "https://github.com"
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function copy(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log("Text copied:", text)
        })
        .catch(err => {
            console.errp("Error copying:", err)
        })
}

gEl.twitterButtonMenu?.addEventListener("click", () => {
    window.open(gCVars.twitter, "_blank");
});

gEl.instagramButtonMenu?.addEventListener("click", () => {
    window.open(gCVars.instagram, "_blank");
});

gEl.githubButtonMenu?.addEventListener("click", () => {
    window.open(gCVars.github, "_blank");
});