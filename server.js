const express = require('express');
const app = express();
const port = 3000;

// Define o EJS como template engine
app.set('view engine', 'ejs');

// Define a pasta onde estão os templates .ejs
app.set('views', 'views');

// Define a pasta de arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'));

// Rota principal que renderiza a página EJS
app.get('/', (req, res) => {
    res.render('index', { nome: 'Walysson' });
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
