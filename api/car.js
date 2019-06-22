const express = require("express");
const app = express();
const url = "mongodb://127.0.0.1:27017/automart";
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
const Cars = require('../models/carModel');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//const ownerId = require('../routes/userRoute/user._id')Assigned cloud name: dsbiercgr

 
router.get('/cars', (req, res) => {
    Cars.find()
    .exec()
    .then(car => {
        res.status(200).json({
            status:res.statusCode,
            data:car})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


router.get("/cars/:id", (req, res) => {
    const id = req.params.id;
    Cars.findById(id)
      .exec()
      .then(car => {
        if (car) {
          res.status(200).json({
              status:res.statusCode,
              data:car});
        } else {
          res.status(404).json({
            status:res.statusCode,
            message: "Car with the given ID not found"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

router.post('/cars', (req, res) => {   

      const car = new Cars({
      _id: new mongoose.Types.ObjectId(),
      created_on: Date(),    
     manufacturer : req.body.manufacturer,  
     status: req.body.status,
     state: req.body.state,
     price: req.body.price,
     year: req.body.year,
     transmission: req.body.transmission,
     registered: req.body.registered,
     license: req.body.license,
     description: req.body.description,
     model: req.body.model,        
     image_url: req.body.xxx 
    })
    car.save()
    .then(car => {
        res.status(201).json({
            status:res.statusCode,
            data:car,
            message:'car uploaded!'
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
    
  });
 

  router.patch("/cars/:id", (req, res) => {
    const id = req.params.id;
    Cars.updateOne(
      { _id: id },
      {
        $set: {           
          status: req.body.status,  
          price : req.body.price                 
          
        }
      }
    )
      .exec()
      .then(car => {
        res.status(200).json(car);
      })
      .catch(err => {
        res.status(500).json({
          message: "Car with the given id does not exist"
        });
      });
  });

router.delete("/cars/:id", (req, res) => {
    const id = req.params.id;
    Cars.deleteOne({
      _id: id
    })
      .exec()
      .then(car => {
        res.status(200).json(car);
      })
      .catch(err => {
        res.status(404).json({
            status:res.statusCode,
            message:'car with the given ID not found',
            error:err
        });
      });
  });




module.exports = router;



/*router.get('/', (req, res) => {
if(Cars) return res.status(200).json({status:res.statusCode,data:Cars})
//res.json(req.params);
//let kas = req.query
//res.json(Cars);
})*/

/*router.delete('/:id', (req, res) => {
    const car = Cars.find(c => c.id === parseInt(req.params.id));
    if(!car) return res.status(404).json({status:res.statusCode,
        error:'car with the given ID not found'});

    //delete
    const index = Cars.indexOf(car);
    Cars.splice(index, 1)
    // send 
    res.send(car)

})*/

 /*router.patch('/:id', (req,res) => {   
    const car = Cars.find(c => c.id === parseInt(req.params.id));
    if(!car){
        res.status(404).json({status:res.statusCode,
            error:'car with the given ID not found'});
        return;
    }    
   const {error} = validateCars(req.body)
    if(error ) return  res.status(400).send(error.details[0].message);  
   car.status = req.body.status;  
   car.price = req.body.price; 
   res.status(200).json({
       status:res.statusCode,
       data: car,
       message: "user updated!"
   });
})*/


/*router.post("/", (req, res) => {  
    const { error } = validateCars(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }else{
        const car = {
            id: Cars.length + 1,
            owner: userID[1].id,
            created_on: Date(),
            state: req.body.state,
            status: req.body.status,           
            price: req.body.price,
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            body_type: req.body.body_type,
          };
          Cars.push(car);
          //res.send(user);
          res.status(201).json({
              status:res.statusCode,
              data:car,
              message:'car uploaded!'
          })
    }
    
  });*/

  /*router.get('/:id', (req, res) => {    
    const car = Cars.find(c => c.id === parseInt(req.params.id));
    if(car) { 
        return res.status(200).json({status:res.statusCode,data:car});  
}else{
    return res.status(404).json({status:res.statusCode,
        error:'car with the given ID not found'})
};

})*/