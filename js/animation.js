const clickArea = document.querySelector('.planet');

const backgrounds = [
    'url("https://cdn-icons-png.flaticon.com/512/2739/2739628.png")',
    'url("https://th.bing.com/th/id/OIP.R5xy0tqNrlQEsYrcKFvmvwHaHa?pid=ImgDet&w=191&h=191&c=7")',
    'url("https://th.bing.com/th/id/OIP.4FErC20U6cuoY5c0q1MOtQHaHf?pid=ImgDet&w=191&h=194&c=7")',
    'url("https://th.bing.com/th/id/OIP.R5xy0tqNrlQEsYrcKFvmvwHaHa?pid=ImgDet&w=191&h=191&c=7")',
    'url("https://www.pngkey.com/png/full/129-1290723_download-svg-download-png-neptune-icons.png")',
    'url("https://th.bing.com/th/id/R.773a2faad3e4635399ddc48408316f4b?rik=QvoPypVNIPHInw&pid=ImgRaw&r=0")',
    'url("https://icon-library.com/images/planets-icon/planets-icon-10.jpg")',
    'url("https://cdn-icons-png.flaticon.com/512/315/315274.png")',
    'url("https://www.freeiconspng.com/uploads/planet-icon-png-25.png")',
    'url("https://static.vecteezy.com/system/resources/previews/024/596/370/non_2x/pink-planet-illustration-free-png.png")',
];

clickArea.addEventListener('click', (e) => {
    const circle = document.createElement('div');
    circle.classList.add('bola');

    clickArea.classList.add('click');

    setTimeout(() => {
        clickArea.classList.remove('click');
    }, 100);

    const rect = clickArea.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    circle.style.left = `${x - 10}px`;
    circle.style.top = `${y - 20}px`;

    clickArea.appendChild(circle);

    const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    circle.style.backgroundImage = randomBackground;

    circle.addEventListener('animationend', () => {
        circle.remove();
    });
});
