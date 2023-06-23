-- Active: 1687486425316@@127.0.0.1@3306
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

INSERT INTO users(id,name,email,password,created_at)
VALUES("u001","Beltrana","beltrana@email.com","beltrana123","22-06"),
      ("u002","Ciclano","ciclano@email.com","ciclano123","22-06"),
      ("u003","Fulano","fulano@email.com","fulano123","22-06");

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