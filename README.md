# API de Filmes 🎬

## 📌 Descrição

API REST desenvolvida com Node.js e Express para gerenciamento de filmes. Permite listar, buscar, filtrar, ordenar e cadastrar filmes.

---

## 🚀 Como rodar o projeto

```bash
npm install
node index.js
```

Servidor rodando em:

```
http://localhost:3000
```

---

# 📡 Endpoints

## 🔹 1. Listar filmes

**GET** `/api/filmes`

### Query Params (opcional)

* `genero`
* `nota_min`
* `nota_max`
* `ordem` → titulo | nota
* `direcao` → asc | desc
* `pagina`
* `limite`

### Exemplo

```
GET /api/filmes?genero=Ficção&ordem=nota&direcao=desc
```

### Resposta

```json
{
  "dados": [
    {
      "id": 1,
      "titulo": "Interestelar",
      "autor": "Christopher Nolan",
      "ano": 2014,
      "genero": "Ficção",
      "nota": 9
    }
  ],
  "paginacao": {
    "pagina_atual": 1,
    "itens_por_pagina": 5,
    "total_itens": 10,
    "total_paginas": 2
  }
}
```

---

## 🔹 2. Buscar filme por ID

**GET** `/api/filmes/:id`

### Exemplo

```
GET /api/filmes/1
```

### Resposta

```json
{
  "id": 1,
  "titulo": "Interestelar",
  "autor": "Christopher Nolan",
  "ano": 2014,
  "genero": "Ficção",
  "nota": 9
}
```

### Erro

```json
{
  "erro": "Filme não encontrado"
}
```

---

## 🔹 3. Criar filme

**POST** `/api/filmes`

### Body (JSON)

```json
{
  "titulo": "Novo Filme",
  "autor": "Diretor",
  "ano": 2023,
  "genero": "Ação",
  "nota": 8.5
}
```

### Resposta

```json
{
  "mensagem": "Filme criado com sucesso",
  "filme": {
    "id": 11,
    "titulo": "Novo Filme",
    "autor": "Diretor",
    "ano": 2023,
    "genero": "Ação",
    "nota": 8.5
  }
}
```

---

# 🧪 Exemplos de Requisições (Postman)

### Criar filme

* Método: POST
* URL: `http://localhost:3000/api/filmes`
* Body: raw → JSON

---

### Listar filmes

* Método: GET
* URL: `http://localhost:3000/api/filmes`

---

### Buscar por ID

* Método: GET
* URL: `http://localhost:3000/api/filmes/1`

---

# 🛡️ Validações Implementadas

No endpoint POST:

* ❌ Campos obrigatórios:

  * titulo
  * autor
  * ano
  * genero
  * nota

* ❌ Tipos:

  * `ano` deve ser número
  * `nota` deve ser número

* ❌ Regras:

  * nota deve ser entre 0 e 10
  * ano deve ser válido (ex: > 1900)

### Exemplo de erro:

```json
{
  "erro": "Campos inválidos"
}
```

---

# 📸 Capturas de Tela

📌 Adicione aqui prints do Postman:

* Listando filmes
* Criando filme
* Buscando por ID

*(colar imagens no README ou anexar no Git)*

---

# 📦 Collection Postman

Exportar do Postman:

1. Clique em **Collections**
2. Export → JSON
3. Salvar no projeto

---

# ✅ Requisitos atendidos

✔ GET listar
✔ GET por ID
✔ POST funcionando
✔ Validações completas
✔ Filtros
✔ Ordenação
✔ Paginação
✔ Documentação completa

---

# 📅 Entrega

* Código da API
* README.md
* C
