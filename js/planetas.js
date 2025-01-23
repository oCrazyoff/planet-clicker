let img_planeta = document.getElementById("img-planeta");
let upgrade_planeta = 1;

let info_planeta = document.getElementById("info-planeta");
let atual_planeta = "Aqualis";
let upgrade_passivo_planeta = 1;
let upgrade_click_planeta = 1;
info_planeta.innerHTML = "Esse é Aqualis, o primeiro planeta que você encontrou em suas jornadas espaciais. <span>Não tem nenhum atributo</span>";

function trocarPlaneta() {
    if (pontos >= stratosyl_price && atual_planeta == "Aqualis") {
        img_planeta.src = "https://cdn-icons-png.flaticon.com/512/2739/2739628.png";
        upgrade_passivo_planeta = 2;
        upgrade_click_planeta = 2;
        info_planeta.innerHTML = "Este é Stratosyl, o planeta dourado que você encontrou na sua segunda espedição <span>Dobra sua produção</span>";
        atual_planeta = "Stratosyl";
    } else if (pontos >= rosalia_price && atual_planeta == "Stratosyl") {
        img_planeta.src = "https://static.vecteezy.com/system/resources/previews/024/596/370/non_2x/pink-planet-illustration-free-png.png";
        upgrade_passivo_planeta = 3;
        upgrade_click_planeta = 1;
        info_planeta.innerHTML = "Este é Rosalia, o planeta rosa que você encontrou na sua terceira espedição <span>Triplica seu poder de click</span>";
        atual_planeta = "Rosalia";
    }
}