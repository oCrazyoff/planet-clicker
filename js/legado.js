//definindo variaveis
let pontos_prestigio = 0;
let legado_click = 0;
let legado_passivo = 0;

//definindo legado
function salvarLegado() {
    const legado = {
        pontos_prestigio,
        legado_click,
        legado_passivo
    };
    localStorage.setItem("legado", JSON.stringify(legado));
}

function carregarLegado() {
    const legado = JSON.parse(localStorage.getItem("legado"));
    if (legado) {
        pontos_prestigio = legado.pontos_prestigio || 0;
        legado_click = legado.legado_click || 0;
        legado_passivo = legado.legado_passivo || 0;
    }
}

let max_pontos_prestigio = (pontos_prestigio == 0) ? 10 : pontos_prestigio * 10;

function barraProgressoLegado(value, maxValue) {
    const progress_bar = document.getElementById("bar-prestigio");

    let porcentagem = Math.min((value / maxValue) * 100, 100);

    progress_bar.style.width = `${porcentagem}%`;

    if (porcentagem >= 100) {
        pontos_prestigio++;
        max_pontos_prestigio *= 10;
        atualizarInterface();
        salvarLegado();
    }
}

function atualizarInterface() {
    document.getElementById("pontos-prestigio").textContent = pontos_prestigio;
}

setInterval(() => {
    barraProgressoLegado(pontos, max_pontos_prestigio);
}, 100);

atualizarInterface();

// Ensure the element exists before adding the event listener
const btnPrestigio = document.getElementById("btn-prestigio");
if (btnPrestigio) {
    btnPrestigio.addEventListener("click", () => {
        if (pontos_prestigio > 0) {
            const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
            window.location.href = `${basePath}/arvore_legado.html`;
        } else {
            alert("Você não tem pontos de prestígio suficientes!");
        }
    });
}

carregarLegado();