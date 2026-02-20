const postionDisplay = document.getElementById('position-display')

document.addEventListener("mousemove", function(e) {
    const x = e.clientX;
    const y = e.clientY;
    flashlight.style.background = `
        radial-gradient(
            circle 150px at ${x}px ${y}px,
            transparent 0%,
            rgba(0, 0, 0, 0.95) 80%
        )
    `;
    const width = window.innerWidth;
    const height = window.innerHeight;
    postionDisplay.innerHTML = `X: (${x}/${width})<br>Y: (${y}/${height})`
});


alert('A mouse is required/È necessário um mouse.')
