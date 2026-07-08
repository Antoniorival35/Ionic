import express from "express";

const app = express();

function autenticar(req, res, next) {
    const token = req.headers.authorization;

    if (token != "123456") {
        return res.status(401).json({
            erro: "Não autorizado"
        });
    }

    next();
}

app.get("/usuarios", (req, res) => {
    const usuarios = [
        {
            id: 1,
            nome: "João",
            email: "joao@email.com"
        },
        {
            id: 2,
            nome: "Maria",
            email: "maria@email.com"
        }
    ];

    res.json(usuarios);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});