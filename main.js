const title = localStorage.getItem("title") || "Google";
const favicon = localStorage.getItem("faviconUrl") || "https://www.google.com/favicon.ico";
const keybind = localStorage.getItem("keybind") || "v";
const keybindUrl = localStorage.getItem("keybindUrl") || "https://www.google.com/";

function load() {
    document.title = title;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
    }
    link.href = favicon ;

    document.addEventListener('keydown', event => {
        if (event.key === keybind) {
            window.open(keybindUrl, '_blank');
        }
    });
}

document.addEventListener('DOMContentLoaded', load);
