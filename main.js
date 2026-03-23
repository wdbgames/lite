const global = {
	container: document.getElementById("container")
}

function createContainer() {
	if(!global.container) {
		global.container = document.createElement("div");
		global.container.className = "container";
		document.body.appendChild(global.container);
	}
}

// RENAME THINGS
function createBox(id, title, url) {
	const box = document.createElement("div");
	box.className = "box";

	const img = document.createElement("img");
	img.src = `temp/${id}.png`;
	img.onerror = () => {
		img.src = "temp/error.png";
	}
	box.appendChild(img);
	
	const a = document.createElement("a");
	a.textContent = title;
	a.href = url;
	box.appendChild(a);
	
	global.container.appendChild(box);
}

async function loadWDBG() {
	createContainer();
	fetch("json/wdbg.json")
		.then(response => response.json())
		.then(data => {
			data.forEach(box => {
				createBox(box.id, box.title, "https://example.com/");
			});
		})
		.catch(error => console.error(error));
	
}

async function loadGN() {
}

async function loadCMG() {
}

loadWDBG();