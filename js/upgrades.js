btnUpgrades.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        if (planetas >= precoUpgrades[index]) {
            // Som
            const somPoder = document.getElementById('som-click-poder');
            somPoder.currentTime = 0;
            somPoder.play();

            // Comprar upgrade
            planetas -= precoUpgrades[index];
            upgrades[index] += 1;

            // Atualizar o multiplicador e o ganho
            let multiplicador = 1;
            if (upgrades[index] === 1) {
                multiplicador = 1.5;
                ganhoUpgrades[index] = 100;
            } else if (upgrades[index] === 2) {
                multiplicador = 2;
                ganhoUpgrades[index] = 200;
            } else if (upgrades[index] === 3) {
                multiplicador = 3;
            }

            // Aplicar melhoria
            ganhoPoderes[index] *= multiplicador;

            // Atualizar o preço
            precoUpgrades[index] *= 1.8;

            // Atualizar a interface
            atualizarInterface();
            salvarProgresso();
        }
    });
});