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