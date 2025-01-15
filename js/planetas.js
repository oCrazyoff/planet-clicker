let img_planeta = document.getElementById("img-planeta");
let upgrade_planeta = 1;

let info_planeta = document.getElementById("info-planeta");

function trocarPlaneta() {
    info_planeta.innerHTML = "Esse é Aqualis, o primeiro planeta que você encontrou em suas jornadas espaciais. <span>Não tem nenhum atributo</span>";
    if (pontos >= stratosyl_price) {
        img_planeta.src = "https://cdn-icons-png.flaticon.com/512/2739/2739628.png";
        upgrade_planeta = 2;
        info_planeta.innerHTML = "Este é Stratosyl, o planeta dourado que você encontrou na sua segunda espedição <span>Dobra sua produção</span>"
    }
}

trocarPlaneta();