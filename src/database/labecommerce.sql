-- Active: 1687486425316@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users(id,name,email,password,created_at)
VALUES("u001","Beltrana","beltrana@email.com","beltrana123",DATE('now')),
      ("u002","Ciclano","ciclano@email.com","ciclano123",DATE('now')),
      ("u003","Fulano","fulano@email.com","fulano123",DATE('now'));

CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO products(id,name,price,description,image_url)
VALUES("pro001","Mouse",80,"Mouse sem fio","img1"),
      ("pro002","Monitor",1000,"Monitor full HD","img2"),
      ("pro003","Teclado",200,"Teclado sem fio","img3"),
      ("pro004","Caixa de som",500,"Caixa de som sem fio","img4"),
      ("pro005","Web Cam",400,"Web cam","img5");

DROP TABLE users;

DROP TABLE products;

--Retorna todas as pessoas cadastradas
SELECT * FROM users;

--Retorna todos os produtos cadastrados
SELECT * FROM products;

--Retorna os produtos pesquisados
SELECT * FROM products
WHERE name LIKE "mouse";

--Cadastra um novo usuário
INSERT INTO users(id,name,email,password,created_at)
VALUES("u004","Paula","paula@email.com","1234",DATE('now'));

--Cadastra um novo produto
INSERT INTO products(id,name,price,description,image_url)
VALUES("pro006","PC gamer","5000","Pc gamer","PC");

--Delet user by ID
DELETE FROM users
WHERE id = "u004";

--Delet product by ID
DELETE FROM products
WHERE id = "pro001";

--Edit product by ID
UPDATE products
SET name = "Notebook",
    price = "6000",
    description = "mimimi",
    image_url = "bbbb"
WHERE
    id = "pro002";




