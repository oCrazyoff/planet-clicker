//poder minerador
let btn_miner = document.getElementById("btn-miner");
let miner_preco = 10;
let miner_preco_display = document.getElementById("miner-preco");
let count_miner_display = document.getElementById("count-btn-miner");
let count_miner = 0;
let valor_click = 1 + legado_click;
let valor_click_display = document.getElementById("valor-click");
let upgrade_miner = 0;

btn_miner.addEventListener("click", () => {
    if (pontos >= miner_preco) {
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_miner += 1;
        valor_click += 0.5;
        valor_click += valor_click * upgrade_miner;
        pontos -= miner_preco;
        planetas.textContent = formatarNumero(pontos);
        miner_preco += (miner_preco * 25 / 100) + (miner_preco * count_miner / 100);
        miner_preco_display.textContent = "(" + formatarNumero(miner_preco) + ")";
        valor_click_display.textContent = formatarNumero(valor_click);
        count_miner_display.textContent = count_miner;
    }
});

//poder laser
let btn_laser = document.getElementById("btn-laser");
let laser_preco_display = document.getElementById("laser-preco");
let laser_preco = 100;
let count_laser_display = document.getElementById("count-btn-laser");
let passive_score = document.getElementById("passive_score");
let count_laser = 0;
let ganho_passivo = 0;
let upgrade_laser = 0;

btn_laser.addEventListener("click", () => {
    if (pontos >= laser_preco) {
        ganho_passivo += 0.5;
        ganho_passivo += ganho_passivo * upgrade_laser;

        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_laser += 1;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        pontos -= laser_preco;
        planetas.textContent = formatarNumero(pontos);
        laser_preco += (laser_preco * 30 / 100) + (laser_preco * count_laser / 100);
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser;
    }
});

//poder sonda
let btn_sonda = document.getElementById("btn-sonda");
let sonda_preco_display = document.getElementById("sonda-preco");
let sonda_preco = 750;
let count_sonda_display = document.getElementById("count-btn-sonda");
let count_sonda = 0;
let upgrade_sonda = 0;

btn_sonda.addEventListener("click", () => {
    if (pontos >= sonda_preco) {
        ganho_passivo += 1;
        ganho_passivo += ganho_passivo * upgrade_sonda;
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_sonda += 1;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        pontos -= sonda_preco;
        planetas.textContent = formatarNumero(pontos);
        sonda_preco += (sonda_preco * 35 / 100) + (sonda_preco * count_sonda / 100);
        sonda_preco_display.textContent = "(" + formatarNumero(sonda_preco) + ")";
        count_sonda_display.textContent = count_sonda;
    }
});

//poder luva gravitacional
let btn_luva = document.getElementById("btn-luva");
let luva_preco_display = document.getElementById("luva-preco");
let luva_preco = 500;
let count_luva_display = document.getElementById("count-btn-luva");
let count_luva = 0;
let upgrade_luva = 0;

btn_luva.addEventListener("click", () => {
    if (pontos >= luva_preco) {
        valor_click += 1;
        valor_click += valor_click * upgrade_luva;
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_luva += 1;
        valor_click_display.textContent = formatarNumero(valor_click);
        pontos -= luva_preco;
        planetas.textContent = formatarNumero(pontos);
        luva_preco += (luva_preco * 35 / 100) + (luva_preco * count_luva / 100);
        luva_preco_display.textContent = "(" + formatarNumero(luva_preco) + ")";
        count_luva_display.textContent = count_luva;
    }
});

//Poder Coletor orbital
let btn_coletor = document.getElementById("btn-coletor");
let coletor_preco_display = document.getElementById("coletor-preco");
let coletor_preco = 1000;
let count_coletor_display = document.getElementById("count-btn-coletor");
let count_coletor = 0;
let upgrade_coletor = 0;

btn_coletor.addEventListener("click", () => {
    if (pontos >= coletor_preco) {
        valor_click += 1.5;
        valor_click += valor_click * upgrade_coletor;
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_coletor += 1;
        valor_click_display.textContent = formatarNumero(valor_click);
        pontos -= coletor_preco;
        planetas.textContent = formatarNumero(pontos);
        coletor_preco += (coletor_preco * 40 / 100) + (coletor_preco * count_coletor / 100);
        coletor_preco_display.textContent = "(" + formatarNumero(coletor_preco) + ")";
        count_coletor_display.textContent = count_coletor;
    }
});

//poder usina
let btn_usina = document.getElementById("btn-usina");
let usina_preco_display = document.getElementById("usina-preco");
let usina_preco = 2000;
let count_usina_display = document.getElementById("count-btn-usina");
let count_usina = 0;
let upgrade_usina = 0;

btn_usina.addEventListener("click", () => {
    if (pontos >= usina_preco) {
        ganho_passivo += 1.5;
        ganho_passivo += ganho_passivo * upgrade_usina;
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }
        count_usina += 1;
        passive_score.textContent = formatarNumero(ganho_passivo) + "/s";
        pontos -= usina_preco;
        planetas.textContent = formatarNumero(pontos);
        usina_preco += (usina_preco * 45 / 100) + (usina_preco * count_usina / 100);
        usina_preco_display.textContent = "(" + formatarNumero(usina_preco) + ")";
        count_usina_display.textContent = count_usina;
    }
});

// Poder foguete
let btn_foguete = document.getElementById("btn-foguete");
let foguete_preco_display = document.getElementById("foguete-preco");
let foguete_preco = 3000;
let count_foguete_display = document.getElementById("count-btn-foguete");
let bonus_display = document.getElementById("bonus-div");
let intervaloFoguete;
let count_foguete = 0;
let tempo_foguete = 30000;

function fogueteBonus(pontosAtuais) {
    const bonus = Math.random() * (0.5 - 0.05) + 0.05;
    return Math.floor(pontosAtuais * bonus);
}

// Função para iniciar o bônus do foguete
function iniciarBonusFoguete() {
    if (intervaloFoguete) {
        clearInterval(intervaloFoguete);
    }

    let img_foguete = document.getElementById("img-foguete");
    bonus_display.style.display = "none";
    img_foguete.style.display = "none";

    if (count_foguete > 0) {
        intervaloFoguete = setInterval(() => {
            img_foguete.style.display = "flex";
            img_foguete.style.animation = "voar " + tempo_foguete + "ms infinite";

            const bonusBase = fogueteBonus(pontos);
            const bonus = bonusBase * (1 + count_foguete / 100);

            pontos += bonus;
            planetas.textContent = formatarNumero(pontos);
            bonus_display.style.display = "flex";
            bonus_display.style.animation = "aparecer " + tempo_foguete + "ms infinite";
            bonus_display.textContent = formatarNumero(bonus);
        }, tempo_foguete);
    }
}

iniciarBonusFoguete();

btn_foguete.addEventListener("click", () => {
    if (pontos >= foguete_preco) {
        const button_sound = document.getElementById("click-button");
        if (button_sound) {
            button_sound.currentTime = 0;
            button_sound.play();
        }

        count_foguete += 1;
        pontos -= foguete_preco;
        planetas.textContent = formatarNumero(pontos);
        foguete_preco += (foguete_preco * 500 / 100) + (foguete_preco * count_foguete / 100);
        foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
        count_foguete_display.textContent = formatarNumero(count_foguete);

        iniciarBonusFoguete();
    }
});