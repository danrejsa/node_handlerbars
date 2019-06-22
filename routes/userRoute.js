const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//const errors = require('express-validator-errors');
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/automart";
//const url ="mongodb+srv://danrejsa:" + process.env.MONGO_ATLAS_PW +"@danrej-ann6l.mongodb.net/test?retryWrites=true&w=majority" ;
const User = require('../models/userLogin');
app.use("/cssFiles", express.static(__dirname + "/assets"));
app.use("/scriptFiles", express.static(__dirname + "/assets"));
const cloudinary = require('cloudinary').v2;
const router = express.Router();
const session  = require('express-session');
const MongoStore = require('connect-mongo')(session);
const Car = require('../models/carModel');
const Flag = require('../models/flagModel');
const Order = require('../models/orderModel');
var middleware = require("../middleware");
var multer  =   require('multer');


router.get("/dashboard", middleware.isLoggedIn ,(req, res, next) => {
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



router.get('/post', middleware.isLoggedIn ,(req, res) => {
  res.render('post')
})  

router.get("/login", (req, res, next) => {
  res.render('login')
});
router.get("/register", (req, res, next) => {
  res.render('register')
});
router.get('/report', middleware.isLoggedIn, (req,res) => {
  res.render('report')
})

router.get("/detail/:id",   (req, res) => {
  const id = req.params.id;
  Car.findById(id)
    .exec()
    .then(car => {
      if (car) {
        res.status(200).render('/auth/detail',{data:car})
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
 

router.get("/logout", (req, res) => { 
  req.logout();    
  req.session.auth = null;
  res.clearCookie('auth');
  req.session.destroy()
//req.flash(`success_msg`, `Successfully logged out`);
 res.redirect('/auth/login');
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username ,(err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {
          message:'Unknown User'
        })
      }
      User.comparePassword(password, user.password, (err,isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        }else{
          return done(null, false, {message:'Invalid password'})
        }
      })
    })
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  })
}) 


router.post('/login', 
passport.authenticate(`local`, {
  failureRedirect: `/login`,
  failureFlash: true,
  successRedirect: `/auth/dashboard`,
 // successFlash: `You are now logged in!`
 //successFlash: true
}),
(req, res) => {    
res.redirect('/auth/dashboard')

})




 

 
// Register a User



router.post('/register', (req,res) => {
  const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './Users');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  
  const upload = multer({ storage}).single('userImage');
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
          { public_id: `Users/${uniqueFilename}`, tags: `User` },          
         (err, image) => {
            if (err) return res.send(err)
            console.log('file uploaded to Cloudinary')         
            console.log(image.secure_url);

           const xxx = image.secure_url;  
           const firstName = req.body.firstName;
           const lastName = req.body.lastName;
           const address = req.body.address;
           const username = req.body.username;
           const email = req.body.email;
           const phone = req.body.phone;
           const password = req.body.password;
           const password2 = req.body.password2;
           const userImage = req.body.userImage;
           console.log(username)
           req.checkBody('firstName','firstname is required').notEmpty();
           req.checkBody('lastName','lastname is required').notEmpty();
           req.checkBody('address','address is required').notEmpty();
           req.checkBody('username','username is required').notEmpty();
           req.checkBody('email','email is not valid').isEmail();
           req.checkBody('phone','phone is not valid').notEmpty();
           req.checkBody('password','password is required').notEmpty();
           req.checkBody('password2','Passwords do not match').equals(req.body.password);
    const error = req.validationErrors(); 
    if(error){
        res.render('/auth/register', {
            error:error
        })
    }else{     
      const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: firstName,          
        lastName: lastName,
        address:address,
        username:username,
        email: email,
        phone:phone,
        password:password,          
        image_url: xxx        
      });
      User.createUser(newUser, (err, user) => {
          if(err) throw err;
          console.log(user)
          mongoose.connect(
              url,
              {
                useNewUrlParser: true
              },
              (err, db) => {
                db.collection("users").insertOne(newUser, (err, res) => {
                  console.log("User inserted to db");
                  db.close();
                });
              }
            );
      });
      req.flash('success_msg', 'You are successfully registered ' +   req.body.username+ '. You can now login ' )
      res.redirect('/auth/login')
    }
  })

})

})



// Report a Car

router.post('/report',   (req, res) => {
  const reporter = req.body.reporter;
  const email = req.body.reportEmail;
  const reason = req.body.reportReason;
  const description = req.body.reportFlag;
  const transactionId = req.body.transactionId
  //console.log(reporter)
  const error = req.validationErrors(); 
    if(error){
        res.render('/auth/report', {
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
        res.redirect('/auth/report')
    }
})



//post a car
//const multer  =   require('multer');


router.post('/post', (req,res) => {
  const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });

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
        res.render('/auth/post', {
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
                  res.redirect('/auth/post')     
                }
          })
        
     })
    
})

 
//Buy a Car 

router.post('/dashboard', (req, res) => {
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
        res.render('/auth/dashboard', {
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
        res.redirect('/auth/dashboard')
    }
})


module.exports = router;









