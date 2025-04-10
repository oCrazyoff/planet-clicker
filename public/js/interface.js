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

    if (unidadeIndex >= unidades.length - 1) {
        let infinitoNivel = Math.floor(Math.log10(numero) / 3) - 7;
        return `∞${infinitoNivel}`;
    }

    return numero.toFixed(1).replace(".0", "") + " " + unidades[unidadeIndex];
}

// ==================== Atualização da Interface ====================
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
