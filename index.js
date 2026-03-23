const express = require('express');
const app = express();

app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
    res.send('🎬 API de Filmes funcionando!');
});

// Dados em memória
let filmes = [
    { id: 1, titulo: "Interestelar", autor: "Christopher Nolan", ano: 2014, genero: "Ficção", nota: 9 },
    { id: 2, titulo: "Vingadores: Ultimato", autor: "Anthony Russo", ano: 2019, genero: "Ação", nota: 8.5 },
    { id: 3, titulo: "Parasita", autor: "Bong Joon-ho", ano: 2019, genero: "Drama", nota: 9 },
    { id: 4, titulo: "Matrix", autor: "Wachowski", ano: 1999, genero: "Ficção", nota: 9.5 },
    { id: 5, titulo: "O Batman", autor: "Matt Reeves", ano: 2022, genero: "Ação", nota: 8 },
    { id: 6, titulo: "Coringa", autor: "Todd Phillips", ano: 2019, genero: "Drama", nota: 8.7 },
    { id: 7, titulo: "Toy Story", autor: "John Lasseter", ano: 1995, genero: "Animação", nota: 8.3 },
    { id: 8, titulo: "Avatar", autor: "James Cameron", ano: 2009, genero: "Ficção", nota: 8 },
    { id: 9, titulo: "Gladiador", autor: "Ridley Scott", ano: 2000, genero: "Ação", nota: 8.5 },
    { id: 10, titulo: "Titanic", autor: "James Cameron", ano: 1997, genero: "Romance", nota: 8.4 }
];

// GET - listar filmes
app.get('/api/filmes', (req, res) => {
    const { genero, nota_min, nota_max, ordem, direcao, pagina = 1, limite = 5 } = req.query;

    let resultado = [...filmes];

    // filtros
    if (genero) resultado = resultado.filter(f => f.genero === genero);
    if (nota_min) resultado = resultado.filter(f => f.nota >= parseFloat(nota_min));
    if (nota_max) resultado = resultado.filter(f => f.nota <= parseFloat(nota_max));

    // ordenação
    if (ordem) {
        resultado.sort((a, b) => {
            if (ordem === 'titulo') {
                return direcao === 'desc'
                    ? b.titulo.localeCompare(a.titulo)
                    : a.titulo.localeCompare(b.titulo);
            }
            if (ordem === 'nota') {
                return direcao === 'desc'
                    ? b.nota - a.nota
                    : a.nota - b.nota;
            }
            return 0;
        });
    }

    // paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;
    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

// GET por ID
app.get('/api/filmes/:id', (req, res) => {
    const filme = filmes.find(f => f.id === parseInt(req.params.id));

    if (!filme) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(filme);
});

// POST - criar filme
app.post('/api/filmes', (req, res) => {
    const { titulo, autor, ano, genero, nota } = req.body;

    // validação de campos obrigatórios
    if (!titulo || !autor || !ano || !genero || nota === undefined) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios"
        });
    }

    // validação de tipos
    if (typeof ano !== 'number' || typeof nota !== 'number') {
        return res.status(400).json({
            erro: "Ano e nota devem ser números"
        });
    }

    // validação de regras
    if (nota < 0 || nota > 10) {
        return res.status(400).json({
            erro: "Nota deve ser entre 0 e 10"
        });
    }

    if (ano < 1900 || ano > 2100) {
        return res.status(400).json({
            erro: "Ano inválido"
        });
    }

    // criar novo filme
    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        autor,
        ano,
        genero,
        nota
    };

    filmes.push(novoFilme);

    res.status(201).json({
        mensagem: "Filme criado com sucesso",
        filme: novoFilme
    });
});

// iniciar servidor
app.listen(3000, () => {
    console.log('🚀 API rodando em http://localhost:3000');
});