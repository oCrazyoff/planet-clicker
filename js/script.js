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
const btnOvniElement = document.getElementById('btn-ovni');
const containerInfoPlanetaElement = document.querySelector('.container-planeta-info');
const infoPlanetaNomeElement = document.getElementById('nome-info-planeta');
const infoImagemPlaneta = document.getElementById('info-planeta-img');
const infoPlanetaDescricaoElement = document.getElementById('info-planeta-ganho');
const btnFecharInfoPlaneta = document.getElementById('btn-info-planeta');

// Audios
const somClickMenu = document.getElementById('som-click-menu');
const somOvni = document.getElementById('som-ovni');
const somPopOvni = document.getElementById('som-pop-ovni');
const somInfoPlaneta = document.getElementById('som-info-planeta');

// Progresso de planetas (os ganhos devem ser em porcentagem)
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
let precoUpgrades = [50000, 150000, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 5000000, 10000000]; // Preços de upgrades
let ganhoUpgrades = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50]; // Ganhos em % dos upgrades

// Variável para rastrear se o jogador já clicou no planeta
let jogadorClicouNoPlaneta = false;

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
    localStorage.setItem('pontosProgresso', JSON.stringify(pontosProgresso));
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
        pontosProgresso = JSON.parse(localStorage.getItem('pontosProgresso'));
    }
}

// Formatação personalizada dos numeros
function formatarNumero(numero) {
    const unidades = [
        "", "Mil", "Milhões", "Bilhões", "Trilhões", "Quadrilhões",
        "Quintilhões", "Sextilhões", "Septilhões", "Octilhões", "Nonilhões",
        "Decilhões", "Undecilhões", "Duodecilhões", "Tredecilhões",
        "Quatuordecilhões", "Quindecilhões", "Sexdecilhões", "Septendecilhões",
        "Octodecilhões", "Novendecilhões", "Vigintilhões"
    ];


    let unidadeIndex = 0;

    while (numero >= 1000 && unidadeIndex < unidades.length - 1) {
        numero /= 1000;
        unidadeIndex++;
    }

    // Se ultrapassou Vigintilhões, começa a exibir como "∞1", "∞2", "∞3"...
    if (unidadeIndex >= unidades.length - 1) {
        let infinitoNivel = Math.floor(Math.log10(numero) / 3) - 7; // Conta os níveis ∞
        return `∞${infinitoNivel}`;
    }

    return numero.toFixed(1).replace(".0", "") + " " + unidades[unidadeIndex];
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

    // Atualizar div de informações do planeta
    infoPlanetaNomeElement.textContent = planetasProgresso[planetaAtual].nome;
    infoImagemPlaneta.src = planetasProgresso[planetaAtual].img;
    infoPlanetaDescricaoElement.innerHTML = "+ <i class='bi bi-clock-history'></i> " + planetasProgresso[planetaAtual].ganhoPassivo + "% e +" + "<i class='bi bi-hand-index-thumb'></i> " + planetasProgresso[planetaAtual].ganhoClique + "%";


    // Exibir ou ocultar containerBuffPlaneta
    containerBuffPlaneta.style.display = (upgradePlanetaPassivo || upgradePlanetaClique) ? "flex" : "none";

    // Atualizar os valores do ganho
    ganhoPlanetaCliqueElement.innerHTML = upgradePlanetaClique ? `+ <i class="bi bi-hand-index-thumb"></i> ${upgradePlanetaClique}%` : "";
    ganhoPlanetaPassivoElement.innerHTML = upgradePlanetaPassivo ? `+ <i class="bi bi-clock-history"></i> ${upgradePlanetaPassivo}%` : "";
}

// Lógica do ovni
let animacaoAtual = "ovniFly1";

// Modifique a função iniciarOvni para verificar se o jogador já clicou
function iniciarOvni() {
    if (!jogadorClicouNoPlaneta) return; // Não inicia o ciclo se o jogador não clicou no planeta

    let tempoAleatorio = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;

    // Reseta a posição e exibe o OVNI
    void btnOvniElement.offsetWidth;
    btnOvniElement.style.left = "-50%";
    btnOvniElement.style.top = "50%";
    btnOvniElement.style.display = "block";

    // Alterna entre as animações
    if (animacaoAtual === "ovniFly1") {
        somOvni.currentTime = 0;
        somOvni.play();
        btnOvniElement.style.animation = "ovniFly2 5s";
        animacaoAtual = "ovniFly2";
    } else {
        somOvni.currentTime = 0;
        somOvni.play();
        btnOvniElement.style.animation = "ovniFly1 5s";
        animacaoAtual = "ovniFly1";
    }

    // Chama a função novamente após um tempo aleatório
    setTimeout(iniciarOvni, tempoAleatorio);
}

// Inicia o ciclo
iniciarOvni();


btnOvniElement.addEventListener('click', (event) => {
    let porcentagemOvni = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

    // Som
    somOvni.pause();
    somPopOvni.currentTime = 0;
    somPopOvni.play();

    // Calcular o ganho e aplica-lo
    let ganhoOvni = planetas * (porcentagemOvni / 100)
    planetas += ganhoOvni;

    // Pegar a posição do OVNI
    const posX = event.clientX;
    const posY = event.clientY;

    // Criar uma div para mostrar o ganho
    const ganhoElemento = document.createElement('div');
    ganhoElemento.classList.add('ganho-ovni');
    ganhoElemento.textContent = `+ ${formatarNumero(ganhoOvni)}`;
    ganhoElemento.style.left = `${posX}px`;
    ganhoElemento.style.top = `${posY}px`;
    document.body.appendChild(ganhoElemento);

    btnOvniElement.style.display = "none";
});

// Atualize o evento de clique no planeta
btnClick.addEventListener('click', (event) => {
    if (!jogadorClicouNoPlaneta) {
        jogadorClicouNoPlaneta = true; // Marca que o jogador clicou no planeta
        iniciarOvni(); // Inicia o ciclo do OVNI
    }

    planetas += valorDeClique;
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

// Lógica do Reset caso tenha bug
document.getElementById('btn-reset').addEventListener('click', () => {
    localStorage.removeItem('planetas');
    localStorage.removeItem('planetasPassivos');
    localStorage.removeItem('valorDeClique');
    localStorage.removeItem('poderes');
    localStorage.removeItem('precoPoderes');
    localStorage.removeItem('ganhoPoderes');
    localStorage.removeItem('upgrades');
    localStorage.removeItem('precoUpgrades');
    localStorage.removeItem('ganhoUpgrades');
    localStorage.removeItem('planetaAtual');
    localStorage.removeItem('upgradePlanetaClique');
    localStorage.removeItem('upgradePlanetaPassivo');
    localStorage.removeItem('pontosProgresso');

    // Recarrega a página para aplicar as mudanças
    location.reload();
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
            // Som
            const somPoder = document.getElementById('som-click-poder');
            somPoder.currentTime = 0;
            somPoder.play();

            // Comprar poder
            planetas -= precoPoderes[index];
            poderes[index] += 1;

            // Atualizar o valor de clique ou o ganho passivo, dependendo do tipo de poder
            if (index % 2 === 0) {
                valorDeClique += ganhoPoderes[index]; // Aumenta o valor do clique
                valorDeClique += valorDeClique * (upgradePlanetaClique / 100)
            } else {
                planetasPassivos += ganhoPoderes[index]; // Aumenta o ganho passivo
                planetasPassivos += planetasPassivos * (upgradePlanetaPassivo / 100)
            }

            // Aumentar o preço do poder e o ganho
            precoPoderes[index] = Math.floor(precoPoderes[index] * 2);
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
            // Som
            const somPoder = document.getElementById('som-click-poder');
            somPoder.currentTime = 0;
            somPoder.play();

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
let pontosProgresso = 0;

// Botão de fechar a div info planeta
btnFecharInfoPlaneta.addEventListener('click', () => {
    // Som
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    containerInfoPlanetaElement.style.display = 'none';
});

function updateBarraProgresso() {
    const progressoPercentual = (planetasProgresso[planetaAtual].meta !== 0)
        ? (pontosProgresso / planetasProgresso[planetaAtual].meta) * 100
        : 0;

    barraProgressoElement.style.width = `${Math.min(progressoPercentual, 100)}%`;

    if (progressoPercentual >= 100) {
        trocarPlaneta();
        pontosProgresso = 0;
    }
}

function trocarPlaneta() {
    if (planetaAtual < planetasProgresso.length - 1) {
        planetaAtual++;

        // Mostrar div de informações
        containerInfoPlanetaElement.style.display = "flex";

        // Som
        somInfoPlaneta.currentTime = 0;
        somInfoPlaneta.play();

        // Atualizar os ganhos do planeta atual
        upgradePlanetaClique = planetasProgresso[planetaAtual].ganhoClique;
        upgradePlanetaPassivo = planetasProgresso[planetaAtual].ganhoPassivo;

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
    // Som
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    containerUpgrades.classList.add('desativado');
    containerPoderes.classList.remove('desativado');
    menuPoderes.style.backgroundColor = "#000";
    menuUpgrades.style.backgroundColor = "#393939";
});

menuUpgrades.addEventListener('click', () => {
    // Som
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    containerUpgrades.classList.remove('desativado');
    containerPoderes.classList.add('desativado');
    menuUpgrades.style.backgroundColor = "#000";
    menuPoderes.style.backgroundColor = "#393939";
});

// Lógica de ganho passivo
function ganharPlanetasPassivos() {
    planetas += planetasPassivos / 10;
    pontosProgresso += planetasPassivos;
    atualizarInterface();
    salvarProgresso();
}

// Atualização do progresso passivo
setInterval(ganharPlanetasPassivos, 100);

// Intervalo para atualizar a barra de progresso sozinho
let intervaloProgresso = setInterval(updateBarraProgresso, 100);

// Carregar o progresso ao iniciar o jogo
carregarProgresso();
atualizarInterface();
