const global = {
	navbar: document.getElementById("navbar"),
	container: document.getElementById("container"),
	btn: 0
}

function createBtn(id, title, url) {
	const btn = document.createElement("button");
	btn.textContent = title;
	btn.className = "navbar-button";
	btn.onclick = () => {
		global.container.innerHTML = null;
		global.btn = id;
		switch(id) {
			case 0:
				loadWDBG();
			break;
			case 1:
				loadGN();
			break;
			case 2:
				loadCMG();
			break;
		}
 	}
	global.navbar.appendChild(btn);
			  
	if(url) {
		// SETTINGS LOGIC
	}
}

function createBox(imgSrc, title, url) {
	const box = document.createElement("div");
	box.className = "box";

	const img = document.createElement("img");
	img.src = imgSrc;
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

function load() {
	createBtn(0, "WDBG");
	createBtn(1, "GN");
	createBtn(2, "CMG");
	loadWDBG();
}

async function loadWDBG() {
	fetch("json/wdbg.json")
		.then(response => response.json())
		.then(data => {
			data.forEach(box => {
				createBox(`temp/${box.id}.png`, box.title, `embed.html?id=${box.id}&t=0`);
			});
		})
		.catch(error => console.error(error));
}

async function loadGN() {
	try {
		const response = await fetch("https://cdn.jsdelivr.net/gh/gn-math/assets/zones.json");
		const zones = await response.json();
		zones.forEach(zone => {
			const imgSrc = zone.cover.replace("{COVER_URL}", "https://cdn.jsdelivr.net/gh/gn-math/covers@main");
			const title = zone.name;
			const url = `embed.html?id=${zone.id}&t=1`;
			createBox(imgSrc, title, url)
		});
	} catch (error) {
		console.error(error);
	}
}

async function loadCMG() {
	try {
		const response = await fetch("json/cmatgame_games_with_levels.json");
		const cmatgame_games_with_levels = await response.json();
		
		let ids = [
			...(cmatgame_games_with_levels.trendy || []),
			...(cmatgame_games_with_levels.top9 || []),
		].map((id) => String(id).trim());
		ids = [...new Set(ids)];
		
		const boxes = ids
			.map((id) => cmatgame_games_with_levels.game.find((g) => String(g.id) === id))
			.filter(Boolean)
			
		boxes.forEach(game => {
			const imgSrc = `https://www.coolmathgames.com/${game.si}`;
			const title = game.title;
			const url = `embed.html?id=${game.id}&t=2`;
			
			createBox(imgSrc, title, url);
		});
	} catch (error) {
		console.error(error);
	}
}

load();