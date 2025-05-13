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
const btn = document.querySelector("#btn");
const typeLabel = document.querySelector(".type-label");
const searchInput = document.querySelector("#searchInput");

async function fetchPokemon(query) {
  try {
    const response = await fetch(URL + String(query).toLowerCase().trim());
    if (!response.ok) throw new Error("Not found");

    const data = await response.json();
    fullName.innerText = `#${data.id} ${data.name}`;
    hp.innerText = data.stats[0].base_stat;
    attack.innerText = data.stats[1].base_stat;
    defense.innerText = data.stats[2].base_stat;
    speed.innerText = data.stats[5].base_stat;

    img.setAttribute("src", data.sprites.other.dream_world.front_default);
    img.setAttribute("alt", data.name);

    const primaryType = data.types[0].type.name;
    const themeColor = typeColor[primaryType] || "#ccc";

    typeLabel.innerText = primaryType;
    typeLabel.style.backgroundColor = themeColor;

    styleCard(themeColor);

  } catch (err) {
    console.error("Failed to fetch Pokémon data:", err);
    fullName.innerText = "Not Found!";
    // img.setAttribute("src", "https://via.placeholder.com/150");
    img.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png");

    hp.innerText =
      attack.innerText =
      defense.innerText =
      speed.innerText =
        "N/A";
    styleCard("#ff6b6b");
  }
}

const styleCard = (color) => {
  card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
};

btn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchPokemon(query);
    searchInput.value = "";
  } else {
    const randomId = Math.floor(Math.random() * 150) + 1;
    fetchPokemon(randomId);
  }
});

window.addEventListener("load", () => {
  const randomId = Math.floor(Math.random() * 150) + 1;
  fetchPokemon(randomId);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});
