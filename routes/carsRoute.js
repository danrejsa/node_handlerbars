const express = require("express");
const app = express();
const url = "mongodb://127.0.0.1:27017/automart";
//const url = "mongodb+srv://danrejsa:" + process.env.MONGO_ATLAS_PW +"@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority"
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
const Car = require('../models/carModel');
const Flag = require('../models/flagModel');
const Order = require('../models/orderModel');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
app.use(cookieParser()); 
app.use("/cssFiles", express.static(__dirname + "/assets"));
app.use("/scriptFiles", express.static(__dirname + "/assets"));



router.get("/", (req, res, next) => {
  let arr = [];
  mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
    let data = db.collection("cars").find();
    data.forEach(
      (result, err) => {
        arr.push(result);
      },
      () => {
        db.close();
        res.render("", { items: arr });
      }
    );
  });
});

/*router.get("/dashboard", isLoggedIn, (req, res, next) => {
  let arr = [];
  mongoose.connect(url, { useNewUrlParser: true }, (err, db) => {
    let data = db.collection("cars").find();
    data.forEach(
      (result, err) => {
        arr.push(result);
      },
      () => {
        db.close();
        res.render("dashboard", { items: arr });
      }
    );
  
  });
});

car details
router.get("/detail/:id", isLoggedIn ,(req, res) => {
  const id = req.params.id;
  Car.findById(id)
    .exec()
    .then(car => {
      if (car) {
        res.status(200).render('detail',{data:car})
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
});*/

//const MongoStore = require('connect-mongo')(session);

/*app.use(session({
  secret: 'secret',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: new MongoStore({
      url: 'mongodb://localhost/automart',
      touchAfter: 24 * 3600 // time period in seconds
  })
}));*/



//view car detail

/*router.delete("/:id", (req, res) => {
  gfs.remove({ _id: req.params.id, root: "uploads" }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
    res.redirect("/");
  });
});*/


router.get("/about", (req, res, next) => {
  res.render('about')
});
router.get("/contact", (req, res, next) => {
  res.render('contact')
});

/*router.get("/dashboard",isLoggedIn, (req, res, next) => {
  res.render('dashboard')
});
router.get("/post",isLoggedIn, (req, res, next) => {
  res.render('post')
});
router.get("/detail",isLoggedIn, (req, res, next) => {
  res.render('detail')
});
router.get("/report",isLoggedIn, (req, res, next) => {
  res.render('report')
});*/



// Report a Car
/*router.post('/report', isLoggedIn, (req, res) => {
  const reporter = req.body.reporter;
  const email = req.body.reportEmail;
  const reason = req.body.reportReason;
  const description = req.body.reportFlag;
  const transactionId = req.body.transactionId
  console.log(reporter)
  const error = req.validationErrors(); 
    if(error){
        res.render('report', {
            error:error
        })
    }else{     
        const flag = new Flag({
        _id: new mongoose.Types.ObjectId(),
         created_on: Date(),
         reporter:reporter,   
        email : email, 
        Car_Id:transactionId,
        reason : reason, 
        description : description       
        });       
            mongoose.connect(
                url,
                {
                  useNewUrlParser: true
                },
                (err, db) => {
                  db.collection("flags").insertOne(flag, (err, res) => {
                    console.log("report inserted to db");
                    db.close();
                  });
                }
              );
        
        req.flash('success_msg', 'Report submitted successfully!' )
        res.redirect('report')
    }
})*/





//post a car
/*const multer  =   require('multer');
const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});*/

/*router.post('/post', isLoggedIn, (req,res) => {
  const upload = multer({ storage}).single('image');
    upload(req,res, (err)  => {
        if(err) {
            return res.end("Error uploading file.");
        }        
        cloudinary.config({ 
          cloud_name: 'danrejsa', 
          api_key: '838429296415295', 
          api_secret: 'WUUp71HOsCIKizakCrGvDtAfbRk' 
        });
        const path = req.file.path;
        const uniqueFilename = new Date().toISOString();
        cloudinary.uploader.upload(
        path,
          { public_id: `car/${uniqueFilename}`, tags: `car` }, // directory and tags are optional
        function (err, image) {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')         
            console.log(image.secure_url)
           const xxx = image.secure_url;        
   
    const manufacturer = req.body.manufacturer;    
    const customerId= req.body.customerId;  
    const status= req.body.status;
    const state= req.body.state;
    const price= req.body.price;
    const year= req.body.year;
    const transmission= req.body.transmission;
    const registered= req.body.registered;
    const license= req.body.license;
    const description= req.body.description;
    const model= req.body.model; 

    const error = req.validationErrors(); 
    if(error){
        res.render('post', {
            error:error
        })
    }else{     
        const car = new Car({
     _id: new mongoose.Types.ObjectId(),
     created_on: Date(),    
     manufacturer : manufacturer,  
     customerId : customerId,  
     status: status,
     state: state,
     price: price,
     year: year,
     transmission: transmission,
     registered: registered,
     license: license,
     description: description,
     model: model,        
     image_url: xxx 
         
        });          
                mongoose.connect(
                    url,
                    {
                      useNewUrlParser: true
                    },
                    (err, db) => {
                      db.collection("cars").insertOne(car, (err, res) => {
                        console.log("car inserted to db");
                        db.close();
                      });
                    }
                  );
                
                  req.flash('success_msg', 'Car uploaded successfully!' )
                  res.redirect('post')     
                }
          })
        
     })
    
})*/

           


  
//Buy a Car 

/*router.post('/dashboard', isLoggedIn, (req, res) => {
  const fullNames = req.body.fullNames;
  const customerId = req.body.customerId;
  const address = req.body.address;
  const phone = req.body.phone;
  const transactionId = req.body.transactionId;
  //const gender = req.body.gender;
  const idCard = req.body.idCard;
  const idNumber = req.body.idNumber                             
  console.log(phone)
  const error = req.validationErrors(); 
    if(error){
        res.render('dashboard', {
            error:error
        })
    }else{     
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        created_on: Date(),    
        fullNames : fullNames,  
        customerId : customerId,  
        address: address,
        phone: phone,
        transactionId: transactionId,
        //gender: gender,
        idCard: idCard,
        idNumber : idNumber                          
           });          
            mongoose.connect(
                url,
                {
                  useNewUrlParser: true
                },
                (err, db) => {
                  db.collection("orders").insertOne(order, (err, res) => {
                    console.log("order inserted to db");
                    db.close();
                  });
                }
              );
        
        req.flash('success_msg', 'Order received successfully!' )
        res.redirect('dashboard')
    }
})*/

/*router.post('/order', (req,res) => {
  const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './idCards');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });  
                    const upload = multer({ storage}).single('idCard');
                      upload(req,res, (err)  => {
                          if(err) {
                              return res.end("Error uploading file.");
                          }        
                          cloudinary.config({ 
                            cloud_name: 'danrejsa', 
                            api_key: '838429296415295', 
                            api_secret: 'WUUp71HOsCIKizakCrGvDtAfbRk' 
                          });
                  
                          const path = req.file.path;
                          const uniqueFilename = new Date().toISOString();                
                  
                          cloudinary.uploader.upload(
                          path,
                            { public_id: `idCard/${uniqueFilename}`, tags: `idCard` }, // directory and tags are optional
                          function (err, image) {
                              if (err) return res.send(err)
                              console.log('file uploaded to Cloudinary')         
                              console.log(image.secure_url)
                             const xxx = image.secure_url;        
                     
                             const fullNames = req.body.fullNames;
                             const customerId = req.body.customerId;
                             const address = req.body.address;
                             const phone = req.body.phone;
                             const transactionId = req.body.transactionId;
                             const gender = req.body.gender;
                             //const idCard = req.body.idCard;
                             const idNumber = req.body.idNumber                             
                             console.log(gender)

                      const error = req.validationErrors(); 
                      if(error){
                          res.render('dashboard', {
                              error:error
                          })
                      }else{     
                      const order = new Order({
                       _id: new mongoose.Types.ObjectId(),
                       created_on: Date(),    
                       fullNames : fullNames,  
                       customerId : customerId,  
                       address: address,
                       phone: phone,
                       transactionId: transactionId,
                       gender: gender,
                       idCard: idCard;
                       idNumber : idNumber                          
                          });          
                                  mongoose.connect(
                                      url,
                                      {
                                        useNewUrlParser: true
                                      },
                                      (err, db) => {
                                        db.collection("orders").insertOne(order, (err, res) => {
                                          console.log("order inserted to db");
                                          db.close();
                                        });
                                      }
                                    );
                                  
                                    req.flash('success_msg', 'Order received successfully!' )
                                    res.redirect('dashboard')     
                                    }
                                    })
                          
                                    })
                      
                                    })*/
                  
                             

module.exports = router;






