let progresso = JSON.parse(localStorage.getItem("progressoJogo"));
let pontos_prestigio = progresso.pontos_prestigio || 0;

document.getElementById("pontos-prestigio").textContent = pontos_prestigio;

function comprarHabilidade(custo) {
    if (pontos_prestigio >= custo) {
        pontos_prestigio -= custo;
        progresso.pontos_prestigio = pontos_prestigio;
        localStorage.setItem("progressoJogo", JSON.stringify(progresso));

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