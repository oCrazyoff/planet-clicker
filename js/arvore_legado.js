localStorage.setItem("legado");
let progresso = JSON.parse(localStorage.setItem("legado"));
let pontos_prestigio = progresso.pontos_prestigio || 0;

let legado_click = 0;
let legado_passivo = 0;

document.getElementById("pontos-prestigio").textContent = pontos_prestigio;

function comprarHabilidade(custo, nome) {
    if (pontos_prestigio >= custo) {
        pontos_prestigio -= custo;
        progresso.pontos_prestigio = pontos_prestigio;
        localStorage.setItem("progressoJogo", JSON.stringify(progresso));

        if (nome === "click_dourado") {
            legado_click += 10 / 100;
        }

        alert(`Habilidade comprada por ${custo} pontos de prestígio!`);
        atualizarInterface();
    } else {
        alert("Pontos de prestígio insuficientes.");
    }
}

function atualizarInterface() {
    document.getElementById("pontos-prestigio").textContent = pontos_prestigio;
}

// Inicializar a interface
atualizarInterface();