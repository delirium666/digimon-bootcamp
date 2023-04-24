const apiUrl = 'https://digimon-api.vercel.app/api/digimon';

function fetchDigimon(digimonName) {
fetch(`${apiUrl}/name/${digimonName}`)
    .then(response => response.json())
    .then(data => {
    displayDigimon(data);
    })
    .catch(error => {
    console.error('Error:', error);
    });
}

function displayDigimon(digimonArray) {
const container1 = document.getElementById('container1');
container1.innerHTML = '';

digimonArray.forEach(digimon => {
    const digimonCard = `
    <div class="card" id="digi${digimon.id}">
        <img class="card-img-top" src="${digimon.img}" id="img-digi">
        <div class="card-body">
        <h5 class="card-title">${digimon.name}</h5>
        <p class="card-text">Nivel: ${digimon.level}</p>
        
        </div>
    </div>
    `;
    container1.innerHTML += digimonCard;
});
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
const inputName = document.getElementById('input-name').value;
fetchDigimon(inputName);
});

function showDetails(digimonId) {
const digimonCard = document.getElementById(`digi${digimonId}`);
const digimonDetails = `
    <div class="card-body">
    <h5 class="card-title">${digimonCard.querySelector('.card-title').textContent}</h5>
    <p class="card-text">${digimonCard.querySelector('.card-text').textContent}</p>
    <p class="card-text">Tipo: ${digimonCard.querySelector('.card-subtitle').textContent}</p>
    <p class="card-text">Ataque: ${digimonCard.querySelector('.card-text-attack').textContent}</p>
    <p class="card-text">Defensa: ${digimonCard.querySelector('.card-text-defense').textContent}</p>
    /div>
`;
digimonCard.innerHTML = digimonDetails;
}

function hideDetails(digimonId) {
const digimonCard = document.getElementById(`digi${digimonId}`);
digimonCard.innerHTML = `
    <img class="card-img-top" src="${digimonCard.querySelector('.card-img-top').src}" id="img-digi">
    <div class="card-body">
    <h5 class="card-title">${digimonCard.querySelector('.card-title').textContent}</h5>
    <p class="card-text">${digimonCard.querySelector('.card-text').textContent}</p>
    <a href="#" class="btn btn-primary" onclick="showDetails(${digimonId})">Mostrar detalles</a>
    </div>
`;
}
