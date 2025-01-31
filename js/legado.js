let pontos_prestigio = 0;
let max_pontos_prestigio = 1000;

function barraProgressoLegado(value, maxValue) {
    const progress_bar = document.getElementById("bar-prestigio");

    let porcentagem = Math.min((value / maxValue) * 100, 100);

    progress_bar.style.width = `${porcentagem}%`;

    if (porcentagem >= 100) {
        pontos_prestigio++;
        max_pontos_prestigio *= 1.5;
        atualizarInterface();
    }
}

function atualizarInterface() {
    document.getElementById("pontos-prestigio").textContent = pontos_prestigio;
}

setInterval(() => {
    barraProgressoLegado(pontos, max_pontos_prestigio);
}, 100);

atualizarInterface();