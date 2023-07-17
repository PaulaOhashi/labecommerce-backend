import  express, { Request, Response} from 'express'
import cors from 'cors'
import { db } from "./database/knex";
import { error } from 'console';
import { Purchase } from './types';

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
        const result = await db("users").select("id","name","email","password","created_at as createdAt")

        if(result.length<=0){
            throw new Error("No user found")
        }else{
            res.status(200).send(result)
        }

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
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

        const [existingUser] = await db("users").where({id:id})
        const [existingEmail] = await db("users").where({email:email})

        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422)
                throw new Error("id must be a string!")
            }
            if(id[0] !== "u"){
                res.status(400)
                throw new Error("id must start with the letter 'u'")
            }
            if(existingUser){
                res.status(409)
                throw new Error("User already exists with the same id!")
            }
        }else{
            res.status(400)
            throw new Error("id is required")
        }

        if(name!==undefined){
            if(typeof(name)!=="string"){
                res.status(422)
                throw new Error("Name must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Name is required!")
        }

        if(email!==undefined){
            if(typeof(email)!=="string"){
                res.status(422)
                throw new Error("Email must be a string!")
            }
            if(existingEmail){
                res.status(409)
                throw new Error("This email is already registered!")
            }
        }else{
            res.status(400)
            throw new Error("Email is required!")
        }

        if(password!==undefined){
            if(typeof(password)!=="string"){
                res.status(422)
                throw new Error("Password must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Password is required!")
        }
        
        const newUser = {
            id:id,
            name:name,
            email:email,
            password:password,
            created_at:new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        await db("users").insert(newUser)

        res.status(201).send("Cadastro realizado com sucesso")  
          
    }catch(error){
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Unexpected error")
        }
    }
    
})

//======================delete user==========================
/* app.delete("/users/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="u"){
            res.status(400)
            throw new Error('Invalid id! It must start with the letter "u"')
        }
       
        const [accountToDelete] = await db("users").where({id:idToDelete})

        if(!accountToDelete){
            res.status(404)
            throw new Error("id not found!")
        }else{
            await db("users").del().where({id:idToDelete})
            res.status(200).send("User deleted successfully")
        }

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Unexpected error")
        }
    }
    
}) */

//===================================================================================
//==========================ENDPOINTS OF PRODUCTS====================================

//==========Search product by name or all products================
app.get('/products',async(req:Request,res:Response)=>{
    try {
        const q = req.query.name as string
        const allProducts = await db("products").select("id","name","price","description","image_url AS imageUrl")
        
        if(allProducts.length<=0){
            throw new Error("No product found")
        }
        
        if(q){
            const result = await db("products")
            .select("id","name","price","description","image_url AS imageUrl")
            .where("name", "LIKE", `%${q}%` )
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
            res.send("Unexpected error")
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
                throw new Error("id must be a string!")
            }
            if(existingProduct){
                res.status(409)
                throw new Error("A product with this id already exists")
            }
        }else{
            res.status(400)
            throw new Error("id is required!")
        }
    
        if(name!==undefined){
            if(typeof(name)!=="string"){
                res.status(422)
                throw new Error("Name must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Name is required!")
        }
    
        if(price!==undefined){
            if(typeof(price)!=="number"){
                res.status(422)
                throw new Error("Price must be a number!")
            }
        }else{
            res.status(400)
            throw new Error("Price is required!")
        }
    
        if(description!==undefined){
            if(typeof(description)!=="string"){
                res.status(422)
                throw new Error("Description must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Description is required!")
        }
    
        if(imageUrl!==undefined){
            if(typeof(imageUrl)!=="string"){
                res.status(422)
                throw new Error("Image must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Image is required!")
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
            res.send("Unexpected error")
        }
    }
    
    
}) 

//======================delete product===========================
/* app.delete("/products/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="p" && idToDelete[1]!=="r" && idToDelete[2]!=="o" && idToDelete[3]!=="d"){
            res.status(400)
            throw new Error('Invalid id! Must start with "prod"')
        }
       
        const [accountToDelete] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${idToDelete}"
        `)

        if(!accountToDelete){
            res.status(404)
            throw new Error("id not found!")
        }

        await db.raw(`
            DELETE FROM products
            WHERE id = "${idToDelete}"
        `)

        res.status(200).send("Product deleted successfully")

    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Unexpected error")
        }
    }
    
})
 */
//======================Edit Product=======================
app.put("/products/:id",async(req:Request,res:Response)=>{
    try {
        const idToEdit = req.params.id

        if(idToEdit === ":id"){
            throw new Error("id is required")
        }

        const newId = req.body.id 
        const newName = req.body.name 
        const newPrice = req.body.price 
        const newDescription = req.body.description 
        const newImageUrl = req.body.imageUrl 

        //verificando newId
        if(newId!==undefined){
            if(typeof(newId)!=="string"){
                res.status(422)
                throw new Error("id must be a string")
            }
        }

        //verificando newName
        if(newName!==undefined){
            if(typeof(newName)!=="string"){
                res.status(422)
                throw new Error("Name must be a string!")
            }
        }

        //verificando newPrice
        if(newPrice!==undefined){
            if(typeof(newPrice)!=="number"){
                res.status(422)
                throw new Error("Price must be a number!")
            }if(newPrice<0){
                res.status(400)
                throw new Error("Price must be greater than 0!")
            }
        }
        
        //verificando newDescription
        if(newDescription!==undefined){
            if(typeof(newDescription)!=="string"){
                res.status(422)
                throw new Error("Description must be a string!")
            }
        }

        //verificando newImageUrl
        if(newImageUrl!==undefined){
            if(typeof(newImageUrl)!=="string"){
                res.status(422)
                throw new Error("Image must be a string!")
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
            res.status(400).send("Id not found!")
        }

        res.status(200).send("Produto atualizado com sucesso")    
    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.status(500).send("Unexpected error")
        }
    }
}) 

//===========================================================================
//==============================ENDPOINTS OF PURCHASES=======================

//========================Get Purchases=====================
/*  app.get('/purchases',async(req:Request,res:Response)=>{
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
            res.send("Unexpected error")
        }
    }
})  */

//========================Create Purchase=======================
app.post('/purchases',async(req:Request,res:Response)=>{
    try {
        const id = req.body.id 
        const buyer = req.body.buyer 
        const total_price = req.body.total_price 
        const products = req.body.products 
                
        const [existingPurchase] = await db("purchases").where({id:id})
        const [ existingUser ] = await db.raw(`
        SELECT * FROM users
        WHERE id = "${buyer}";
        `)

        if(!existingUser){
            res.status(422)
            throw new Error("Buyer not found")
        }

        if(id!==undefined){
            if(typeof(id)!=="string"){
                res.status(422)
                throw new Error("Id must be a string!")
            }
            if(existingPurchase){
                res.status(409)
                throw new Error("There is already a purchase with this id")
            }
        }else{
            res.status(400)
            throw new Error("id is required!")
        }
    
        if(buyer!==undefined){
            if(typeof(buyer)!=="string"){
                res.status(422)
                throw new Error("Buyer must be a string!")
            }
        }else{
            res.status(400)
            throw new Error("Buyer is required!")
        }
    
        if(total_price!==undefined){
            if(typeof(total_price)!=="number"){
                res.status(422)
                throw new Error("Price must be a number!")
            }
        }else{
            res.status(400)
            throw new Error("Price is required!")
        }

        if(products===undefined){
            res.status(400)
            throw new Error("Product is required!")
        }
        
        const newPurchase = {
            id:id,
            buyer:buyer,
            total_price:total_price,
            created_at:new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        
        await db("purchases").insert(newPurchase)

        for (let product  of products) {
            const newProduct = {
              product_id: product.id,
              purchase_id: id,
              quantity: product.quantity
            }
            await db("purchases_products").insert(newProduct)
        }

        res.status(201).send("Pedido realizado com sucesso")    
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        if(error instanceof Error){
            res.send(error.message)
        }else{
            res.send("Unexpected error")
        }
    }
    
})

//============================delete purchase===================
app.delete("/purchases/:id",async(req:Request,res:Response)=>{
    try {
        const idToDelete = req.params.id

        if(idToDelete && idToDelete[0]!=="p" && idToDelete[1]!=="u" && idToDelete[2]!=="r"){
            res.status(400)
            throw new Error('Invalid id! It must start with "pur"')
        }
       
        const [accountToDelete] = await db.raw(`
            SELECT * FROM purchases
            WHERE id = "${idToDelete}"
        `)

        if(!accountToDelete){
            res.status(404)
            throw new Error("id not found!")
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
            res.status(500).send("Unexpected error")
        }
    }
    
})

//=====================Get purchase by id=========================
app.get("/purchases/:id",async(req:Request,res:Response)=>{
    try {
        const idToSearch = req.params.id

        if(idToSearch === ":id"){
            res.status(400)
            throw new Error("id is required")
        }

        const [resultPurchase] = await db("purchases")
        .select(
            "purchases.id AS purchaseId",
            "purchases.buyer AS buyerId",
            "users.name AS buyerName",
            "users.email AS buyerEmail",
            "purchases.total_price AS totalPrice",
            "purchases.created_at AS createdAt"
        )
        .innerJoin("users", "purchases.buyer","=", "users.id")
        .where("purchases.id", "=", idToSearch)

         if(!resultPurchase){
            res.status(400)
            throw new Error('id not found!')
          } 
 
        const resultPurchaseProducts = await
        db("purchases_products")
        .select(
            "products.id",
            "products.name", 
            "products.price",
            "products.description", 
            "products.image_url AS imageUrl",
            "purchases_products.quantity")
        .innerJoin("products","purchases_products.product_id","products.id")
        .where("purchases_products.purchase_id", "=", idToSearch)

            const result = {
                ...resultPurchase,
                products: resultPurchaseProducts
              } 
              res.status(200).json(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }
  
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unexpected error")
        }
    }
})