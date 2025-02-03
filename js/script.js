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

setInterval(atualizarProgresso, 100);

//info do planeta
let btn_info = document.getElementById("btn-info");
btn_info.addEventListener("click", () => {
    if (info_planeta.style.display === "none") {
        info_planeta.style.display = "flex";
    } else {
        info_planeta.style.display = "none"
    }
});

let div_planetas = document.getElementById("planetas-div");
let div_passive = document.getElementById("passive-div");
let div_click = document.getElementById("valor-click-div");

//configurações
let btn_musica = document.getElementById("btn-musica");
let tem_musica = true;
btn_musica.addEventListener("click", () => {
    if (tem_musica == true) {
        btn_musica.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        const audio = document.getElementById("musica");
        if (audio) {
            audio.pause();
        }
        tem_musica = false;
    } else {
        btn_musica.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        const audio = document.getElementById("musica");
        if (audio) {
            audio.currentTime = 0;
            audio.play();
        }
        tem_musica = true;
    }
});

//mostra as informações flutuantes
let info_div = document.getElementById("fly-info");
const info_miner = document.getElementById("info-miner");
const info_laser = document.getElementById("info-laser");
const info_sonda = document.getElementById("info-sonda");
const info_luva = document.getElementById("info-luva");
const info_coletor = document.getElementById("info-coletor");
const info_usina = document.getElementById("info-usina");
const info_foguete = document.getElementById("info-foguete");

function adicionarInfoFlutuante(div, texto) {
    div.addEventListener("mouseover", () => {
        info_div.textContent = texto;
        info_div.style.display = "flex";
    });

    div.addEventListener("mousemove", (event) => {
        info_div.style.left = `${event.pageX - 250}px`;
        info_div.style.top = `${event.pageY - 130}px`;
    });

    div.addEventListener("mouseout", () => {
        info_div.style.display = "none";
    });
}

adicionarInfoFlutuante(info_miner, "Mineram junto com você, aumentando seu poder de clique em 0.5");
adicionarInfoFlutuante(info_laser, "Atiram sozinhos no planeta, aumentando seu ganho passivo em 0.5");
adicionarInfoFlutuante(info_sonda, "Explora o Universo e gera planetas automaticamente, aumentando 1 do ganho passivo")
adicionarInfoFlutuante(info_luva, "Utilizando a luva gravitacional seu clique fica muito mais forte, melhora seu poder de clique em 1");
adicionarInfoFlutuante(info_coletor, "O Coletor Orbital é muito poderoso funciona ao clickar, melhorando seu poder de clique em 1.5");
adicionarInfoFlutuante(info_usina, "A Usina de Matéria Escura processa e coleta matéria escura sozinha, melhora 1.5 do seu ganho passivo");
adicionarInfoFlutuante(info_foguete, "Busca recursos em outros planetas baseado nos seus planetas atuais, demora 30 segundos para retornar");


// Função para resetar o progresso
function resetarProgresso() {
    localStorage.removeItem("progressoJogo");

    // Reinicia as variáveis principais
    pontos = 0;
    valor_click = 1;
    ganho_passivo = 0;
    //laser
    laser_preco = 100;
    count_laser = 0;
    //miner
    miner_preco = 10;
    count_miner = 0;
    //foguete
    foguete_preco = 3000;
    count_foguete = 0;
    //sonda
    count_sonda = 0;
    sonda_preco = 750;
    //luva
    count_luva = 0;
    luva_preco = 500;
    //coletor orbital
    count_coletor = 0;
    coletor_preco = 1000;
    //usinda materia escura
    count_usina = 0;
    usina_preco = 2000;
    //upgrade
    comprou_cafe = false;
    comprou_pilula = false;
    comprou_pic_ferro = false;
    comprou_perfuracao = false;
    comprou_propulsores = false;
    upgrade_passivo_planeta = 1;
    upgrade_click_planeta = 1;
    porcentagem = 0;

    //planetas
    img_planeta.src = "https://th.bing.com/th/id/R.5264daf3c450582421fc4b0ff3467221?rik=blmf9VQ7278LCA&pid=ImgRaw&r=0";
    info_planeta.innerHTML = "Esse é Aqualis, o primeiro planeta que você encontrou em suas jornadas espaciais. <span>Não tem nenhum atributo</span>";
    atual_planeta = "Aqualis";
    trocarPlaneta();
    intervalo_stratosyl();
    intervalo_rosalia();

    //mostrar upgrades
    btn_cafe.style.display = "flex";
    btn_pilula.style.display = "flex";
    btn_pic_ferro.style.display = "flex";
    btn_perfuracao.style.display = "flex";
    btn_propulsores.style.display = "flex";

    planetas.textContent = formatarNumero(pontos);
    valor_click_display.textContent = formatarNumero(valor_click);
    passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
    //laser
    laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
    count_laser_display.textContent = count_laser;
    //miner
    miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
    count_miner_display.textContent = count_miner;
    //sonda
    sonda_preco_display.textContent = "(" + formatarNumero(sonda_preco) + ")";
    count_sonda_display.textContent = count_sonda;
    //luva
    luva_preco_display.textContent = "(" + formatarNumero(luva_preco) + ")";
    count_luva_display.textContent = count_luva;
    //coletor orbital
    coletor_preco_display.textContent = "(" + formatarNumero(coletor_preco) + ")";
    count_coletor_display.textContent = count_coletor;
    //usina materia escura
    usina_preco_display.textContent = "(" + formatarNumero(usina_preco) + ")";
    count_usina_display.textContent = count_usina;
    //foguete
    iniciarBonusFoguete();
    foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
    count_foguete_display.textContent = "0";
}
document.getElementById("reset-btn").addEventListener("click", () => {
    const confirmacao = window.confirm("Você realmente quer resetar?");
    if (confirmacao) {
        resetarProgresso();
    }
});

// Função hack
function ativarHack() {
    const input_hack = document.getElementById("number-hack");
    const valor_hack = Number(input_hack.value);
    pontos += valor_hack;
    planetas.textContent = formatarNumero(pontos);
    barraProgresso();
    trocarPlaneta();
}



// Carrega o progresso do jogo
function carregarProgresso() {
    const progresso = JSON.parse(localStorage.getItem("progressoJogo"));
    if (progresso) {
        pontos = progresso.pontos || 0;
        valor_click = progresso.valor_click || 1;
        ganho_passivo = progresso.ganho_passivo || 0;
        //laser
        laser_preco = progresso.laser_preco || 100;
        count_laser = progresso.count_laser || 0;
        //miner
        miner_preco = progresso.miner_preco || 10;
        count_miner = progresso.count_miner || 0;
        //sonda
        sonda_preco = progresso.sonda_preco || 750;
        count_sonda = progresso.count_sonda || 0;
        //luva
        luva_preco = progresso.luva_preco || 500;
        count_luva = progresso.count_luva || 0;
        //coletor orbital
        coletor_preco = progresso.coletor_preco || 1000;
        count_coletor = progresso.count_coletor || 0;
        //usina materia escura
        usina_preco = progresso.usina_preco || 2000;
        count_usina = progresso.count_usina || 0;
        //foguete
        foguete_preco = progresso.foguete_preco || 3000;
        count_foguete = progresso.count_foguete || 0;
        //upgrades
        comprou_cafe = progresso.comprou_cafe || false;
        comprou_pilula = progresso.comprou_pilula || false;
        comprou_pic_ferro = progresso.comprou_pic_ferro || false;
        comprou_perfuracao = progresso.comprou_perfuracao || false;
        comprou_propulsores = progresso.comprou_propulsores || false;
        //novo planeta
        porcentagem = progresso.porcentagem || 0;
        upgrade_passivo_planeta = progresso.upgrade_passivo_planeta || 1;
        upgrade_click_planeta = progresso.upgrade_click_planeta || 1;
        info_planeta.innerHTML = progresso.info_planeta || "Esse é Aqualis, o primeiro planeta que você encontrou em suas jornadas espaciais. <span>Não tem nenhum atributo</span>";
        atual_planeta = progresso.atual_planeta || "Aqualis";
        img_planeta.src = progresso.img_planeta_src || "https://th.bing.com/th/id/R.5264daf3c450582421fc4b0ff3467221?rik=blmf9VQ7278LCA&pid=ImgRaw&r=0";

        //legado
        pontos_prestigio = progresso.pontos_prestigio || 0;
        max_pontos_prestigio = progresso.max_pontos_prestigio || 10;
        legado_click = progresso.legado_click || 0;
        legado_passivo = progresso.legado_passivo || 0;
        atualizarInterface();

        trocarPlaneta();

        // Atualiza a interface com os dados carregados
        planetas.textContent = formatarNumero(pontos);
        valor_click_display.textContent = formatarNumero(valor_click);
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        //laser
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser;
        //miner
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        count_miner_display.textContent = count_miner;
        //sonda
        sonda_preco_display.textContent = "(" + formatarNumero(sonda_preco) + ")";
        count_sonda_display.textContent = count_sonda;
        //luva
        luva_preco_display.textContent = "(" + formatarNumero(luva_preco) + ")";
        count_luva_display.textContent = count_luva;
        //coletor orbital
        coletor_preco_display.textContent = "(" + formatarNumero(coletor_preco) + ")";
        count_coletor_display.textContent = count_coletor;
        //usina materia escura
        usina_preco_display.textContent = "(" + formatarNumero(usina_preco) + ")";
        count_usina_display.textContent = count_usina;
        //foguete
        foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
        count_foguete_display.textContent = formatarNumero(count_foguete);
    }
}

// Salva o progresso do jogo
function salvarProgresso() {
    const progresso = {
        pontos,
        valor_click,
        ganho_passivo,
        //laser
        laser_preco,
        count_laser,
        //miner
        miner_preco,
        count_miner,
        //sonda
        sonda_preco,
        count_sonda,
        //luva
        luva_preco,
        count_luva,
        //coletor orbital
        coletor_preco,
        count_coletor,
        //usina materia escura
        usina_preco,
        count_usina,
        //foguete
        foguete_preco,
        count_foguete,
        //upgrades
        comprou_cafe,
        comprou_pilula,
        comprou_pic_ferro,
        comprou_perfuracao,
        comprou_propulsores,

        //legado
        pontos_prestigio,
        max_pontos_prestigio,
        legado_click,
        legado_passivo,

        //planetas
        porcentagem,
        upgrade_passivo_planeta,
        upgrade_click_planeta,
        atual_planeta,
        info_planeta: info_planeta.innerHTML,
        img_planeta_src: img_planeta.src,
    };
    localStorage.setItem("progressoJogo", JSON.stringify(progresso));
}

//validação de preços dos poderes
function verificarPoderes() {
    //laser
    if (pontos >= laser_preco) {
        btn_laser.disabled = false;
        btn_laser.classList.remove("inativo");
    } else {
        btn_laser.disabled = true;
        btn_laser.classList.add("inativo");
    }

    //miner
    if (pontos >= miner_preco) {
        btn_miner.disabled = false;
        btn_miner.classList.remove("inativo");
    } else {
        btn_miner.disabled = true;
        btn_miner.classList.add("inativo");
    }

    //sonda
    if (pontos >= sonda_preco) {
        btn_sonda.disabled = false;
        btn_sonda.classList.remove("inativo");
    } else {
        btn_sonda.disabled = true;
        btn_sonda.classList.add("inativo");
    }

    //luva gravitacional
    if (pontos >= luva_preco) {
        btn_luva.disabled = false;
        btn_luva.classList.remove("inativo");
    } else {
        btn_luva.disabled = true;
        btn_luva.classList.add("inativo");
    }

    //coletor orbital
    if (pontos >= coletor_preco) {
        btn_coletor.disabled = false;
        btn_coletor.classList.remove("inativo");
    } else {
        btn_coletor.disabled = true;
        btn_coletor.classList.add("inativo");
    }
    //usina materia escura
    if (pontos >= usina_preco) {
        btn_usina.disabled = false;
        btn_usina.classList.remove("inativo");
    } else {
        btn_usina.disabled = true;
        btn_usina.classList.add("inativo");
    }

    //foguete
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
    pontos += valor_click * upgrade_click_planeta;
    planetas.textContent = formatarNumero(pontos);
});

//pagina de upgrades
let btn_upgrades = document.getElementById("btn-upgrades");
let telaInicial = false;

btn_upgrades.addEventListener("click", () => {
    const menu_sound = document.getElementById("click-menus");
    if (menu_sound) {
        menu_sound.currentTime = 0;
        menu_sound.play();
    }
    if (!telaInicial) {
        btn_upgrades.innerHTML = '<i class="material-icons">arrow_back</i><br>Voltar';
        document.querySelector(".poderes").style.display = "none";
        document.querySelector(".upgrades").style.display = "flex";
        telaInicial = true;
    } else {
        btn_upgrades.innerHTML = '<i class="material-icons">upgrade</i><br>Upgrades';
        document.querySelector(".poderes").style.display = "flex";
        document.querySelector(".upgrades").style.display = "none";
        telaInicial = false;
    }
});

//verificar upgrades
function verificarUpgrades() {
    //café
    if (pontos >= cafe_preco) {
        btn_cafe.classList.remove("inativo");
        btn_cafe.disabled = false;
    } else {
        btn_cafe.classList.add("inativo");
        btn_cafe.disabled = true;
    }

    if (comprou_cafe == true) {
        btn_cafe.style.display = "none";
    }

    //pilulas
    if (pontos >= pilula_preco) {
        btn_pilula.classList.remove("inativo");
        btn_pilula.disabled = false;
    } else {
        btn_pilula.classList.add("inativo");
        btn_pilula.disabled = true;
    }

    if (comprou_pilula == true) {
        btn_pilula.style.display = "none";
    }

    //picareta de ferro
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

    //perfuração
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

    //propulsores
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

//PLANETA stratosyl
const stratosyl_price = 5000;
let stratosyl;

function intervalo_stratosyl() {
    if (pontos < stratosyl_price && atual_planeta == "Aqualis") {
        stratosyl = setInterval(function () {
            barraProgresso(pontos, stratosyl_price);
            if (pontos >= stratosyl_price) {
                clearInterval(stratosyl);
                barraProgresso(pontos, rosalia_price);
                trocarPlaneta();
                intervalo_rosalia();
            }
        }, 100);
    }
}

intervalo_stratosyl();

//PLANETA rosalia
const rosalia_price = 100000;
let rosalia;

function intervalo_rosalia() {
    if (pontos > stratosyl_price && atual_planeta == "Stratosyl") {
        rosalia = setInterval(function () {
            barraProgresso(pontos, rosalia_price);
            if (pontos >= rosalia_price) {
                clearInterval(rosalia);
                barraProgresso(0, 100);
                trocarPlaneta();
            }
        }, 100);
    }
}

intervalo_rosalia();

//barra de progresso para o proximo planeta
function barraProgresso(value, maxValue) {
    const progress_bar = document.getElementById("progress-bar-next-planet");

    let porcentagem = Math.min((value / maxValue) * 100, 100);

    progress_bar.style.width = `${porcentagem}%`;
}

//atualizar pontos passivos
const intervalo_atualizar = 100;
function atualizarPontosPassivos() {
    const ganho_por_segundo = (ganho_passivo * upgrade_passivo_planeta) * (intervalo_atualizar / 100);

    pontos += ganho_por_segundo;

    planetas.textContent = formatarNumero(pontos);
}

setInterval(atualizarPontosPassivos, intervalo_atualizar);

//padronização dos numeros
function formatarNumero(num) {
    let resultado;
    if (num >= 1e15) {
        const sufixosLetras = ["", "Mil", "Milhões", "Bilhões", "Trilhões", "Quadrilhões"];
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

        let sufixo = sufixosIndex < sufixosLetras.length ?
            sufixosLetras[sufixosIndex] :
            gerarSufixo(sufixosIndex - sufixosLetras.length);

        resultado = valor.toFixed(2) + sufixo;
    } else if (num >= 1e12) {
        resultado = (num / 1e12).toFixed(2) + "Trilhões";
    } else if (num >= 1e9) {
        resultado = (num / 1e9).toFixed(2) + "Bilhões";
    } else if (num >= 1e6) {
        resultado = (num / 1e6).toFixed(2) + "Milhões";
    } else if (num >= 1e3) {
        resultado = (num / 1e3).toFixed(2) + "Mil";
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
document.addEventListener('click', function handleClick() {
    const audio = document.getElementById("musica");
    if (audio) {
        audio.volume = 0.1;
        audio.play();
    }

    document.removeEventListener("click", handleClick);
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
localStorage.removeItem("progressoJogo");