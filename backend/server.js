import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
import { stripeWebHooks } from './controllers/orderController.js'

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173" , "https://researchpaper-8qjc.vercel.app"];

app.post("/stripe", express.raw({ type: "application/json" }), stripeWebHooks);

// middlewares
app.use(express.json());
app.use(cors())

//Routes
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
  res.send('API working')
})

app.listen(port , ()=>console.log('Server started on PORT : ' + port))