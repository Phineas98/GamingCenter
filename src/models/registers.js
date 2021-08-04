const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const registerSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  gender:{
    type:String,
    required:true
  },
  email: {
   type:String,
   required:true,
   unique:true
  },
  password: {
    type:String,
    required:true
  },
  confirmpassword: {
    type:String,
    required:true
  }
});

registerSchema.pre("save", async function(next) {

  if(this.isModified("password")){
    // console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);

    this.confirmpassword = undefined;
  }

  next();
})

// now we create a collections 

const Register = new mongoose.model("userData", registerSchema);

module.exports = Register;