let btn_click = document.getElementById("btn");
let planetas = document.getElementById("score");
let pontos = 0;
let valor_click = 1;
let valor_click_display = document.getElementById("valor-click");
let ganho_passivo = 0;
let btn_laser = document.getElementById("laser");
let laser_preco_display = document.getElementById("laser_preco");
let laser_preco = 100;
let count_laser_display = document.getElementById("count-btn-laser");
let passive_score = document.getElementById("passive_score");
btn_laser.disabled = true;
let count_laser = 0;
let btn_miner = document.getElementById("miner");
let miner_preco = 10;
let miner_preco_display = document.getElementById("miner_preco");
let count_miner_display = document.getElementById("count-btn-miner");
let count_miner = 0;
btn_miner.disabled = true;

// Carrega o progresso do jogo
function carregarProgresso() {
    const progresso = JSON.parse(localStorage.getItem("progressoJogo"));
    if (progresso) {
        pontos = progresso.pontos || 0;
        valor_click = progresso.valor_click || 1;
        ganho_passivo = progresso.ganho_passivo || 0;
        laser_preco = progresso.laser_preco || 100;
        count_laser = progresso.count_laser || 0;
        miner_preco = progresso.miner_preco || 10;
        count_miner = progresso.count_miner || 0;

        // Atualiza a interface com os dados carregados
        planetas.textContent = "Planetas: " + formatarNumero(pontos);
        valor_click_display.textContent = "Valor do clique: " + formatarNumero(valor_click);
        passive_score.textContent = "Ganho passivo: " + formatarNumero(ganho_passivo) + "/s";
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser + "x";
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        count_miner_display.textContent = count_miner + "x";
    }
}

// Salva o progresso do jogo
function salvarProgresso() {
    const progresso = {
        pontos,
        valor_click,
        ganho_passivo,
        laser_preco,
        count_laser,
        miner_preco,
        count_miner,
    };
    localStorage.setItem("progressoJogo", JSON.stringify(progresso));
}

function verificarPoderes() {
    if (pontos >= laser_preco) {
        btn_laser.disabled = false;
    } else {
        btn_laser.disabled = true;
    }

    if (pontos >= miner_preco) {
        btn_miner.disabled = false;
    } else {
        btn_miner.disabled = true;
    }
}

btn_click.addEventListener("click", () => {
    pontos += valor_click;
    planetas.textContent = "Planetas: " + formatarNumero(pontos);
    verificarPoderes();
    salvarProgresso();
});

btn_laser.addEventListener("click", () => {
    if (pontos >= laser_preco) {
        if (ganho_passivo < 10) {
            ganho_passivo += 10;
        } else {
            ganho_passivo += ganho_passivo / 2;
        }
        count_laser += 1;
        passive_score.textContent = "Ganho passivo: " + formatarNumero(ganho_passivo) + "/s";
        pontos -= laser_preco;
        planetas.textContent = "Planetas: " + formatarNumero(pontos);
        laser_preco = laser_preco + (laser_preco * 2);
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser + "x";
        salvarProgresso();
    }
    verificarPoderes();
});

btn_miner.addEventListener("click", () => {
    if (pontos >= miner_preco) {
        count_miner += 1;
        valor_click += valor_click / 2;
        pontos -= miner_preco;
        planetas.textContent = "Planetas: " + formatarNumero(pontos);
        miner_preco += miner_preco / 2;
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        valor_click_display.textContent = "Valor do clique: " + formatarNumero(valor_click);
        count_miner_display.textContent = count_miner + "x";
        salvarProgresso();
    }
    verificarPoderes();
});

function atualizarPontosPassivos() {
    pontos += ganho_passivo;
    planetas.textContent = "Planetas: " + formatarNumero(pontos);
    verificarPoderes();
    salvarProgresso();
}

function formatarNumero(num) {
    if (num >= 1e9) {
        return (num / 1e9).toFixed(1) + " Bilhões";
    } else if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + " Milhões";
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + " Mil";
    } else {
        return num.toFixed(2);
    }
}

setInterval(atualizarPontosPassivos, 1000);

// Carrega o progresso ao iniciar o jogo
carregarProgresso();
