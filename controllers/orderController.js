import { response } from "express";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



// cash on delivery function

const placeOrder = async (req, res) =>{
try {
    const {userId,items,amount,address}=req.body;

    const orderData ={
        userId,
        items,
        amount,
        address,
        paymentMethod:"COD",
        payment:false,
        date: Date.now()
    }

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Order placed successfully"})

} catch (error) {

    console.log(error);
    res.json({success:false,message:error.message})
    
    
}

}

// all order for admin panel

const allOrders = async (req, res) =>{
try {
    const orders = await orderModel.find({})
    res.json({success:true,message:"All orders",orders})
} catch (error) {
    console.log(error);
    res.json({success:false,message:error.message})
    
}

}

// user order data for frontend

const userOrders = async (req, res) =>{
    try {
        const {userId}= req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
        
    }

}

// update order for admin panel

const updateStatus = async (req, res) =>{
    try {
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:"Order status updated successfully"})


    } catch (error) {
      console.log(error);
        res.json({success:false,message:error.message})
          
    }

}

export { placeOrder, allOrders, userOrders, updateStatus };

