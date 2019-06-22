const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
const validateOrders = require('../models/orderModel');
//const Orders = require('../src/order');
//const carID = require('../src/cars');


router.get('/', (req, res) => {
    if(Orders) return res.status(200).json({status:res.statusCode,data:Orders})
   
    })   

router.post("/", (req, res) => {  
    const { error } = validateOrders(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }else{
        const order = {
            id: Orders.length + 1,
            car_id: carID[1].id,
            created_on: Date(),           
            status: req.body.status,           
            amount: req.body.amount,           
            price_offered: req.body.price_offered,
          };
          Orders.push(order);        
          res.status(201).json({
              status:res.statusCode,
              data:order,
              message:'order uploaded!'
          })
    }
    
  });


  router.get('/:id', (req, res) => {    
    const order = Orders.find(c => c.id === parseInt(req.params.id));
    if(order) { 
        return res.status(200).json({status:res.statusCode,data:order});  
}else{
    return res.status(404).json({status:res.statusCode,
        error:'car with the given ID not found'})
};

})



  router.patch('/:id', (req,res) => {
   
    const order = Orders.find(c => c.id === parseInt(req.params.id));
    if(!order){
        res.status(404).json({status:res.statusCode,
            error:'order with the given ID not found'});
        return;
    }    
   const {error} = validateOrders(req.body)
    if(error ) return  res.status(400).send(error.details[0].message);

   order.status = req.body.status;  
   order.amount = req.body.amount; 
   res.json({
       status:res.statusCode,
       data: order,
       message: 'order updated!'
   });
})




module.exports = router;