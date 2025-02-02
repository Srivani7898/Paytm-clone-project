const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const PayModel = require('./models/Payment')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/wallet");

// login data
app.post("/login", (req, res) => {
    const {email, password} = req.body;
    PayModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No such Record Exist!")
        }
    })
})


// register data
app.post('/register', (req, res) => {
    PayModel.create(req.body)
    .then(wallet => res.json(wallet))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running")
})