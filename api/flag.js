const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoose = require("mongoose");
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
const Flag = require('../models/flagModel');




router.get('/flags', (req, res) => {   
    Flag.find()
    .exec()
    .then(flag => {
        res.status(200).json({
            status:res.statusCode,
            data:flag})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

    

router.post("/flags", (req, res) => {     
        const flag = new Flag({
            _id: new mongoose.Types.ObjectId(),
            //owner: userID[1].id,
            created_on: Date(), 
            name:req.body.name,
            email:req.body.email,                 
            reason: req.body.reason,           
            description: req.body.description         
            
          });
          flag.save()
          .then(flag => {
              res.status(201).json({
                  status:res.statusCode,
                  data:flag,
                  message:'flag posted!'
              });
            })
            .catch(err => {
              res.status(500).json({
                error: err
              });
            });         
        
        }) 

module.exports = router;