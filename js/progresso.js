function salvarProgresso() {
    localStorage.setItem('planetas', planetas);
    localStorage.setItem('planetasPassivos', planetasPassivos);
    localStorage.setItem('valorDeClique', valorDeClique);
    localStorage.setItem('poderes', JSON.stringify(poderes));
    localStorage.setItem('precoPoderes', JSON.stringify(precoPoderes));
    localStorage.setItem('ganhoPoderes', JSON.stringify(ganhoPoderes));
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('precoUpgrades', JSON.stringify(precoUpgrades));
    localStorage.setItem('ganhoUpgrades', JSON.stringify(ganhoUpgrades));
    localStorage.setItem('planetaAtual', JSON.stringify(planetaAtual));
    localStorage.setItem('upgradePlanetaClique', JSON.stringify(upgradePlanetaClique));
    localStorage.setItem('upgradePlanetaPassivo', JSON.stringify(upgradePlanetaPassivo));
    localStorage.setItem('pontosProgresso', JSON.stringify(pontosProgresso));
}

function carregarProgresso() {
    if (localStorage.getItem('planetas')) {
        planetas = parseInt(localStorage.getItem('planetas'));
        planetasPassivos = parseInt(localStorage.getItem('planetasPassivos'));
        valorDeClique = parseInt(localStorage.getItem('valorDeClique'));
        poderes = JSON.parse(localStorage.getItem('poderes'));
        precoPoderes = JSON.parse(localStorage.getItem('precoPoderes'));
        ganhoPoderes = JSON.parse(localStorage.getItem('ganhoPoderes'));
        upgrades = JSON.parse(localStorage.getItem('upgrades'));
        precoUpgrades = JSON.parse(localStorage.getItem('precoUpgrades'));
        ganhoUpgrades = JSON.parse(localStorage.getItem('ganhoUpgrades'));
        planetaAtual = JSON.parse(localStorage.getItem('planetaAtual'));
        upgradePlanetaClique = JSON.parse(localStorage.getItem('upgradePlanetaClique'));
        upgradePlanetaPassivo = JSON.parse(localStorage.getItem('upgradePlanetaPassivo'));
        pontosProgresso = JSON.parse(localStorage.getItem('pontosProgresso'));
    }
}