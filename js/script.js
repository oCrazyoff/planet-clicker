// Elementos da página
const btnClick = document.getElementById('btn-click');
const countPlanetas = document.getElementById('count-planetas');
const countPlanetasPassivo = document.getElementById('count-planetas-passivo');
const valorClique = document.getElementById('valor-clique');
const btnPoderes = document.querySelectorAll('.btn-poder');
const btnUpgrades = document.querySelectorAll('.btn-upgrade');
const menuPoderes = document.getElementById('menu-poderes');
const menuUpgrades = document.getElementById('menu-upgrades');
const countPoderes = document.querySelectorAll('.count-poder .count');
const precoPoderElements = document.querySelectorAll('.preco-poder');
const ganhoPoderElements = document.querySelectorAll('.ganho-poder');
const precoUpgradeElements = document.querySelectorAll('.preco-upgrade');
const ganhoUpgradeElements = document.querySelectorAll('.ganho-upgrade');
const infoUpgradeBaixo = document.querySelectorAll('.btn-upgrade .container-info .baixo');

// Variáveis do jogo
let planetas = 0;
let planetasPassivos = 0;
let valorDeClique = 1;
let poderes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array de poderes
let precoPoderes = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000]; // Preços dos poderes
let ganhoPoderes = [1, 1, 10, 10, 50, 50, 150, 150, 300, 300]; // Ganhos por poder
let upgrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array de upgrades
let precoUpgrades = [50000, 150000, 500000, 750000, 900000, 1000000, 1100000, 1500000, 2000000, 2500000]; // Preços de upgrades
let ganhoUpgrades = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // Ganhos em % dos upgrades

// Salvar progresso no localStorage
function salvarProgresso(){
    localStorage.setItem('planetas', planetas);
    localStorage.setItem('planetasPassivos', planetasPassivos);
    localStorage.setItem('valorDeClique', valorDeClique);
    localStorage.setItem('poderes', JSON.stringify(poderes));
    localStorage.setItem('precoPoderes', JSON.stringify(precoPoderes));
    localStorage.setItem('ganhoPoderes', JSON.stringify(ganhoPoderes));
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
        poderes = JSON.parse(localStorage.getItem('poderes'));
        precoPoderes = JSON.parse(localStorage.getItem('precoPoderes'));
        ganhoPoderes = JSON.parse(localStorage.getItem('ganhoPoderes'));
        upgrades = JSON.parse(localStorage.getItem('upgrades'));
        precoUpgrades = JSON.parse(localStorage.getItem('precoUpgrades'));
        ganhoUpgrades = JSON.parse(localStorage.getItem('ganhoUpgrades'));
    }
}

 // Função de formatação personalizada
 function formatarNumero(numero) {
    const unidades = ["", "Mil", "Milhões", "Bilhões", "Trilhões", "Quadrilhões"];
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
    valorClique.textContent = formatarNumero(valorDeClique);

    // Atualizar poderes
    btnPoderes.forEach((btn, index) => {
        const precoPoder = precoPoderes[index];
        const ganhoPoder = ganhoPoderes[index];

        // Atualizar o preço e o ganho
        precoPoderElements[index].innerHTML = "<i class='bi bi-globe-americas'></i> " + formatarNumero(precoPoder);

        if (index % 2 === 0) {
            var iconeGanho = " <i class='bi bi-hand-index'></i>";
        } else {
            var iconeGanho = " <i class='bi bi-clock-history'></i>";
        }

        ganhoPoderElements[index].innerHTML = "+ " + formatarNumero(ganhoPoder) + iconeGanho;

        // Atualizar a contagem do poder
        countPoderes[index].textContent = poderes[index];

        // Desativando e escondendo conforme o preço
        btn.classList.toggle("inativo", planetas < precoPoder);
        btn.classList.toggle("hide", planetas*5 < precoPoder && poderes[index] === 0);
    });

    // Atualizar upgrades
    btnUpgrades.forEach((btn, index) =>{
        const precoUpgrade = precoUpgrades[index];

        // Atualizar o preço e o ganho
        precoUpgradeElements[index].textContent = formatarNumero(precoUpgrade);
        ganhoUpgradeElements[index].textContent = ganhoUpgrades[index];

        // Atualizar css conforme o lvl
        if (upgrades[index] === 0) {
            btn.classList.add("lvl1");
        } else if (upgrades[index] === 1) {
            btn.classList.add("lvl2");
            btn.classList.remove("lvl1");
        } else if (upgrades[index] === 2) {
            btn.classList.add("lvl3");
            btn.classList.remove("lvl2");
        } else if (upgrades[index] === 3) {
            infoUpgradeBaixo[index].textContent = "MÁXIMO";
            btn.classList.add("lvl3");
            infoUpgradeBaixo[index].style.justifyContent = "center";
            btn.style.pointerEvents = "none";
        }

        // Desativando e escondendo conforme o preço
        if (upgrades[index] != 3) {
            btn.classList.toggle("inativo", planetas < precoUpgrade);
            btn.classList.toggle("hide", planetas*5 < precoUpgrade && upgrades[index] === 0);
        }
        
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

// Lógica do DEBUG
document.getElementById('btn-debug').addEventListener('click', () =>{
    const senha = prompt("Digite a senha: ");

    if (senha === '123@adm'){
        abrirMenuDebug();
    } else {
        alert("Senha incorreta!");
    }
});

document.getElementById('fechar').addEventListener('click', () =>{
    document.querySelector(".debug-menu").style.display = 'none';
});

function abrirMenuDebug() {
    document.querySelector(".debug-menu").style.display = 'block';
}

document.getElementById('btn-hack').addEventListener('click', () =>{
    planetas += 500000;

    atualizarInterface();
});

// Lógica de compra de poderes
btnPoderes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (planetas >= precoPoderes[index]) {
            // Comprar poder
            planetas -= precoPoderes[index];
            poderes[index] += 1;

            // Atualizar o valor de clique ou o ganho passivo, dependendo do tipo de poder
            if (index % 2 === 0) {
                valorDeClique += ganhoPoderes[index]; // Aumenta o valor do clique
            } else {
                planetasPassivos += ganhoPoderes[index]; // Aumenta o ganho passivo
            }

            // Aumentar o preço do poder e o ganho
            precoPoderes[index] = Math.floor(precoPoderes[index] * 1.5);
            ganhoPoderes[index] += 1;

            // Atualizar a interface
            atualizarInterface();
            salvarProgresso();
        }
    });
});

// Lógica de comprar os upgrades
btnUpgrades.forEach((btn, index) =>{
    btn.addEventListener('click', () =>{
        if (planetas >= precoUpgrades[index]){
            // Comprar upgrade
            planetas -= precoUpgrades[index];
            upgrades[index] += 1;

            // Atualizar o multiplicador e o ganho
            let multiplicador = 1;
            if (upgrades[index] === 1) {
                multiplicador = 1.5;
                ganhoUpgrades[index] = 100;
            } else if (upgrades[index] === 2) {
                multiplicador = 2;
                ganhoUpgrades[index] = 200;
            } else if (upgrades[index] === 3) {
                multiplicador = 3;
            }

            // Aplicar melhoria
            ganhoPoderes[index] *= multiplicador;

            // Atualizar o preço
            precoUpgrades[index] *= 1.8;

            // Atualizar a interface
            atualizarInterface();
            salvarProgresso();
        }
    });
});

// Lógica de trocar menus
const containerPoderes = document.querySelector('.container-poderes');
const containerUpgrades = document.querySelector('.container-upgrades');
menuPoderes.addEventListener('click', () => {
    containerUpgrades.classList.add('desativado');
    containerPoderes.classList.remove('desativado');
    menuPoderes.style.backgroundColor = "#000";
    menuUpgrades.style.backgroundColor = "#393939";
});

menuUpgrades.addEventListener('click', () =>{
    containerUpgrades.classList.remove('desativado');
    containerPoderes.classList.add('desativado');
    menuUpgrades.style.backgroundColor = "#000";
    menuPoderes.style.backgroundColor = "#393939";
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

