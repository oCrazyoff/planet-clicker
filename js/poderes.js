btnPoderes.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (planetas >= precoPoderes[index]) {
            // Som
            const somPoder = document.getElementById('som-click-poder');
            somPoder.currentTime = 0;
            somPoder.play();

            // Comprar poder
            planetas -= precoPoderes[index];
            poderes[index] += 1;

            // Atualizar o valor de clique ou o ganho passivo, dependendo do tipo de poder
            if (index % 2 === 0) {
                valorDeClique += ganhoPoderes[index]; // Aumenta o valor do clique
            } else {
                planetasPassivos += ganhoPoderes[index]; // Aumenta o ganho passivo
            }

            // Aumentar o preço do poder e o ganho
            precoPoderes[index] = Math.floor(precoPoderes[index] * 1.8);
            ganhoPoderes[index] += 1;

            // Atualizar a interface
            atualizarInterface();
            salvarProgresso();
        }
    });
});