const containerPoderes = document.querySelector('.container-poderes');
const containerUpgrades = document.querySelector('.container-upgrades');
const containerConfig = document.querySelector('.container-config');
const menuPoderes = document.getElementById('menu-poderes');
const menuUpgrades = document.getElementById('menu-upgrades');
const menuConfig = document.getElementById('menu-config');
const menus = [
    { button: menuPoderes, container: containerPoderes },
    { button: menuUpgrades, container: containerUpgrades },
    { button: menuConfig, container: containerConfig },
];

function handleMenuClick(activeMenu) {
    somClickMenu.currentTime = 0;
    somClickMenu.play();

    menus.forEach(({ button, container }) => {
        const isActive = button === activeMenu.button;
        container.classList.toggle('desativado', !isActive);
        button.style.backgroundColor = isActive ? "#000" : "#393939";
    });
}

menuPoderes.addEventListener('click', () => handleMenuClick(menus[0]));
menuUpgrades.addEventListener('click', () => handleMenuClick(menus[1]));
menuConfig.addEventListener('click', () => handleMenuClick(menus[2]));