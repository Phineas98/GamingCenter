const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gaming', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true
}).then(() => {
  console.log("connection successful");
}).catch((e) =>{
  console.log("No connection")
})


