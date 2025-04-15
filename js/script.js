// ==================== Dados do Jogo ====================
// Pode ser movido para um arquivo chamado `gameData.js`
const planetasProgresso = [
    { nome: 'Zypharion', img: "https://cdn-icons-png.flaticon.com/512/3327/3327324.png", meta: 20000, ganhoPassivo: 0, ganhoClique: 0 },
    { nome: 'Nexaris', img: "https://cdn-icons-png.flaticon.com/512/6989/6989417.png", meta: 150000, ganhoPassivo: 0, ganhoClique: 10 },
    { nome: 'Voltrion', img: "https://cdn-icons-png.flaticon.com/512/2739/2739628.png", meta: 700000, ganhoPassivo: 10, ganhoClique: 0 },
    { nome: 'Xandoria', img: "https://static.vecteezy.com/system/resources/previews/024/596/370/non_2x/pink-planet-illustration-free-png.png", meta: 1500000, ganhoPassivo: 5, ganhoClique: 10 },
    { nome: 'Cryzalis', img: "https://cdn-icons-png.flaticon.com/512/1789/1789829.png", meta: 5000000, ganhoPassivo: 0, ganhoClique: 10 },
    { nome: 'Drakoris', img: "https://cdn-icons-png.flaticon.com/512/433/433845.png", meta: 10000000, ganhoPassivo: 15, ganhoClique: 5 },
    { nome: 'Velmora', img: "https://i.pinimg.com/originals/73/f0/b3/73f0b3408c7d0bc312b0fb2d9fe9f4cb.png", meta: 50000000, ganhoPassivo: 10, ganhoClique: 10 },
    { nome: 'Terra', img: "https://cdn-icons-png.flaticon.com/512/5088/5088964.png", meta: 100000000, ganhoPassivo: 20, ganhoClique: 25 },
    { nome: 'Thalvax', img: "https://cdn-icons-png.flaticon.com/512/2949/2949036.png", meta: 200000000, ganhoPassivo: 25, ganhoClique: 15 },
    { nome: 'Eldryon', img: "https://cdn-icons-png.flaticon.com/512/6967/6967700.png", meta: 0, ganhoPassivo: 30, ganhoClique: 30 },
];

// ==================== Variáveis do Jogo ====================
let planetas = 0;
let planetaAtual = 0;
let upgradePlanetaClique = 0;
let upgradePlanetaPassivo = 0;
let planetasPassivos = 0;
let valorDeClique = 1;
let poderes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let precoPoderes = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000];
let ganhoPoderes = [1, 1, 10, 10, 50, 50, 150, 150, 300, 300];
let upgrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let precoUpgrades = [50000, 150000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 5000000, 10000000];
let ganhoUpgrades = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
let jogadorClicouNoPlaneta = false;

// Atualize o evento de clique no planeta
btnClick.addEventListener('click', (event) => {
    if (!jogadorClicouNoPlaneta) {
        jogadorClicouNoPlaneta = true; // Marca que o jogador clicou no planeta
        iniciarOvni(); // Inicia o ciclo do OVNI
    }

    planetas += valorDeClique + (upgradePlanetaClique / 100);
    pontosProgresso += valorDeClique;

    // Animação de clique
    btnClick.style.animation = "none";
    void btnClick.offsetWidth;
    btnClick.style.animation = ".5s click alternate";

    // Som
    const somClique = document.getElementById('som-click-principal');
    somClique.currentTime = 0;
    somClique.play();

    // Criar vários valores de clique
    for (let i = 0; i < 5; i++) {
        const valorElemento = document.createElement('div');
        valorElemento.classList.add('valor-clique');
        valorElemento.textContent = `+${formatarNumero(valorDeClique + (upgradePlanetaClique / 100))}`;

        // Capturar a posição do mouse antes de adicionar o elemento
        const posX = event.clientX;
        const posY = event.clientY;

        // Aguarda para definir as posições do valor
        setTimeout(() => {
            valorElemento.style.left = `${posX}px`;
            valorElemento.style.top = `${posY}px`;

            // Adicionar o valor à página
            document.body.appendChild(valorElemento);

            setTimeout(() => {
                valorElemento.style.animation = 'subir 1s ease-out forwards';
            }, 100);

            // Remover o valor após a animação
            setTimeout(() => {
                valorElemento.remove();
            }, 1000);
        }, 10);

    }

    atualizarInterface();
    salvarProgresso();
});

// ==================== Ganho Passivo ====================
function ganharPlanetasPassivos() {
    planetas += (planetasPassivos / 10) + (upgradePlanetaPassivo / 100);
    pontosProgresso += planetasPassivos;
    atualizarInterface();
    salvarProgresso();
}