import { products,users } from "./database";
import { getAllUsers,createUser,createProduct,getAllProducts,searchProductsByName } from "./database";
import  express, { Request, Response} from 'express'
import cors from 'cors'
import { TProduct,TUser } from "./types"


const app = express()
app.use(express.json())
app.use(cors())

//console.log(createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99"))
//console.log(getAllUsers())
//console.log(createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.","imagem"))
//console.log(getAllProducts())
/* console.log(searchProductsByName("Monitor")) */

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

app.get('/ping',(req:Request,res:Response)=>{
    res.send("Pong!")
})

app.get('/users',(req:Request,res:Response)=>{
    res.status(200).send(users)
})

app.get('/products',(req:Request,res:Response)=>{
    const q = req.query.q as string

    if(q === undefined){
        return res.status(200).send(products)
    }else{
    const result: TProduct[] = products.filter(
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(result)
    }
})

//cadastrar usuário
app.post('/users',(req:Request,res:Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string
    const createdAt = req.body.createdAt as string

    const newUser:TUser = {
        id,
        name,
        email,
        password,
        createdAt
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso")
})

//cadastrar produto
app.post('/products',(req:Request,res:Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    const newProduct:TProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso")
})


//delete user
app.delete("/users/:id",(req:Request,res:Response)=>{
    const id = req.params.id

    const accountToDelete = users.findIndex((user)=>user.id===id)

    if(accountToDelete >= 0){
        users.splice(accountToDelete,1)
    }
    res.status(200).send("User apagado com sucesso")
})

//delete product
app.delete("/products/:id",(req:Request,res:Response)=>{
    const id = req.params.id

    const accountToDelete = products.findIndex((product)=>product.id===id)

    if(accountToDelete >= 0){
        products.splice(accountToDelete,1)
    }
    res.status(200).send("Produto apagado com sucesso")
})

//Editar Produto
app.put("/products/:id",(req:Request,res:Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const product = products.find((prod)=>prod.id === id)

    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }else{
        res.status(200).send("Id não localizado!")
    }

    res.status(200).send("Produto atualizado com sucesso!")
})