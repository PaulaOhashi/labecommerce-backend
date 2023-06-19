"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send("Pong!");
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    const q = req.query.q;
    if (q === undefined) {
        return res.status(200).send(database_1.products);
    }
    else {
        const result = database_1.products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()));
        res.status(200).send(result);
    }
});
app.post('/users', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const createdAt = req.body.createdAt;
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post('/products', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
//# sourceMappingURL=index.js.map