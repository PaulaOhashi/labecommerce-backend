-- Active: 1687486425316@@127.0.0.1@3306

-----------------USERS---------------------
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL 
);

--Inserindo users na tabela
INSERT INTO users(id,name,email,password,created_at)
VALUES("u001","Beltrana","beltrana@email.com","beltrana123",DATE('now')),
      ("u002","Ciclano","ciclano@email.com","ciclano123",DATE('now')),
      ("u003","Fulano","fulano@email.com","fulano123",DATE('now'));

--Deletar tabela
DROP TABLE users;

--Retorna todas as pessoas cadastradas
SELECT * FROM users;

--Cadastra um novo usuário
INSERT INTO users(id,name,email,password,created_at)
VALUES("u004","Paula","paula@email.com","1234",DATE('now'));

--Delet user by ID
DELETE FROM users
WHERE id = "002";

--Edita usuário
UPDATE users
SET id = "u006"
WHERE
    id = "u001";
---------------------PRODUCTS--------------------
--Criando a tabela
CREATE TABLE products(
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

DROP TABLE products;

--Inserindo Produtos na tabela
INSERT INTO products(id,name,price,description,image_url)
VALUES("pro001","Mouse",80,"Mouse sem fio","img1"),
      ("pro002","Monitor",1000,"Monitor full HD","img2"),
      ("pro003","Teclado",200,"Teclado sem fio","img3"),
      ("pro004","Caixa de som",500,"Caixa de som sem fio","img4"),
      ("pro005","Web Cam",400,"Web cam","img5");

--Deletando tabela
DROP TABLE products;

--Retorna todos os produtos cadastrados
SELECT * FROM products;

--Retorna os produtos pesquisados
SELECT * FROM products
WHERE name LIKE "mouse";

--Cadastra um novo produto
INSERT INTO products(id,name,price,description,image_url)
VALUES("pro006","PC gamer","5000","Pc gamer","PC");

--Delet product by ID
DELETE FROM products
WHERE id = "pro001";

--Edit product by ID
UPDATE products
SET id = "pro000",
    name = "Notebook",
    price = "6000",
    description = "mimimi",
    image_url = "bbbb"
WHERE
    id = "pro002";

------------------------------PEDIDOS-----------------------
--Create table purchases
CREATE TABLE purchases(
    id TEXT PRIMARY KEY NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

DROP TABLE purchases;

--Get all purchases
SELECT * FROM purchases;

--Insert purchases
INSERT INTO purchases(id,buyer,total_price,created_at)
VALUES("c001","u001",2000,DATE('now')),
      ("c002","u002",500,DATE('NOW'));

--Show tables
SELECT 
    purchases.id AS purchase_id,
    users.id AS user_id,
    buyer AS buyer_name,
    users.email,
    total_price,
    purchases.created_at
FROM users
INNER JOIN purchases
ON purchases.buyer = users.id;

-----------------------------------Tabela de Referencia----------------------
--Create table purchases_products
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);   

DROP TABLE purchases_products;

INSERT INTO purchases_products(purchase_id,product_id,quantity)
VALUES("c001","pro001",5),
      ("c001","pro002",3),
      ("c002","pro001",2),
      ("c002","pro003",1);

SELECT
    purchases.id AS Purchase,
    purchases.created_at AS Created_data,
    users.name,
    purchases.buyer AS Buyer,
    purchases.total_price AS totalPrice,
    purchases_products.product_id AS productID,
    purchases_products.quantity,
    products.name AS ProcductName,
    products.description,
    products.price
FROM purchases_products
INNER JOIN purchases ON purchases.id = purchases_products.purchase_id
INNER JOIN products ON products.id = purchases_products.product_id
INNER JOIN users ON users.id = purchases.buyer;