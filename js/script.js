const input = document.querySelector('#input-name');
const imgdigi = document.querySelector('#img-digi');
const digiTitle = document.querySelector('.card-title');
const digiText = document.querySelector('.card-text');
const dropdownMenuButton = document.getElementById("dropdownMenuButton");
const dropdownMenu = document.getElementById("dropdownMenu");

const fetchAPI = async () => {
const response = await fetch('https://digimon-api.vercel.app/api/digimon');
const data = await response.json();
return data;
};

async function digiAPI() {
const digiArr = await fetchAPI();
const find = digiArr.find(({ name }) => name.toLowerCase() === input.value.toLowerCase());
const { img: imagen, name, level } = find;

digiTitle.innerHTML = name;
digiText.innerText = `${name} Nivel ${level}`;
imgdigi.src = imagen;

displayDigimon([find]);
}

input.addEventListener('change', digiAPI);

window.onload = () => displayDigimon([]);


async function populateDropdown() {
const digimons = await fetchAPI();
const selectSound = document.getElementById('select-sound');

digimons.forEach(digimon => {
    const dropdownItem = document.createElement("div");
    dropdownItem.classList.add("dropdown-item");
    dropdownItem.textContent = digimon.name;

    dropdownItem.addEventListener("click", () => {
    dropdownMenuButton.textContent = digimon.name;
    dropdownMenu.classList.remove("show");
    input.value = digimon.name;
    digiAPI();

    selectSound.currentTime = 0;
    selectSound.play();
    });

    dropdownMenu.appendChild(dropdownItem);
});
}

dropdownMenuButton.addEventListener("click", () => {
dropdownMenu.classList.toggle("show");
});

populateDropdown();