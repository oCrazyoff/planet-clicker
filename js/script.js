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

//inicia a musica
document.addEventListener('click', () => {
    const audio = document.getElementById("musica");
    if (audio) {
        audio.volume = 0.1;
        audio.play();
    }
});

//som de click
btn_click.addEventListener("click", () => {
    const click_sound = document.getElementById("click-sound");
    if (click_sound) {
        click_sound.volume = 0.1;
        click_sound.currentTime = 0;
        click_sound.play();
    }
})

//Remover cache do css
const link = document.querySelector('link[rel="stylesheet"]');

if (link) {
    link.href = link.href.split('?')[0] + '?v=' + new Date().getTime();
}

//mostra as informações flutuantes
let info_div = document.querySelector(".fly-info");
let div_planetas = document.getElementById("planetas-div");
let div_miner = document.getElementById("miner-div");
let div_click = document.getElementById("valor-click-div");
div_planetas.addEventListener("mouseover", (event) => {
    info_div.textContent = "Planetas obtidos";
    info_div.style.display = "block";
})

div_planetas.addEventListener("mousemove", (event) => {
    info_div.style.left = `${event.pageX + 10}px`;
    info_div.style.top = `${event.pageY + 10}px`;
});

div_planetas.addEventListener("mouseout", (event) => {
    info_div.style.display = "none";
});

div_miner.addEventListener("mouseover", (event) => {
    info_div.textContent = "Ganho por segundo";
    info_div.style.display = "block";
})

div_miner.addEventListener("mousemove", (event) => {
    info_div.style.left = `${event.pageX + 10}px`;
    info_div.style.top = `${event.pageY + 10}px`;
});

div_miner.addEventListener("mouseout", (event) => {
    info_div.style.display = "none";
});

div_click.addEventListener("mouseover", (event) => {
    info_div.textContent = "Poder do clique";
    info_div.style.display = "block";
})

div_click.addEventListener("mousemove", (event) => {
    info_div.style.left = `${event.pageX + 10}px`;
    info_div.style.top = `${event.pageY + 10}px`;
});

div_click.addEventListener("mouseout", (event) => {
    info_div.style.display = "none";
});

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
        planetas.textContent = formatarNumero(pontos);
        valor_click_display.textContent = formatarNumero(valor_click);
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
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
    planetas.textContent = formatarNumero(pontos);
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
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_laser += 1;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        pontos -= laser_preco;
        planetas.textContent = formatarNumero(pontos);
        laser_preco = laser_preco + (laser_preco * 2);
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser + "x";
        salvarProgresso();
    }
    verificarPoderes();
});

btn_miner.addEventListener("click", () => {
    if (pontos >= miner_preco) {
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_miner += 1;
        valor_click += valor_click / 2;
        pontos -= miner_preco;
        planetas.textContent = formatarNumero(pontos);
        miner_preco += miner_preco / 2;
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        valor_click_display.textContent = formatarNumero(valor_click);
        count_miner_display.textContent = count_miner + "x";
        salvarProgresso();
    }
    verificarPoderes();
});

function atualizarPontosPassivos() {
    pontos += ganho_passivo;
    planetas.textContent = formatarNumero(pontos);
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
