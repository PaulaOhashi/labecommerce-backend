import  express, { Request, Response} from 'express'
import cors from 'cors'
import { db } from "./database/knex";

const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

app.get('/ping',(req:Request,res:Response)=>{
    res.send("Pong!")
})
//=================================================================================
//===============================ENDPOINTS OF USERS================================

//====================Get all users=========================
app.get('/users',async(req:Request,res:Response)=>{
    try {
        const result = await db.raw(`SELECT * FROM users`)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//======================Create user===========================
app.post('/users',async(req:Request,res:Response)=>{
    try {
        const id = req.body.id
        const name = req.body.name 
        const email = req.body.email
        const password = req.body.password 
        const createdAt = req.body.createdAt 

        const [existingUser] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${id}" 
        `)
        const [existingEmail] = await db.raw(`
            SELECT * FROM users
            WHERE email = "${email}" 
        `)

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
        
        await db.raw(`
            INSERT INTO users(id,name,email,password,created_at)
            VALUES("${id}","${name}","${email}","${password}","${createdAt}")
        `)

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

//======================delete user==========================
app.delete("/users/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="u"){
            res.status(400)
            throw new Error('Id inválido! Deve começar coma a letra "u"')
        }
       
        const [accountToDelete] = await db.raw(`
            SELECT * FROM users
            WHERE id = "${idToDelete}"
        `)

        if(!accountToDelete){
            res.status(404)
            throw new Error("id não encontrado!")
        }

        await db.raw(`
            DELETE FROM users
            WHERE id = "${idToDelete}"
        `)

        res.status(200).send("User apagado com sucesso")

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }
    }
    
})

//===================================================================================
//==========================ENDPOINTS OF PRODUCTS====================================

//==========Search product by name or all products================
app.get('/products',async(req:Request,res:Response)=>{
    try {
        const q = req.query.name as string
        const allProducts = await db.raw(`SELECT * FROM products`) 
        
        if(q){
            const [result] = await db.raw(`
            SELECT * FROM products 
            WHERE LOWER(name) = LOWER("${q}")
        `)
            res.status(200).send(result)
        }else{
            res.status(200).send(allProducts)
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

//=====================Create Product=====================
 app.post('/products',async(req:Request,res:Response)=>{
    try {
        const id = req.body.id 
        const name = req.body.name 
        const price = req.body.price 
        const description = req.body.description 
        const imageUrl = req.body.imageUrl
        
        const [existingProduct] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}"
        `) 

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
    
        await db.raw(`
            INSERT INTO products
            VALUES("${id}","${name}","${price}","${description}","${imageUrl}")
        `)
    
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

//======================delete product===========================
app.delete("/products/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="p" && idToDelete[1]!=="r" && idToDelete[2]!=="o" && idToDelete[3]!=="d"){
            res.status(400)
            throw new Error('Id inválido! Deve começar com "prod"')
        }
       
        const [accountToDelete] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${idToDelete}"
        `)

        if(!accountToDelete){
            res.status(404)
            throw new Error("id não encontrado!")
        }

        await db.raw(`
            DELETE FROM products
            WHERE id = "${idToDelete}"
        `)

        res.status(200).send("Produto apagado com sucesso")

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }
    }
    
})

//======================Edit Product=======================
app.put("/products/:id",async(req:Request,res:Response)=>{
    try {
        const idToEdit = req.params.id

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

        const [product] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${idToEdit}"
        `)

        if(product){
            await db.raw(`
                UPDATE products
                SET
                    id = "${newId || product.id}",
                    name = "${newName || product.name}",
                    price = "${newPrice || product.price}",
                    description = "${newDescription || product.description}",
                    image_url = "${newImageUrl || product.image_url}"
                WHERE
                    id = "${idToEdit}"
            `)
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

//========================Get Products by id===================
app.get("/products/:id",async(res:Response,req:Request)=>{
    try {
        const id = req.params.id
        const [result] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}"
        `)

        if(result){
            res.status(200).send("Objeto encontrado no arquivo db")
        }else{
            res.status(404)
            throw new Error("Usuário não encontrado!")
        } 
    
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
    
}) 

//===========================================================================
//==============================ENDPOINTS OF PURCHASES=======================

//========================Get Purchases=====================
app.get('/purchases',async(req:Request,res:Response)=>{
    try {
        const result = await db.raw(`SELECT * FROM purchases`)
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//========================Create Purchase=======================
app.post('/purchases',async(req:Request,res:Response)=>{
    try {
        const id = req.body.id 
        const buyer = req.body.buyer 
        const total_price = req.body.total_price 
        const created_at = req.body.created_at 
                
        const [existingPurchase] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${id}"
        `) 

        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422)
                throw new Error("O id deve ser uma string!")
            }
            if(existingPurchase){
                res.status(409)
                throw new Error("Já existe uma compra com esse id")
            }
        }else{
            res.status(400)
            throw new Error("O id é obrigatório!")
        }
    
        if(buyer!==undefined){
            if(typeof(buyer)!=="string"){
                res.status(422)
                throw new Error("O buyer deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("O buyer é obrigatório!")
        }
    
        if(total_price!==undefined){
            if(typeof(total_price)!=="number"){
                res.status(422)
                throw new Error("O preço deve ser um número!")
            }
        }else{
            res.status(400)
            throw new Error("O preço é obrigatório!")
        }
    
        if(created_at!==undefined){
            if(typeof(created_at)!=="string"){
                res.status(422)
                throw new Error("A created_at deve ser uma string!")
            }
        }else{
            res.status(400)
            throw new Error("A created_at é obrigatória!")
        }
        
        await db.raw(`
            INSERT INTO purchases
            VALUES("${id}","${buyer}","${total_price}","${created_at}")
        `)
    
        res.status(201).send("Compra cadastrada com sucesso")    
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

//============================delete purchase===================
app.delete("/purchases/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="c"){
            res.status(400)
            throw new Error('Id inválido! Deve começar coma a letra "c"')
        }
       
        const [accountToDelete] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${idToDelete}"
        `)

        if(!accountToDelete){
            res.status(404)
            throw new Error("id não encontrado!")
        }

        await db.raw(`
            DELETE FROM purchases
            WHERE id = "${idToDelete}"
        `)

        res.status(200).send("Pedido cancelado com sucesso")

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Erro desconhecido")
        }
    }
    
})


