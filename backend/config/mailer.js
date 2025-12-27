import nodemailer from "nodemailer";

export const sendAlert = async(to,product)=>{
 const transporter = nodemailer.createTransport({
   service:"gmail",
   auth:{user:process.env.EMAIL_USER, pass:process.env.EMAIL_PASS}
 });

 await transporter.sendMail({
   from:"StockSense Alert",
   to,
   subject:`Low Stock Alert: ${product.name}`,
   text:`${product.name} stock is low.\nCurrent Qty: ${product.quantity}\nReorder Level: ${product.reorderLevel}`
 });
}
