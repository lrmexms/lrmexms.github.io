const el = {
    fundo: document.getElementById("content"),
    contador: document.getElementById("contador")
}

let clicks = 0

function click() {
    clicks += 1
    el.contador.innerText = `Click: ${clicks}`
}

el.fundo?.addEventListener("click", click)

document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        click()
    }
})