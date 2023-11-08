const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YES',
  database: 'casi_alunos',
});

// Rota para lidar com o envio do formulário
app.post('/registrar', (req, res) => {
  const { name, email, number, password } = req.body;

  // Estabelecer a conexão com o banco de dados
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados MySQL.');

    // Realizar uma inserção de exemplo
    const query = 'INSERT INTO sua_tabela (name, email, number, password) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, number, password], (err, results) => {
      if (err) {
        console.error('Erro na inserção:', err);
        return;
      }
      console.log('Dados inseridos com sucesso.');
      res.send('Dados inseridos com sucesso!');
    });

    // Fechar a conexão com o banco de dados
    connection.end((err) => {
      if (err) {
        console.error('Erro ao fechar a conexão:', err);
      }
      console.log('Conexão encerrada.');
    });
  });
});

// Inicie o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
