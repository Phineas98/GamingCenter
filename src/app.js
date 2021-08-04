const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bodyparser = require("body-parser");
const bcrypt = require("bcryptjs");

require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const { RSA_NO_PADDING } = require("constants");

const port = process.env.PORT || 80;

const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partials_path = path.join(__dirname, "../templates/partials")

app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res)=> {
  res.render("login")
});

app.get("/register", (req, res)=> {
  res.render("register");
});

app.post("/register", async(req, res)=>{
  try {
    
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if(password === cpassword){

      const registerEmployee = new Register({
        name: req.body.name,
        gender: req.body.gender,
        email: req.body.email,
        password: password,
        confirmpassword: req.body.confirmpassword
      })
        
     const registered = await registerEmployee.save();
     res.status(200).render("home");

    }else{
      res.send("password not matching")
    }
   
  } catch (error) {
      res.status(400).send(error)
  }
})
// create a new user in our database 


app.get("/about", (req, res)=> {
  res.render("about");
});

app.get("/login", (req, res)=> {
  res.render("login");
});

// to read the data 
app.post("/login", async(req, res) =>{
  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});
    const isMatch = bcrypt.compare(password, useremail.password)

    if(isMatch){
      res.status(201).render("index");
    }else{
      res.send("invalid Login Details");
    }
    
  } catch (error) {
    res.status(400).send("invalid Login Details ")
  }
})


app.get("/About us", (req, res)=> {
  res.render("About us");
});


// const bcrypt = require("bcryptjs");

// const securePassword = async (password)=>{
//   const passwordHash = await bcrypt.hash(password, 10);
//   console.log(passwordHash);
// }
// securePassword("Sharma123@");





app.listen(port, ()=>{
  console.log(`server is running at port no ${port}`)
});