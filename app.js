const express = require("express");                                         //importing varios Node JS libraries
const path = require("path");
// const fs = require("fs");
const app = express();
const bodyparcer = require("body-parser");
const port = 80;
const mongoose = require('mongoose');


mongoose.set('strictQuery', true);                                          //to avoid error
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Project');              //i made a Directory named 'Project' in my System
}

const entrySchema = new mongoose.Schema({                                   //designing mongoose schema
    fullname: String,
    username: String,
    email: String,
    phonenum: String,
    pass: String,
    cpass: String,
    //gender: RadioNodeList,
  });


const entry = mongoose.model('entry', entrySchema);                         //Creating mongoose model



// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//making post request for sumbitting  registration form
app.post('/contact', (req,res)=>{                                                     //POST req hamesha urlencoded() vale function ke baad lagegi
    var raees= new entry(req.body);
    raees.save().then(()=>{
        res.status(200).send("The Data has been sent to Database")
    }).catch(()=>{
        res.status(400).send("Sorry! Data wasn't send to Databse. Try again later")
    });
})

//Deletion Request
const dbConnect = require('mongodb');
function del() {
    app.delete("./:id", async (req,res) => {
        console.log(req.params.id)
        const data = await dbConnect();
        const result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
        res.send(result);
    })

}

//ENDPOINTS
app.get('/', (req, res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    res.status(200).render('register.pug');
})

//SERVER LISTENING
app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
  })
