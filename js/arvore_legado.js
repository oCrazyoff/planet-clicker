const legado = JSON.parse(localStorage.getItem("legado"));
let pontos_prestigio = legado.pontos_prestigio;

let legado_click = legado.legado_click || 0;
let legado_passivo = legado.legado_passivo || 0;

document.getElementById("pontos-prestigio").textContent = pontos_prestigio;

function comprarHabilidade(custo, nome) {
    if (pontos_prestigio >= custo) {
        pontos_prestigio -= custo;
        legado.pontos_prestigio = pontos_prestigio;

        if (nome === "click_dourado") {
            legado_click += 10 / 100;
            legado.legado_click = legado_click;
        }

        alert(`Habilidade comprada por ${custo} pontos de prestígio!`);
        atualizarInterface();
    } else {
        alert("Pontos de prestígio insuficientes.");
    }
}

function atualizarInterface() {
    const pontosPrestigioElement = document.getElementById("pontos-prestigio");
    if (pontosPrestigioElement) {
        pontosPrestigioElement.textContent = pontos_prestigio;
    }
}

// Inicializar a interface
atualizarInterface();