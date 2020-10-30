const express = require('express');
const router = express.Router();

const multer = require('multer');

const SSLCommerz = require('sslcommerz-nodejs');
 
let settings = {
    isSandboxMode: true, //false if live version
    store_id: "mad5f9be0626f489",
    store_passwd: "mad5f9be0626f489@ssl"
}
 
let sslcommerz = new SSLCommerz(settings);


router.post('/ordersave',(req,res)=>{
console.log('working')
    let post_body = {};
post_body['total_amount'] = 10000;
post_body['currency'] = "BDT";
post_body['tran_id'] = "12345";
post_body['success_url'] = "https://mernecomkb.herokuapp.com/customerorderlist";
post_body['fail_url'] = "https://mernecomkb.herokuapp.com/customerorderlist";
post_body['cancel_url'] = "https://mernecomkb.herokuapp.com/customerorderlist";
post_body['emi_option'] = 0;
post_body['cus_name'] = "test";
post_body['cus_email'] = "test@test.com";
post_body['cus_phone'] = "01700000000";
post_body['cus_add1'] = "customer address";
post_body['cus_city'] = "Dhaka";
post_body['cus_country'] = "Bangladesh";
post_body['shipping_method'] = "NO";
post_body['multi_card_name'] = ""
post_body['num_of_item'] = 1;
post_body['product_name'] = "Test";
post_body['product_category'] = "Test Category";
post_body['product_profile'] = "general";
sslcommerz.init_transaction(post_body).then(response => {
    console.log(response);
    res.send(response)
}).catch(error => {
    console.log(error);
})

})
module.exports = router;