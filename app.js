const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações de conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432, // Porta padrão do PostgreSQL
});

// Rota para lidar com o envio do formulário
app.post('/registrar', (req, res) => {
  const { name, email, number, password } = req.body;

  // Realizar uma inserção de exemplo
  const query = 'INSERT INTO sua_tabela (name, email, number, password) VALUES ($1, $2, $3, $4)';
  const values = [name, email, number, password];

  // Usar o pool para executar a consulta
  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro na inserção:', err);
      res.status(500).send('Erro ao inserir dados no banco de dados.');
      return;
    }
    console.log('Dados inseridos com sucesso.');
    res.send('Dados inseridos com sucesso!');
  });
});

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
