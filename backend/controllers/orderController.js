
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

import Stripe from 'stripe';


//global variable 
const currency = 'inr'
const deliveryCharge = 10




// go to placeorder file
//cod
const placeOrder = async (req, res) => {
  try {
    // userid will come from middleware
    const { userId, items, amount, address } = req.body;

      if (!address ||!amount || !items || items.length === 0) {
      return res.status(400).json({
          success: false,
          message: "Invalid order data"
       });
    }

     for (const item of items) {
      const product = await productModel.findById(item._id);
      if (!product) {
          return res.status(404).json({
              success: false,
              message: `Product not found: ${item._id}`
          });
      }
    }



    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    
    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, { cartData: {} }) // after placing order cart should be empty

    res.json({ success: true, message: "Order Placed" });

  } 
  catch (error) {
    console.log(error);
    res.json({ 
      success: false, 
      message: error.message ,
    });
  }
}


//stripe
const placeOrderStripe = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
      const {origin} = req.headers; // give the url from where you place order


      const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod: "Stripe",
        payment: false,
        date: Date.now(),
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      // Stripe Gateway Initialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

      // items from input
      const line_items = items.map((item)=>({
        price_data :{
          currency : currency,
          product_data : {
            name:item.name
          },
          unit_amount:item.price * 100
        },
        quantity : item.quantity
      }))

      line_items.push({
        price_data :{
          currency : currency,
          product_data : {
            name:'Delivery Charges'
          },
          unit_amount:deliveryCharge * 100
        },
        quantity : 1
      })

      const session = await stripeInstance.checkout.sessions.create({
        
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId:newOrder._id.toString(),  
                userId
            }
      })

      res.json({success:true , session_url:session.url});

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
};

//Stripe Weebhooks to verify Payments Action
const stripeWebHooks = async (req, res) => {

    //Stripe getway intialize
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

    const sig = req.headers["stripe-signature"]

    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`)
    }

    //Handel the event
    switch (event.type) {
        case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const {orderId, userId } = session.data[0].metadata

            //Mark payment as Paid
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            
            //Clear User cart
            await userModel.findByIdAndUpdate(userId, {cartData: {}})

               break;
        }
     

             case "payment_intent.payment_failed":{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            //getting session Metadata
            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId
            })

            const { orderId, userId } = session.data[0].metadata
            await orderModel.findByIdAndDelete(orderId);
              break;
        }
      

        case "checkout.session.expired": {
          const session = event.data.object;
        
          try {
            const { orderId } = session.data[0].metadata;
        
            const deleted = await orderModel.findByIdAndDelete(orderId);
            if (deleted) {
              console.log("🗑️ Abandoned checkout session — Order deleted:", orderId);
            } else {
              console.warn("⚠️ No order found for expired session:", orderId);
            }
          } catch (err) {
            console.error("❌ Error deleting expired order:", err.message);
          }
        
          break;
        }


        default:
            console.error(`Unhandled event type ${event.type}`)
        break;
    }
    res.json({received: true})
}
      




//razorpay
const placeOrderRazorpay = async (req, res) => {

};

//admin panel - order
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({})
    res.json({success:true,orders})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};


//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body

    const orders = await orderModel.find({ userId }) // finding order by userId
    res.json({ success: true, orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const{orderId , status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status Updated"})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
};

export {
  stripeWebHooks,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};