const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
};

const URL = "https://pokeapi.co/api/v2/pokemon/";
const card = document.querySelector(".card");
const fullName = document.querySelector(".name");
const attack = document.querySelector(".attack");
const defense = document.querySelector(".defense");
const speed = document.querySelector(".speed");
const img = document.querySelector("img");
const hp = document.querySelector(".HP-value");
const btn = document.querySelector("button")

async function pokeApi() {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalUrl = URL + id;
    let response = await fetch(finalUrl);
    let data = await response.json();
    fullName.innerText = data.name;
    attack.innerText = data.stats[1].base_stat;
    defense.innerText = data.stats[2].base_stat;
    speed.innerText = data.stats[5].base_stat;
    hp.innerText = data.stats[0].base_stat;
    img.setAttribute("src", data.sprites.other.dream_world.front_default);
    const themeColor = typeColor[data.types[0].type.name];
    styleCard(themeColor);
}

let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
};

btn.addEventListener("click", pokeApi);
window.addEventListener("load", pokeApi);
