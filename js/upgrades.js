//MELHORIAS INSTANTANEAS
//UPGRADE café
let btn_cafe = document.getElementById("btn-cafe");
let cafe_preco = 250;
let comprou_cafe = false;

btn_cafe.addEventListener("click", () => {
    if (pontos >= cafe_preco) {
        const upgrade_sound = document.getElementById("click-upgrade");
        if (upgrade_sound) {
            upgrade_sound.currentTime = 0;
            upgrade_sound.play();
        }
        valor_click += valor_click * 50 / 100;
        valor_click_display.textContent = formatarNumero(valor_click);
        comprou_cafe = true;
        pontos -= cafe_preco;
        planetas.textContent = formatarNumero(pontos);
    }
});

//UPGRADE pilulas
let btn_pilula = document.getElementById("btn-pilula");
let pilula_preco = 750;
let comprou_pilula = false;

btn_pilula.addEventListener("click", () => {
    if (pontos >= pilula_preco) {
        const upgrade_sound = document.getElementById("click-upgrade");
        if (upgrade_sound) {
            upgrade_sound.currentTime = 0;
            upgrade_sound.play();
        }
        ganho_passivo += 5;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        comprou_pilula = true;
        pontos -= pilula_preco;
        planetas.textContent = formatarNumero(pontos);
    }
});
//MELHORIAS PERMANENTES
//UPGRADE picareta de ferro
let btn_pic_ferro = document.getElementById("btn-pic-ferro");
let pic_ferro_preco = 1000;
let comprou_pic_ferro = false;

btn_pic_ferro.addEventListener("click", () => {
    if (pontos >= pic_ferro_preco) {
        const upgrade_sound = document.getElementById("click-upgrade");
        if (upgrade_sound) {
            upgrade_sound.currentTime = 0;
            upgrade_sound.play();
        }
        comprou_pic_ferro = true;
        upgrade_miner += 5 / 100;
        valor_click += valor_click * upgrade_miner;
        pontos -= pic_ferro_preco;
        planetas.textContent = formatarNumero(pontos);
        valor_click_display.textContent = formatarNumero(valor_click);
    }
})

//UPGRADE perfuração
let btn_perfuracao = document.getElementById("perfuracao");
let perfuracao_preco = 10000;
let comprou_perfuracao = false;

btn_perfuracao.addEventListener("click", () => {
    if (pontos >= perfuracao_preco) {
        const upgrade_sound = document.getElementById("click-upgrade");
        if (upgrade_sound) {
            upgrade_sound.currentTime = 0;
            upgrade_sound.play();
        }
        comprou_perfuracao = true;
        upgrade_laser += 2 / 100;
        ganho_passivo += ganho_passivo * upgrade_laser;
        pontos -= perfuracao_preco;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        planetas.textContent = formatarNumero(pontos);
    }
});

//UPGRADE propulsores melhores
let btn_propulsores = document.getElementById("propulsores");
let propulsores_preco = 100000;
let comprou_propulsores = false;

btn_propulsores.addEventListener("click", () => {
    if (pontos >= propulsores_preco) {
        const upgrade_sound = document.getElementById("click-upgrade");
        if (upgrade_sound) {
            upgrade_sound.currentTime = 0;
            upgrade_sound.play();
        }
        comprou_propulsores = true;
        tempo_foguete = 15000;
        pontos -= propulsores_preco;
        planetas.textContent = formatarNumero(pontos);
        iniciarBonusFoguete();
    }
});