let animacaoAtual = "ovniFly1";

// Modifique a função iniciarOvni para verificar se o jogador já clicou
function iniciarOvni() {
    if (!jogadorClicouNoPlaneta) return; // Não inicia o ciclo se o jogador não clicou no planeta

    let tempoAleatorio = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;

    // Reseta a posição e exibe o OVNI
    void btnOvniElement.offsetWidth;
    btnOvniElement.style.left = "-50%";
    btnOvniElement.style.top = "50%";
    btnOvniElement.style.display = "block";

    // Alterna entre as animações
    if (animacaoAtual === "ovniFly1") {
        somOvni.currentTime = 0;
        somOvni.play();
        btnOvniElement.style.animation = "ovniFly2 5s";
        animacaoAtual = "ovniFly2";
    } else {
        somOvni.currentTime = 0;
        somOvni.play();
        btnOvniElement.style.animation = "ovniFly1 5s";
        animacaoAtual = "ovniFly1";
    }

    // Chama a função novamente após um tempo aleatório
    setTimeout(iniciarOvni, tempoAleatorio);
}

// Inicia o ciclo
iniciarOvni();

btnOvniElement.addEventListener('click', (event) => {
    let porcentagemOvni = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

    // Som
    somOvni.pause();
    somPopOvni.currentTime = 0;
    somPopOvni.play();

    // Calcular o ganho e aplica-lo
    let ganhoOvni = planetas * (porcentagemOvni / 100)
    planetas += ganhoOvni;

    // Pegar a posição do OVNI
    const posX = event.clientX;
    const posY = event.clientY;

    // Criar uma div para mostrar o ganho
    const ganhoElemento = document.createElement('div');
    ganhoElemento.classList.add('ganho-ovni');
    ganhoElemento.textContent = `+ ${formatarNumero(ganhoOvni)}`;
    ganhoElemento.style.left = `${posX}px`;
    ganhoElemento.style.top = `${posY}px`;
    document.body.appendChild(ganhoElemento);

    btnOvniElement.style.display = "none";
});