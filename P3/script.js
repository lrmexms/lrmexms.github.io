window.onload = () => {
    setInterval(() => {
        document.getElementById('clock').innerText =
            new Date().toLocaleTimeString("pt-BR");
    }, 1000);
};
