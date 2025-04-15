document.getElementById('btn-reset').addEventListener('click', () => {
    localStorage.removeItem('planetas');
    localStorage.removeItem('planetasPassivos');
    localStorage.removeItem('valorDeClique');
    localStorage.removeItem('poderes');
    localStorage.removeItem('precoPoderes');
    localStorage.removeItem('ganhoPoderes');
    localStorage.removeItem('upgrades');
    localStorage.removeItem('precoUpgrades');
    localStorage.removeItem('ganhoUpgrades');
    localStorage.removeItem('planetaAtual');
    localStorage.removeItem('upgradePlanetaClique');
    localStorage.removeItem('upgradePlanetaPassivo');
    localStorage.removeItem('pontosProgresso');

    // Recarrega a página para aplicar as mudanças
    location.reload();
});

// ==================== Lógica de Debug ====================
// Pode ser movido para um arquivo chamado `debugLogic.js`
document.getElementById('btn-debug').addEventListener('click', () => {
    const senha = prompt("Digite a senha: ");

    if (senha === '123@adm') {
        abrirMenuDebug();
    } else {
        alert("Senha incorreta!");
    }
});

document.getElementById('fechar').addEventListener('click', () => {
    document.querySelector(".debug-menu").style.display = 'none';
});

function abrirMenuDebug() {
    document.querySelector(".debug-menu").style.display = 'block';
}

document.getElementById('btn-hack-500k').addEventListener('click', () => {
    planetas += 500000;

    atualizarInterface();
});

document.getElementById('btn-hack-1M').addEventListener('click', () => {
    planetas += 1000000;

    atualizarInterface();
});

document.getElementById('btn-hack-1B').addEventListener('click', () => {
    planetas += 1000000000;

    atualizarInterface();
});

document.getElementById('btn-hack-10Q').addEventListener('click', () => {
    planetas += 10000000000000000;

    atualizarInterface();
});