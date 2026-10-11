const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// 1. Rota de Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Tentativa de login: ${username}`);
    
    // Retorna resposta de sucesso para o cliente C++
    res.json({
        success: true,
        message: "Autenticado com sucesso",
        username: username || "Usuario"
    });
});

// 2. Rota de Heartbeat (validação contínua da sessão)
app.post('/heartbeat', (req, res) => {
    res.json({ success: true });
});

// 3. Rota de Módulo (envia o arquivo/binário para o cliente)
app.get('/module', (req, res) => {
    const filePath = path.join(__dirname, 'module.bin');
    
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send('Módulo não encontrado no servidor.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
