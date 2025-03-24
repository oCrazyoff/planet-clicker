// Elementos da página
const btnClick = document.getElementById('btn-click');
const countPlanetas = document.getElementById('count-planetas');
const countPlanetasPassivo = document.getElementById('count-planetas-passivo');
const valorClique = document.getElementById('valor-clique');
const btnUpgrades = document.querySelectorAll('.btn-upgrade');
const countUpgrades = document.querySelectorAll('.count-upgrade p');
const precoUpgradeElements = document.querySelectorAll('.preco-upgrade');
const ganhoUpgradeElements = document.querySelectorAll('.ganho-upgrade');

// Variáveis do jogo
let planetas = 0;
let planetasPassivos = 0;
let valorDeClique = 1;
let upgrades = [0, 0, 0]; // Array de upgrades
let precoUpgrades = [10, 50, 100]; // Preços dos upgrades
let ganhoUpgrades = [1, 1, 5]; // Ganhos por upgrade

// Salvar progresso no localStorage
function salvarProgresso(){
    localStorage.setItem('planetas', planetas);
    localStorage.setItem('planetasPassivos', planetasPassivos);
    localStorage.setItem('valorDeClique', valorDeClique);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('precoUpgrades', JSON.stringify(precoUpgrades));
    localStorage.setItem('ganhoUpgrades', JSON.stringify(ganhoUpgrades));
}

// Carregar progresso do localStorage
function carregarProgresso(){
    if(localStorage.getItem('planetas')){
        planetas = parseInt(localStorage.getItem('planetas'));
        planetasPassivos = parseInt(localStorage.getItem('planetasPassivos'));
        valorDeClique = parseInt(localStorage.getItem('valorDeClique'));
        upgrades = JSON.parse(localStorage.getItem('upgrades'));
        precoUpgrades = JSON.parse(localStorage.getItem('precoUpgrades'));
        ganhoUpgrades = JSON.parse(localStorage.getItem('ganhoUpgrades'));
    }
}

 // Função de formatação personalizada
 function formatarNumero(numero) {
    const unidades = ["", "Mil", "Milhão", "Bilhão", "Trilhão", "Quadrilhão"];
    const letrasMinusc = 'abcdefghijklmnopqrstuvwxyz';
    const letrasMaiusc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    let unidadeIndex = 0;
    let unidade = '';
    
    while (numero >= 1000 && unidadeIndex < unidades.length - 1) {
        numero /= 1000;
        unidadeIndex++;
    }

    let decimalPart = (numero % 1).toFixed(2).substring(2);  // Pega os decimais com 2 casas decimais
    numero = Math.floor(numero);
    let numeroFormatado = numero.toLocaleString();

    if (decimalPart === "00") {
        decimalPart = "";  // Remove os decimais se forem 00
    }

    if (unidadeIndex > 0) {
        unidade = ' ' + unidades[unidadeIndex];
    }

    if (unidadeIndex >= 4) {
        let base = numero % 26;
        let sequencia = letrasMinusc[base];
        numero = Math.floor(numero / 26);
        let letras = '';
        
        if (numero > 0) {
            letras = letrasMinusc[Math.floor(numero % 26)] + sequencia;
        } else {
            letras = sequencia;
        }

        return letras + (decimalPart ? '.' + decimalPart : '');  // Se houver parte decimal, adiciona
    } 

    return numeroFormatado + (decimalPart ? '.' + decimalPart : '') + unidade;  // Adiciona decimais se houver
}

// Atualizar interface com os valores do jogo
function atualizarInterface() {
    countPlanetas.textContent = formatarNumero(planetas);
    countPlanetasPassivo.textContent = formatarNumero(planetasPassivos);
    valorClique.textContent = valorDeClique;

    btnUpgrades.forEach((btn, index) => {
        const precoUpgrade = precoUpgrades[index];
        const ganhoUpgrade = ganhoUpgrades[index];

        // Atualizar o preço e o ganho
        precoUpgradeElements[index].textContent = formatarNumero(precoUpgrade);
        ganhoUpgradeElements[index].textContent = formatarNumero(ganhoUpgrade);

        // Atualizar a contagem do upgrade
        countUpgrades[index].textContent = upgrades[index];
    });
}

// Lógica de clicar no planeta
btnClick.addEventListener('click', () => {
    planetas += valorDeClique;
    document.querySelector('.valor-clique').style.animation = 'none';
    document.querySelector('.valor-clique').offsetHeight;
    document.querySelector('.valor-clique').style.animation = 'subir 1s ease-out forwards';
    atualizarInterface();
    salvarProgresso();
});

// Lógica de compra de upgrades
btnUpgrades.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (planetas >= precoUpgrades[index]) {
            // Comprar upgrade
            planetas -= precoUpgrades[index];
            upgrades[index] += 1;

            // Atualizar o valor de clique ou o ganho passivo, dependendo do tipo de upgrade
            if (index === 0) { // Mão Robótica
                valorDeClique += ganhoUpgrades[index]; // Aumentar valor de clique
            } else if (index === 1) { // Mineradores
                planetasPassivos += ganhoUpgrades[index]; // Aumentar ganho passivo
            } else if (index === 2) { // Braco mecanico
                valorDeClique += ganhoUpgrades[index];
            } 

            // Aumentar o preço do upgrade e o ganho
            precoUpgrades[index] = Math.floor(precoUpgrades[index] * 1.5);
            ganhoUpgrades[index] += 1;

            // Atualizar a interface
            atualizarInterface();
            salvarProgresso();
        }
    });
});

// Lógica de ganho passivo
function ganharPlanetasPassivos() {
    planetas += planetasPassivos; // Adicionar o valor do ganho passivo
    atualizarInterface();
    salvarProgresso();
}

// Atualização do progresso passivo
setInterval(ganharPlanetasPassivos, 1000);

// Carregar o progresso ao iniciar o jogo
carregarProgresso();
atualizarInterface();

