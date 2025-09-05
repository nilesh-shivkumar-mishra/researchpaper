import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'
import main from '../config/gemini.js'
// add product
const addProduct = async(req,res)=>{
   try {

    const {name,description,price,category,sizes,bestseller,article}= req.body 

    const image1 = req.files.image1 && req.files.image1[0] 
    const image2 = req.files.image2 && req.files.image2[0] 
    const image3 = req.files.image3 && req.files.image3[0] 
    const image4 = req.files.image4 && req.files.image4[0] 

    // console.log(name,description,price,category,sizes,bestseller,article)
    // console.log(image1 , image2 , image3 , image4)

    // it filter remove the undefined images (which is not upload)
    const images=[image1,image2,image3,image4].filter((item)=> item !== undefined)
    // console.log (images)

    // converting images in urlform
    let imagesUrl = await Promise.all(
        images.map(async(item)=>{
            let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
            return result.secure_url
        })
    )  
    // console.log(imagesUrl);

    // storing in to form of product model
    const productData = {
        name,
        description,
        category,
        price : Number(price),
        bestseller: bestseller === "true" ? true : false,
        sizes: JSON.parse(sizes), // request.body se aayaga who string mai rahaga usha array mai convert kar raha hai
        image:imagesUrl, 
        date:Date.now(),
        article
    }
    //  console.log(productData);

     const product= new productModel(productData);
     await product.save()
    res.json({success:true,message:"Product added"})

   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }
}

//list product
const listProducts = async(req,res)=>{
  try {
    const products = await productModel.find({});
    res.json({success:true,products})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//removing product
const removeProduct = async(req,res)=>{
  try {
    
      await productModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"Product Removed"})

  } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//single product
const singleProduct = async(req,res)=>{
   try {
    
     const{productId} = req.body
     const product = await productModel.findById(productId)
     res.json({success:true,product})

   } catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
   }
}

const generateContent = async (req, res)=>{
try {
const { prompt } = req.body;
const content = await main(prompt + "Generate a blog content for this topic in simple text format");
res.json({success: true, content});
} catch (error) {
res.json({success: false, message: error.message});
}
}

export {listProducts , addProduct , removeProduct , singleProduct , generateContent}