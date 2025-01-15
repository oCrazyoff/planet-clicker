//UPGRADE picareta de ferro
let btn_pic_ferro = document.getElementById("btn-pic-ferro");
let pic_ferro_preco = 500;
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
    salvarProgresso();
})

//UPGRADE perfuração
let btn_perfuracao = document.getElementById("perfuracao");
let perfuracao_preco = 1000;
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
        passive_score.textContent = formatarNumero(ganho_passivo)+"/s";
        planetas.textContent = formatarNumero(pontos);
    }
});

//UPGRADE propulsores melhores
let btn_propulsores = document.getElementById("propulsores");
let propulsores_preco = 5000;
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