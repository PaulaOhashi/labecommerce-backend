# Labecommerce-Backend

# Sobre o Projeto

Primeiro projeto do back-end, onde pratiquei toda a base de criação de uma API vinculada a um banco de dados real.

## Conteúdos abordados

- NodeJS
- Typescript
- Express
- SQL e SQLite
- Knex
- Postman

## Endpoints implementados
- Get all users
- Create user
- Delete user
- Get all products
- Create product
- Edit product by id
- Delete product
- Get all purchases
- Get purchase by id
- Create purchase
- Delete purchase by id

## Exemplos de Requisição
### Get /users
Retorna todos os usuários cadastrados
```
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Monitor LED Full HD 24 polegadas",
        "imageUrl": "https://picsum.photos/seed/Monitor/400"
    },
    {
        "id": "prod0033",
        "name": "Teclado gamer RGB",
        "price": 300,
        "description": "Teclado mecânico com RGB e numpad",
        "imageUrl": "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
    }
]
```

### Post /users
Cadastra um novo usuário
```
Produto cadastrado com sucesso
```

### Get /products ou Get /products?name=texto
Retorna todos os produtos cadastrados. Caso seja enviada uma query params (name) retorna o resultado da busca de produtos que contenham o "name" informado em seu nome.
* Retorno sem filtro
```
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Monitor LED Full HD 24 polegadas",
        "imageUrl": "https://picsum.photos/seed/Monitor/400"
    },
    {
        "id": "prod0033",
        "name": "Teclado gamer RGB",
        "price": 300,
        "description": "Teclado mecânico com RGB e numpad",
        "imageUrl": "https://picsum.photos/seed/Teclado%20gamer%20RGB/400"
    }
]
```
* Retorno com filtro buscando por "gamer"
```
[
    {
        "id": "prod001",
        "name": "Mouse gamer",
        "price": 250,
        "description": "Melhor mouse do mercado!",
        "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        "id": "prod003",
        "name": "Teclado gamer",
        "price": 200,
        "description": "Teclado mecânico com numpad",
        "imageUrl": "https://picsum.photos/seed/Teclado%20gamer/400"
    }
]
```

### Put /products/:id
Edita um produto cadastrado
```
Produto atualizado com sucesso
```

### GET purchases/:id
```
{
    "purchaseId": "pur001",
    "buyerId": "u001",
    "buyerName": "Fulano",
    "buyerEmail": "fulano@email.com",
    "totalPrice": 1000,
    "createdAt": "2023-07-16 05:29:19",
    "products": [
        {
            "id": "prod001",
            "name": "Mouse gamer",
            "price": 250,
            "description": "Melhor mouse do mercado!",
            "imageUrl": "https://picsum.photos/seed/Mouse%20gamer/400",
            "quantity": 2
        },
        {
            "id": "prod002",
            "name": "Monitor",
            "price": 900,
            "description": "Monitor LED Full HD 24 polegadas",
            "imageUrl": "https://picsum.photos/seed/Monitor/400",
            "quantity": 1
        }
    ]
}
```

### Post /purchases
Cadastra uma nova compra
```
Pedido realizado com sucesso
```

### Delete /purchases/:id
Deleta uma compra
```
Pedido cancelado com sucesso
```

## Link para a coleção de requisições no Postman
https://documenter.getpostman.com/view/26594526/2s93z5AR5e
