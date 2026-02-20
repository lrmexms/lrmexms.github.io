const el = {
    name: document.getElementById('name'),
    textcolor: document.getElementById('text-color'),
    backgroundColor: document.getElementById('background-color'),
    generatePageButton: document.getElementById('generate-page-button')
}

let ele = {
    link1: {
        text: document.getElementById('text-link-1'),
        url: document.getElementById('url-link-1')
    },
    link2: {
        text: document.getElementById('text-link-2'),
        url: document.getElementById('url-link-2')
    },
    link3: {
        text: document.getElementById('text-link-3'),
        url: document.getElementById('url-link-3')
    },
    link4: {
        text: document.getElementById('text-link-4'),
        url: document.getElementById('url-link-4')
    },
    link5: {
        text: document.getElementById('text-link-5'),
        url: document.getElementById('url-link-5')
    },
    link6: {
        text: document.getElementById('text-link-6'),
        url: document.getElementById('url-link-6')
    },
    link7: {
        text: document.getElementById('text-link-7'),
        url: document.getElementById('url-link-7')
    },
    link8: {
        text: document.getElementById('text-link-8'),
        url: document.getElementById('url-link-8')
    },
    link9: {
        text: document.getElementById('text-link-9'),
        url: document.getElementById('url-link-9')
    },
    link10: {
        text: document.getElementById('text-link-10'),
        url: document.getElementById('url-link-10')
    },
}

function generatePageButtonClicked() {
    if (!el.name.value) { alert('Invalid name'); return; }

    const url = {
        name: encodeURIComponent(el.name.value),

        link1: {
            text: encodeURIComponent(!ele.link1.text.value || !ele.link1.url.value ? 'erroNãoBote' : ele.link1.text.value),
            url: encodeURIComponent(!ele.link1.text.value || !ele.link1.url.value ? 'erroNãoBote' : ele.link1.url.value)
        },
        link2: {
            text: encodeURIComponent(!ele.link2.text.value || !ele.link2.url.value ? 'erroNãoBote' : ele.link2.text.value),
            url: encodeURIComponent(!ele.link2.text.value || !ele.link2.url.value ? 'erroNãoBote' : ele.link2.url.value)
        },
        link3: {
            text: encodeURIComponent(!ele.link3.text.value || !ele.link3.url.value ? 'erroNãoBote' : ele.link3.text.value),
            url: encodeURIComponent(!ele.link3.text.value || !ele.link3.url.value ? 'erroNãoBote' : ele.link3.url.value)
        },
        link4: {
            text: encodeURIComponent(!ele.link4.text.value || !ele.link4.url.value ? 'erroNãoBote' : ele.link4.text.value),
            url: encodeURIComponent(!ele.link4.text.value || !ele.link4.url.value ? 'erroNãoBote' : ele.link4.url.value)
        },
        link5: {
            text: encodeURIComponent(!ele.link5.text.value || !ele.link5.url.value ? 'erroNãoBote' : ele.link5.text.value),
            url: encodeURIComponent(!ele.link5.text.value || !ele.link5.url.value ? 'erroNãoBote' : ele.link5.url.value)
        },
        link6: {
            text: encodeURIComponent(!ele.link6.text.value || !ele.link6.url.value ? 'erroNãoBote' : ele.link6.text.value),
            url: encodeURIComponent(!ele.link6.text.value || !ele.link6.url.value ? 'erroNãoBote' : ele.link6.url.value)
        },
        link7: {
            text: encodeURIComponent(!ele.link7.text.value || !ele.link7.url.value ? 'erroNãoBote' : ele.link7.text.value),
            url: encodeURIComponent(!ele.link7.text.value || !ele.link7.url.value ? 'erroNãoBote' : ele.link7.url.value)
        },
        link8: {
            text: encodeURIComponent(!ele.link8.text.value || !ele.link8.url.value ? 'erroNãoBote' : ele.link8.text.value),
            url: encodeURIComponent(!ele.link8.text.value || !ele.link8.url.value ? 'erroNãoBote' : ele.link8.url.value)
        },
        link9: {
            text: encodeURIComponent(!ele.link9.text.value || !ele.link9.url.value ? 'erroNãoBote' : ele.link9.text.value),
            url: encodeURIComponent(!ele.link9.text.value || !ele.link9.url.value ? 'erroNãoBote' : ele.link9.url.value)
        },
        link10: {
            text: encodeURIComponent(!ele.link10.text.value || !ele.link10.url.value ? 'erroNãoBote' : ele.link10.text.value),
            url: encodeURIComponent(!ele.link10.text.value || !ele.link10.url.value ? 'erroNãoBote' : ele.link10.url.value)
        },

        textColor: encodeURIComponent(!el.textcolor.value ? '#eaeaea' : el.textcolor.value),
        backgroundColor: encodeURIComponent(!el.backgroundColor.value ? '#0f0d16' : el.backgroundColor.value),
    };

    window.location.href =
        `app.html?name=${url.name}` +
        `&linkText1=${url.link1.text}` +
        `&linkUrl1=${url.link1.url}` +
        `&linkText2=${url.link2.text}` +
        `&linkUrl2=${url.link2.url}` +
        `&linkText3=${url.link3.text}` +
        `&linkUrl3=${url.link3.url}` +
        `&linkText4=${url.link4.text}` +
        `&linkUrl4=${url.link4.url}` +
        `&linkText5=${url.link5.text}` +
        `&linkUrl5=${url.link5.url}` +
        `&linkText6=${url.link6.text}` +
        `&linkUrl6=${url.link6.url}` +
        `&linkText7=${url.link7.text}` +
        `&linkUrl7=${url.link7.url}` +
        `&linkText8=${url.link8.text}` +
        `&linkUrl8=${url.link8.url}` +
        `&linkText9=${url.link9.text}` +
        `&linkUrl9=${url.link9.url}` +
        `&linkText10=${url.link10.text}` +
        `&linkUrl10=${url.link10.url}` +
        `&text-color=${url.textColor}` +
        `&background-color=${url.backgroundColor}`;
}

el.generatePageButton?.addEventListener("click", generatePageButtonClicked);