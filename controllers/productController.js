import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

//function to add products
const addProduct = async (req,res)=>{
   try {

        const {name, description,price,category,subCategory,sizes,bestseller} = req.body

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 &&  req.files.image2[0]
        const image3 =req.files.image3 &&  req.files.image3[0]
        const image4 =req.files.image4 &&  req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrls = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )


       const productData = {
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:bestseller==="true" ? true : false,
        sizes: JSON.parse(sizes),
        image : imageUrls,
        date: Date.now()
       }
       console.log(productData)

       const product =new productModel(productData);
       await product.save()


        res.json({success:true ,message:"product has been added"})

   } catch (error) {
    console.log(error)
      res.json({success:false ,message:error.message})

   } 
}

//function to list products
const listProduct = async (req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true,products})

        
    } catch (error) {
         console.log(error)
      res.json({success:false ,message:error.message})

    }
}

//function to remove products
const removeProduct = async (req,res)=>{
    const {id} = req.params
    try {
        await productModel.findByIdAndDelete(id)
        res.json({success:true,message:"product has been removed"})

    } catch (error) {
         console.log(error)
      res.json({success:false ,message:error.message})
    }
}

//function to single products
const singleProduct = async (req,res)=>{
try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:true,product})
} catch (error) {
    console.log(error)
      res.json({success:false ,message:error.message})
}

    
}

// update product
const updateProduct = async (req,res)=>{
    try {
        const {id} = req.params
        const {name, description,price,category,subCategory,sizes,bestseller} = req.body

        const image1 =req.files?.image1 && req.files.image1[0]
        const image2 =req.files?.image2 &&  req.files.image2[0]
        const image3 =req.files?.image3 &&  req.files.image3[0]
        const image4 =req.files?.image4 &&  req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imageUrls = []
        if(images.length > 0){
            imageUrls = await Promise.all(
                images.map(async (item) => {
                    let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                    return result.secure_url
                })
            )
        }

        const updates = {
            ...(name && {name}),
            ...(description && {description}),
            ...(category && {category}),
            ...(price && {price: Number(price)}),
            ...(subCategory && {subCategory}),
            ...(bestseller !== undefined && {bestseller: bestseller==="true"}),
            ...(sizes && {sizes: JSON.parse(sizes)}),
            ...(imageUrls.length > 0 && {image: imageUrls})
        }

        const product = await productModel.findByIdAndUpdate(id, updates, {new: true})
        res.json({success:true, message:"product has been updated", product})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export{listProduct,addProduct,removeProduct,singleProduct,updateProduct}