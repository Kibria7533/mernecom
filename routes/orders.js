const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Order } = require("../model/Orders");
const { userAuth, checkRole } = require("../utils/Auth");
const User = require("../model/User");
router.post('/ordersave', userAuth,
    checkRole(["user", "admin"]), async (req, res) => {
        const order = await new Order({
            userid: req.user.user_id,
            orderid:req.body.paymentid,
            paymentid: req.body.paymentid,
            products: req.body.products,
            address: req.body.address,
            total: req.body.total,
            orderstatus: "1",
            paymentmethod: "paypal",
            dateofpurcashe:Date.now()

        })

        order.save().then(respo => {
            User.findOneAndUpdate(
                { _id: req.user.user_id },
                {  $set: { cart: [] } },
                { new: true },
                (err, user) => {
                    if (err) return res.json({ success: false, err });
                })
            res.send(respo)

        }).catch(err => {
            console.log('errror', err)
            res.send(err)
        })


    })
    router.get('/getuserorder',userAuth,
    checkRole(["user", "admin"]),async(req,res)=>{
        const order=await Order.find({userid:req.user.user_id}).then(data=>{
            res.send(data);
        }).catch(err=>{
            res.send(err)
        })
    })
    router.get('/getsingleorder',async(req,res)=>{
        console.log(req.query.orderid)
        const data=await Order.find({orderid:req.query.orderid}).then(item=>{
            res.send(item)
        }).catch(err=>{
            res.send(err)
        })

    })
module.exports = router;