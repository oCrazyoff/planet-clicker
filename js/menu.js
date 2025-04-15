const containerPoderes = document.querySelector('.container-poderes');
const containerUpgrades = document.querySelector('.container-upgrades');
menuPoderes.addEventListener('click', () => {
    // Som
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    containerUpgrades.classList.add('desativado');
    containerPoderes.classList.remove('desativado');
    menuPoderes.style.backgroundColor = "#000";
    menuUpgrades.style.backgroundColor = "#393939";
});

menuUpgrades.addEventListener('click', () => {
    // Som
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    containerUpgrades.classList.remove('desativado');
    containerPoderes.classList.add('desativado');
    menuUpgrades.style.backgroundColor = "#000";
    menuPoderes.style.backgroundColor = "#393939";
});