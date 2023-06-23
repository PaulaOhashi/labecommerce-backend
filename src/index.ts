import { products,users } from "./database";
import { getAllUsers,createUser,createProduct,getAllProducts,searchProductsByName } from "./database";
import  express, { Request, Response} from 'express'
import cors from 'cors'
import { TProduct,TUser } from "./types"

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

app.get('/ping',(req:Request,res:Response)=>{
    res.send("Pong!")
})

//Get all users
app.get('/users',(req:Request,res:Response)=>{
    try {
        res.status(200).send(users)
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
    }
})

//Get Products
app.get('/products',(req:Request,res:Response)=>{
    try {
        const q = req.query.q as string
        
        if(q!==undefined){
        const result: TProduct[] = products.filter((product) => product.name.toLowerCase().includes(q.toLowerCase()))
        res.status(200).send(result)
        }else{
            return res.status(200).send(products)
        }
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
})

//cadastrar usuário
app.post('/users',(req:Request,res:Response)=>{
    try {
        const id = req.body.id
        const name = req.body.name 
        const email = req.body.email
        const password = req.body.password 
        const createdAt = req.body.createdAt 

        const existingUser = users.find((user) => user.id === id)
        const existingEmail = users.find((user)=>user.email===email)

        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422)
                throw new Error("O id deve ser uma string!")
            }
            if(existingUser){
                res.status(409)
                throw new Error("Usuário já existe com a mesma id!")
            }
        }else{
            res.status(400)
            throw new Error("O id é obrigatório!")
        }

        if(name!==undefined){
            if(typeof(name)!=="string"){
                res.status(422)
                throw new Error("O nome deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O name é obrigatório!")
        }

        if(email!==undefined){
            if(typeof(email)!=="string"){
                res.status(422)
                throw new Error("O email deve ser uma string!")
            }
            if(existingEmail){
                res.status(409)
                throw new Error("Esse email já está cadastrado!")
            }
        }else{
            res.status(400)
            throw new Error("O email é obrigatório!")
        }

        if(password!==undefined){
            if(typeof(password)!=="string"){
                res.status(422)
                throw new Error("O password deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O password é obrigatório!")
        }

        if(createdAt!==undefined){
            if(typeof(createdAt)!=="string"){
                res.status(422)
                throw new Error("O createdAt deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O createdAt é obrigatório!")
        }
        
        const newUser:TUser = {
            id,
            name,
            email,
            password,
            createdAt
        }

        users.push(newUser)

        res.status(201).send("Cadastro realizado com sucesso")    
    }catch(error){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
    
})

//cadastrar produto
app.post('/products',(req:Request,res:Response)=>{
    try {
        const id = req.body.id 
        const name = req.body.name 
        const price = req.body.price 
        const description = req.body.description 
        const imageUrl = req.body.imageUrl
        
        const existingProduct = products.find((product) => product.id === id)

        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422)
                throw new Error("O id deve ser uma string!")
            }
            if(existingProduct){
                res.status(409)
                throw new Error("Já existe um produto com esse id")
            }
        }else{
            res.status(400)
            throw new Error("O id é obrigatório!")
        }
    
        if(name!==undefined){
            if(typeof(name)!=="string"){
                res.status(422)
                throw new Error("O nome deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O name é obrigatório!")
        }
    
        if(price!==undefined){
            if(typeof(price)!=="number"){
                res.status(422)
                throw new Error("O preço deve ser um número!")
            }
        }else{
            res.status(400)
            throw new Error("O preço é obrigatório!")
        }
    
        if(description!==undefined){
            if(typeof(description)!=="string"){
                res.status(422)
                throw new Error("A descrição deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("A descrição é obrigatória!")
        }
    
        if(imageUrl!==undefined){
            if(typeof(imageUrl)!=="string"){
                res.status(422)
                throw new Error("O imageUrl deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O imageUrl é obrigatório!")
        }
    
        const newProduct:TProduct = {
            id,
            name,
            price,
            description,
            imageUrl
        }
    
        products.push(newProduct)
    
        res.status(201).send("Produto cadastrado com sucesso")    
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Erro inesperado")
        }
    }
    
    
})


//delete user
app.delete("/users/:id",(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        if(id && id[0]!=="u"){
            res.status(400)
            throw new Error('Id inválido! Deve começar coma a letra "u"')
        }
        const accountToDelete = users.findIndex((user)=>user.id===id)
        if(accountToDelete<0){
            res.status(404)
            throw new Error("Usuário não encontrado!")
        }

        if(accountToDelete >= 0){
        users.splice(accountToDelete,1)
        }

        res.status(200).send("User apagado com sucesso")
    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }
    }
    
})

//delete product
app.delete("/products/:id",(req:Request,res:Response)=>{
    try {
        const id = req.params.id
        if(id && id[0]!=="p" && id[1]!=="r" && id[2]!=="o" && id[3]!=="d"){
            res.status(400)
            throw new Error('Id inválido! Deve começar com "prod"')
        }
    
        const accountToDelete = products.findIndex((product)=>product.id===id)
        if(accountToDelete<0){
            res.status(404)
            throw new Error("Usuário não encontrado")
        }
        if(accountToDelete >= 0){
            products.splice(accountToDelete,1)
        }
        res.status(200).send("Produto apagado com sucesso")
        
    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }  
    }
    
})

//Editar Produto
app.put("/products/:id",(req:Request,res:Response)=>{
    try {
        const id = req.params.id

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price 
        const newDescription = req.body.description 
        const newImageUrl = req.body.imageUrl 

        //verificando newId
        if(newId!==undefined){
            if(typeof(newId)!=="string"){
                res.status(422)
                throw new Error("O id deve ser uma string")
            }if(newId[0]!=="p" && newId[1]!=="r" && newId[2]!=="o" && newId[3]!=="d"){
                res.status(400)
                throw new Error("O id deve começar com 'prod'")
            }
        }

        //verificando newName
        if(newName!==undefined){
            if(typeof(newName)!=="string"){
                res.status(422)
                throw new Error("O name deve ser uma string!")
            }
        }

        //verificando newPrice
        if(newPrice!==undefined){
            if(typeof(newPrice)!=="number"){
                res.status(422)
                throw new Error("O price deve ser um número!")
            }if(newPrice<0){
                res.status(400)
                throw new Error("O price deve ser maior que 0!")
            }
        }
        
        //verificando newDescription
        if(newDescription!==undefined){
            if(typeof(newDescription)!=="string"){
                res.status(422)
                throw new Error("A description deve ser uma string!")
            }
        }

        //verificando newImageUrl
        if(newImageUrl!==undefined){
            if(typeof(newImageUrl)!=="string"){
                res.status(422)
                throw new Error("A imagem deve ser uma string!")
            }
        }

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
    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }
    }
})