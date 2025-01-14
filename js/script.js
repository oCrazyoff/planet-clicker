//Remover cache do css
let link = document.querySelector('link[rel="stylesheet"]');

if (link) {
    link.href = link.href.split('?')[0] + '?v=' + new Date().getTime();
}

//atualiza situações em tempo real
function atualizarProgresso() {
    verificarPoderes();
    verificarUpgrades();
    salvarProgresso();
}

setInterval(atualizarProgresso, 10);

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
    info_div.textContent = "Ganho passivo";
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

// Função para resetar o progresso
function resetarProgresso() {
    localStorage.removeItem("progressoJogo");

    // Reinicia as variáveis principais
    pontos = 0;
    valor_click = 1;
    ganho_passivo = 0;
    laser_preco = 100;
    count_laser = 0;
    miner_preco = 10;
    count_miner = 0;
    foguete_preco = 1000;
    count_foguete = 0;
    comprou_pic_ferro = false;
    comprou_perfuracao = false;
    comprou_propulsores = false;

    btn_pic_ferro.style.display = "flex";
    btn_perfuracao.style.display = "flex";
    btn_propulsores.style.display = "flex";

    // Atualiza a interface para refletir o reset
    planetas.textContent = formatarNumero(pontos);
    valor_click_display.textContent = formatarNumero(valor_click);
    passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
    laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
    count_laser_display.textContent = count_laser + "x";
    miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
    count_miner_display.textContent = count_miner + "x";
    foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
    count_foguete_display.textContent = "0x";
}
document.getElementById("reset-btn").addEventListener("click", () => {
    resetarProgresso();
});

// Função hack
function ativarHack() {
    pontos += 10e15; // Adiciona 1 trilhão de pontos
    planetas.textContent = formatarNumero(pontos);
}
document.getElementById("hack-btn").addEventListener("click", () => {
    ativarHack();
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
        foguete_preco = progresso.foguete_preco || 1000;
        count_foguete = progresso.count_foguete || 0;
        comprou_pic_ferro = progresso.comprou_pic_ferro || false;
        comprou_perfuracao = progresso.comprou_perfuracao || false;
        comprou_propulsores = progresso.comprou_propulsores || false;

        // Atualiza a interface com os dados carregados
        planetas.textContent = formatarNumero(pontos);
        valor_click_display.textContent = formatarNumero(valor_click);
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser + "x";
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        count_miner_display.textContent = count_miner + "x";
        foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
        count_foguete_display.textContent = formatarNumero(count_foguete) + "x";
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
        foguete_preco,
        count_foguete,
        comprou_pic_ferro,
        comprou_perfuracao,
        comprou_propulsores,
    };
    localStorage.setItem("progressoJogo", JSON.stringify(progresso));
}

//validação de preços dos poderes
function verificarPoderes() {
    if (pontos >= laser_preco) {
        btn_laser.disabled = false;
        btn_laser.classList.remove("inativo");
    } else {
        btn_laser.disabled = true;
        btn_laser.classList.add("inativo");
    }

    if (pontos >= miner_preco) {
        btn_miner.disabled = false;
        btn_miner.classList.remove("inativo");
    } else {
        btn_miner.disabled = true;
        btn_miner.classList.add("inativo");
    }

    if (pontos >= foguete_preco) {
        btn_foguete.disabled = false;
        btn_foguete.classList.remove("inativo");
    } else {
        btn_foguete.disabled = true;
        btn_foguete.classList.add("inativo");
    }
}

//click principal
let btn_click = document.getElementById("btn");
let planetas = document.getElementById("score");
let pontos = 0;

btn_click.addEventListener("click", () => {
    pontos += valor_click;
    planetas.textContent = formatarNumero(pontos);
    verificarPoderes();
    salvarProgresso();
});

//pagina de upgrades
let btn_upgrades = document.getElementById("btn-upgrades");
let telaInicial = false;

btn_upgrades.addEventListener("click", () => {
    if (!telaInicial) {
        btn_upgrades.innerHTML = '<i class="material-icons">arrow_back</i><br>Voltar';
        document.getElementById("botoes").style.display = "none";
        document.querySelector(".upgrades").style.display = "flex";
        telaInicial = true;
    } else {
        btn_upgrades.innerHTML = '<i class="material-icons">upgrade</i><br>Upgrades';
        document.getElementById("botoes").style.display = "flex";
        document.querySelector(".upgrades").style.display = "none";
        telaInicial = false;
    }
});

//verificar upgrades
function verificarUpgrades() {
    if (pontos >= pic_ferro_preco) {
        btn_pic_ferro.classList.remove("inativo");
        btn_pic_ferro.disabled = false;
    } else {
        btn_pic_ferro.classList.add("inativo");
        btn_pic_ferro.disabled = true;
    }

    if (comprou_pic_ferro == true) {
        btn_pic_ferro.style.display = "none";
    }

    if (pontos >= perfuracao_preco) {
        btn_perfuracao.classList.remove("inativo");
        btn_perfuracao.disabled = false;
    } else {
        btn_perfuracao.classList.add("inativo");
        btn_perfuracao.disabled = true;
    }

    if (comprou_perfuracao == true) {
        btn_perfuracao.style.display = "none";
    }

    if (pontos >= propulsores_preco) {
        btn_propulsores.classList.remove("inativo");
        btn_propulsores.disabled = false;
    } else {
        btn_propulsores.classList.add("inativo");
        btn_propulsores.disabled = true;
    }

    if (comprou_propulsores == true) {
        btn_propulsores.style.display = "none";
    }
}

function atualizarPontosPassivos() {
    pontos += ganho_passivo;
    planetas.textContent = formatarNumero(pontos);
    verificarPoderes();
    salvarProgresso();
}

setInterval(atualizarPontosPassivos, 1000);

//padronização dos numeros
function formatarNumero(num) {
    let resultado;
    if (num >= 1e15) {
        const sufixosLetras = ["", "K", "M", "B", "T", "Q"];
        let sufixosIndex = 5;

        const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
        const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        function gerarSufixo(indice) {
            let sufixo = "";
            let alfabeto = letrasMinusculas + letrasMaiusculas;
            let tamanho = alfabeto.length;

            while (indice >= 0) {
                sufixo = alfabeto[indice % tamanho] + sufixo;
                indice = Math.floor(indice / tamanho) - 1;
            }

            return sufixo;
        }

        let valor = num;
        while (valor >= 1000) {
            valor /= 1000;
            sufixosIndex++;
        }

        let sufixo = sufixosIndex < sufixosLetras.length
            ? sufixosLetras[sufixosIndex]
            : gerarSufixo(sufixosIndex - sufixosLetras.length);

        resultado = valor.toFixed(2) + sufixo;
    } else if (num >= 1e12) {
        resultado = (num / 1e12).toFixed(2) + "T";
    } else if (num >= 1e9) {
        resultado = (num / 1e9).toFixed(2) + "B";
    } else if (num >= 1e6) {
        resultado = (num / 1e6).toFixed(2) + "M";
    } else if (num >= 1e3) {
        resultado = (num / 1e3).toFixed(2) + "K";
    } else {
        resultado = num.toFixed(2);
    }

    resultado = resultado.replace('.', ',');

    const parts = resultado.split(',');
    if (parts[0].length > 3) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    resultado = parts.join(',');

    if (resultado.indexOf(',00') !== -1) {
        resultado = resultado.replace(',00', '');
    }

    return resultado;
}

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

// Carrega o progresso ao iniciar o jogo
carregarProgresso();
