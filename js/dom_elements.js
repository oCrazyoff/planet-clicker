const btnClick = document.getElementById('btn-click');
const countPlanetas = document.getElementById('count-planetas');
const countPlanetasPassivo = document.getElementById('count-planetas-passivo');
const valorClique = document.getElementById('valor-clique');
const btnPoderes = document.querySelectorAll('.btn-poder');
const btnUpgrades = document.querySelectorAll('.btn-upgrade');
const countPoderes = document.querySelectorAll('.count-poder .count');
const precoPoderElements = document.querySelectorAll('.preco-poder');
const ganhoPoderElements = document.querySelectorAll('.ganho-poder');
const precoUpgradeElements = document.querySelectorAll('.preco-upgrade');
const ganhoUpgradeElements = document.querySelectorAll('.ganho-upgrade');
const infoUpgradeBaixo = document.querySelectorAll('.btn-upgrade .container-info .baixo');
const barraProgressoElement = document.getElementById('barra-progresso');
const ganhoPlanetaPassivoElement = document.getElementById('ganho-planeta-passivo');
const ganhoPlanetaCliqueElement = document.getElementById('ganho-planeta-clique');
const containerBuffPlaneta = document.querySelector('.container-buff-planeta');
const btnOvniElement = document.getElementById('btn-ovni');
const containerInfoPlanetaElement = document.querySelector('.container-planeta-info');
const infoPlanetaNomeElement = document.getElementById('nome-info-planeta');
const infoImagemPlaneta = document.getElementById('info-planeta-img');
const infoPlanetaDescricaoElement = document.getElementById('info-planeta-ganho');
const btnFecharInfoPlaneta = document.getElementById('btn-info-planeta');

// ==================== Áudios ====================
const somClickMenu = document.getElementById('som-click-menu');
const somOvni = document.getElementById('som-ovni');
const somPopOvni = document.getElementById('som-pop-ovni');
const somInfoPlaneta = document.getElementById('som-info-planeta');