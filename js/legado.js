let pontos_prestigio = 0;
let max_pontos_prestigio = (pontos_prestigio === 0) ? 10 : pontos_prestigio * 10;

function barraProgressoLegado(value, maxValue) {
    const progress_bar = document.getElementById("bar-prestigio");

    let porcentagem = Math.min((value / maxValue) * 100, 100);

    progress_bar.style.width = `${porcentagem}%`;

    if (porcentagem >= 100) {
        pontos_prestigio++;
        max_pontos_prestigio *= 10;
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

document.getElementById("btn-prestigio").addEventListener("click", () => {
    if (pontos_prestigio > 0) {
        window.location.href = "../arvore_legado.html";
    } else {
        alert("Você não tem pontos de prestígio suficientes!");
    }
});