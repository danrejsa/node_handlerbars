const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: false }));
const Users = require('../models/userLogin');
const cookieParser = require("cookie-parser");
app.use(cookieParser());


router.get('/users', (req, res) => {
    Users.find()
    .exec()
    .then(user => {
        res.status(200).json({
            status:res.statusCode,
            data:user})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


router.get("/users/:id", (req, res) => {
    const id = req.params.id;
    Users.findById(id)
      .exec()
      .then(user => {
        if (user) {
          res.status(200).json({
              status:res.statusCode,
              data:user});
        } else {
          res.status(404).json({
            status:res.statusCode,
            message: "User with the given ID not found"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });

  module.exports = router;