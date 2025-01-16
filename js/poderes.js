//poder minerador
let btn_miner = document.getElementById("btn-miner");
let miner_preco = 10;
let miner_preco_display = document.getElementById("miner-preco");
let count_miner_display = document.getElementById("count-btn-miner");
let count_miner = 0;
let valor_click = 1;
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
        valor_click += valor_click * 10 / 100;
        valor_click += valor_click * upgrade_miner;
        pontos -= miner_preco;
        planetas.textContent = formatarNumero(pontos);
        miner_preco += miner_preco * 25 / 100;
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
        if (ganho_passivo < 1) {
            ganho_passivo += 1;
        } else {
            ganho_passivo += ganho_passivo * 25 / 100;
            ganho_passivo += ganho_passivo * upgrade_laser;
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
        laser_preco += laser_preco * 50 / 100;
        laser_preco_display.textContent = "(" + formatarNumero(laser_preco) + ")";
        count_laser_display.textContent = count_laser;
    }
});

//poder sonda
let btn_sonda = document.getElementById("btn-sonda");
let sonda_preco_display = document.getElementById("sonda-preco");
let sonda_preco = 500;
let count_sonda_display = document.getElementById("count-btn-sonda");
let count_sonda = 0;
let upgrade_sonda = 0;

btn_sonda.addEventListener("click", () => {
    if (pontos >= sonda_preco) {
        ganho_passivo += ganho_passivo * 30 / 100;
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
        sonda_preco += sonda_preco * 80 / 100;
        sonda_preco_display.textContent = "(" + formatarNumero(sonda_preco) + ")";
        count_sonda_display.textContent = count_sonda;
    }
});

//poder luva gravitacional
let btn_luva = document.getElementById("btn-luva");
let luva_preco_display = document.getElementById("luva-preco");
let luva_preco = 750;
let count_luva_display = document.getElementById("count-btn-luva");
let count_luva = 0;
let upgrade_luva = 0;

btn_luva.addEventListener("click", () => {
    if (pontos >= luva_preco) {
        valor_click += valor_click * 20 / 100;
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
        luva_preco += luva_preco * 65 / 100;
        luva_preco_display.textContent = "(" + formatarNumero(luva_preco) + ")";
        count_luva_display.textContent = count_luva;
    }
});

// Poder foguete
let btn_foguete = document.getElementById("btn-foguete");
let foguete_preco_display = document.getElementById("foguete-preco");
let foguete_preco = 1000;
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
        foguete_preco += foguete_preco * 350 / 100;
        foguete_preco_display.textContent = "(" + formatarNumero(foguete_preco) + ")";
        count_foguete_display.textContent = formatarNumero(count_foguete);

        iniciarBonusFoguete();
    }
});