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
const barraProgressoElement = document.getElementById('barra-progresso');
const ganhoPlanetaPassivoElement = document.getElementById('ganho-planeta-passivo');
const ganhoPlanetaCliqueElement = document.getElementById('ganho-planeta-clique');
const containerBuffPlaneta = document.querySelector('.container-buff-planeta');

// Progresso de planetas (os ganhos devem ser em porcentagem)
const planetasProgresso = [
    { img: "https://cdn-icons-png.flaticon.com/512/3327/3327324.png", meta: 10000, ganhoPassivo: 0, ganhoClique: 0 },
    { img: "https://cdn-icons-png.flaticon.com/512/6989/6989417.png", meta: 100000, ganhoPassivo: 0, ganhoClique: 50 },
    { img: "https://cdn-icons-png.flaticon.com/512/2739/2739628.png", meta: 500000, ganhoPassivo: 50, ganhoClique: 0 },
    { img: "https://static.vecteezy.com/system/resources/previews/024/596/370/non_2x/pink-planet-illustration-free-png.png", meta: 1000000, ganhoPassivo: 10, ganhoClique: 50 },
    { img: "https://cdn-icons-png.flaticon.com/512/1789/1789829.png", meta: 5000000, ganhoPassivo: 0, ganhoClique: 70 },
    { img: "https://cdn-icons-png.flaticon.com/512/433/433845.png", meta: 10000000, ganhoPassivo: 0, ganhoClique: 100 },
    { img: "https://i.pinimg.com/originals/73/f0/b3/73f0b3408c7d0bc312b0fb2d9fe9f4cb.png", meta: 50000000, ganhoPassivo: -50, ganhoClique: 100 },
    { img: "https://cdn-icons-png.flaticon.com/512/5088/5088964.png", meta: 100000000, ganhoPassivo: 100, ganhoClique: 100 },
    { img: "https://cdn-icons-png.flaticon.com/512/2949/2949036.png", meta: 500000000, ganhoPassivo: -100, ganhoClique: 200 },
    { img: "https://cdn-icons-png.flaticon.com/512/6967/6967700.png", meta: 1000000000, ganhoPassivo: 200, ganhoClique: 200 },
];

// Variáveis do jogo
let planetas = 0;
let planetaAtual = 0;
let upgradePlanetaClique = 0;
let upgradePlanetaPassivo = 0;
let planetasPassivos = 0;
let valorDeClique = 1;
let poderes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array de poderes
let precoPoderes = [10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000]; // Preços dos poderes
let ganhoPoderes = [1, 1, 10, 10, 50, 50, 150, 150, 300, 300]; // Ganhos por poder
let upgrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Array de upgrades
let precoUpgrades = [50000, 150000, 500000, 750000, 900000, 1000000, 1100000, 1500000, 2000000, 2500000]; // Preços de upgrades
let ganhoUpgrades = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // Ganhos em % dos upgrades

// Salvar progresso no localStorage
function salvarProgresso() {
    localStorage.setItem('planetas', planetas);
    localStorage.setItem('planetasPassivos', planetasPassivos);
    localStorage.setItem('valorDeClique', valorDeClique);
    localStorage.setItem('poderes', JSON.stringify(poderes));
    localStorage.setItem('precoPoderes', JSON.stringify(precoPoderes));
    localStorage.setItem('ganhoPoderes', JSON.stringify(ganhoPoderes));
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('precoUpgrades', JSON.stringify(precoUpgrades));
    localStorage.setItem('ganhoUpgrades', JSON.stringify(ganhoUpgrades));
    localStorage.setItem('planetaAtual', JSON.stringify(planetaAtual));
    localStorage.setItem('upgradePlanetaClique', JSON.stringify(upgradePlanetaClique));
    localStorage.setItem('upgradePlanetaPassivo', JSON.stringify(upgradePlanetaPassivo));
}

// Carregar progresso do localStorage
function carregarProgresso() {
    if (localStorage.getItem('planetas')) {
        planetas = parseInt(localStorage.getItem('planetas'));
        planetasPassivos = parseInt(localStorage.getItem('planetasPassivos'));
        valorDeClique = parseInt(localStorage.getItem('valorDeClique'));
        poderes = JSON.parse(localStorage.getItem('poderes'));
        precoPoderes = JSON.parse(localStorage.getItem('precoPoderes'));
        ganhoPoderes = JSON.parse(localStorage.getItem('ganhoPoderes'));
        upgrades = JSON.parse(localStorage.getItem('upgrades'));
        precoUpgrades = JSON.parse(localStorage.getItem('precoUpgrades'));
        ganhoUpgrades = JSON.parse(localStorage.getItem('ganhoUpgrades'));
        planetaAtual = JSON.parse(localStorage.getItem('planetaAtual'));
        upgradePlanetaClique = JSON.parse(localStorage.getItem('upgradePlanetaClique'));
        upgradePlanetaPassivo = JSON.parse(localStorage.getItem('upgradePlanetaPassivo'));
    }
}

// Função de formatação personalizada
function formatarNumero(numero) {
    const unidades = ["", "Mil", "Milhões", "Bilhões", "Trilhões", "Quadrilhões"];
    const letrasMinusc = 'abcdefghijklmnopqrstuvwxyz';

    let unidadeIndex = 0;
    let unidade = '';

    // Divide o número para encontrar a unidade adequada
    while (numero >= 1000 && unidadeIndex < unidades.length - 1) {
        numero /= 1000;
        unidadeIndex++;
    }

    // Pega a parte decimal (se houver) e formata para 2 casas
    let decimalPart = (numero % 1).toFixed(2).substring(2);
    numero = Math.floor(numero); // Remover a parte decimal para números maiores

    let numeroFormatado = numero.toLocaleString();

    // Se não houver parte decimal ou for igual a "00", não mostrar decimais
    if (decimalPart === "00") {
        decimalPart = "";
    }

    // Aplica a unidade adequada (Mil, Milhões, etc.)
    if (unidadeIndex > 0) {
        unidade = ' ' + unidades[unidadeIndex];
    }

    // Após "Quadrilhões", utiliza letras
    if (unidadeIndex >= 5) {
        let base = numero % 26;
        let sequencia = letrasMinusc[base];
        numero = Math.floor(numero / 26);
        let letras = '';

        if (numero > 0) {
            letras = letrasMinusc[Math.floor(numero % 26)] + sequencia;
        } else {
            letras = sequencia;
        }

        // Retorna a letra combinada sem a parte decimal
        return letras;
    }

    // Retorna o número formatado com ou sem decimais, dependendo da necessidade
    return numeroFormatado + (decimalPart ? '.' + decimalPart : '') + unidade;
}

// Atualizar interface com os valores do jogo
function atualizarInterface() {
    countPlanetas.textContent = formatarNumero(planetas);
    countPlanetasPassivo.textContent = formatarNumero(planetasPassivos) + "/s";
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
        btn.classList.toggle("hide", planetas * 5 < precoPoder && poderes[index] === 0);
    });

    // Atualizar upgrades
    btnUpgrades.forEach((btn, index) => {
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
            btn.classList.toggle("hide", planetas * 5 < precoUpgrade && upgrades[index] === 0);
        }

    });

    // Atualizar o planeta atual e valores do ganho
    const imgPlaneta = document.querySelector('#btn-click img');
    if (imgPlaneta && planetasProgresso[planetaAtual]) {
        imgPlaneta.src = planetasProgresso[planetaAtual].img; // Atualiza o src da imagem
    }

    // Exibir ou ocultar containerBuffPlaneta
    containerBuffPlaneta.style.display = (upgradePlanetaPassivo || upgradePlanetaClique) ? "flex" : "none";

    // Atualizar os valores do ganho
    ganhoPlanetaCliqueElement.innerHTML = upgradePlanetaClique ? `<i class="bi bi-hand-index-thumb"></i> + ${upgradePlanetaClique}%` : "";
    ganhoPlanetaPassivoElement.innerHTML = upgradePlanetaPassivo ? `<i class="bi bi-clock-history"></i> + ${upgradePlanetaPassivo}%` : "";
}

// Lógica de clicar no planeta
btnClick.addEventListener('click', (event) => {
    planetas += valorDeClique;

    console.log(upgradePlanetaClique);
    console.log(upgradePlanetaPassivo);

    // Criar vários valores
    for (let i = 0; i < 5; i++) {
        const valorElemento = document.createElement('div');
        valorElemento.classList.add('valor-clique');
        valorElemento.textContent = `+${formatarNumero(valorDeClique)}`;

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


// Lógica do DEBUG
document.getElementById('btn-debug').addEventListener('click', () => {
    const senha = prompt("Digite a senha: ");

    if (senha === '123@adm') {
        abrirMenuDebug();
    } else {
        alert("Senha incorreta!");
    }
});

document.getElementById('fechar').addEventListener('click', () => {
    document.querySelector(".debug-menu").style.display = 'none';
});

function abrirMenuDebug() {
    document.querySelector(".debug-menu").style.display = 'block';
}

document.getElementById('btn-hack-500k').addEventListener('click', () => {
    planetas += 500000;

    atualizarInterface();
});

document.getElementById('btn-hack-1M').addEventListener('click', () => {
    planetas += 1000000;

    atualizarInterface();
});

document.getElementById('btn-hack-1B').addEventListener('click', () => {
    planetas += 1000000000;

    atualizarInterface();
});

document.getElementById('btn-hack-10Q').addEventListener('click', () => {
    planetas += 10000000000000000;

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
btnUpgrades.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (planetas >= precoUpgrades[index]) {
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

// Lógica de trocar planeta
let progresso = 0;

function updateBarraProgresso() {
    const progressoPercentual = (planetasProgresso[planetaAtual].meta !== 0)
        ? (planetas / planetasProgresso[planetaAtual].meta) * 100
        : 0;

    barraProgressoElement.style.width = `${Math.min(progressoPercentual, 100)}%`;

    if (progressoPercentual >= 100) {
        trocarPlaneta();
    }
}

function trocarPlaneta() {
    if (planetaAtual < planetasProgresso.length - 1) {
        planetaAtual++;

        // Atualizar os ganhos do planeta atual
        upgradePlanetaClique = planetasProgresso[planetaAtual].ganhoClique;
        upgradePlanetaPassivo = planetasProgresso[planetaAtual].ganhoPassivo;

        // Atualizar os valores de clique e ganho passivo
        valorDeClique += (valorDeClique * upgradePlanetaClique / 100);
        planetasPassivos += (planetasPassivos * upgradePlanetaPassivo / 100);

        atualizarInterface();
        salvarProgresso();
    } else {
        clearInterval(intervaloProgresso);
    }
}

// Lógica de trocar menus
const containerPoderes = document.querySelector('.container-poderes');
const containerUpgrades = document.querySelector('.container-upgrades');
menuPoderes.addEventListener('click', () => {
    containerUpgrades.classList.add('desativado');
    containerPoderes.classList.remove('desativado');
    menuPoderes.style.backgroundColor = "#000";
    menuUpgrades.style.backgroundColor = "#393939";
});

menuUpgrades.addEventListener('click', () => {
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

// Intervalo para atualizar a barra de progresso sozinho
let intervaloProgresso = setInterval(updateBarraProgresso, 100);

// Carregar o progresso ao iniciar o jogo
carregarProgresso();
atualizarInterface();

