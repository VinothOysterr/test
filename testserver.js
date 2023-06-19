var express = require("express");
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

const os = require('os');

var app = express();
var PORT = 8000;
// const PORT = process.env.PORT || 8000;

////
app.use(bodyParser.json());

const axios = require('axios');
const path = require('path');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Connect to MongoDB Atlas (replace <YOUR_CONNECTION_STRING> with your actual connection string)
mongoose.connect("mongodb+srv://DBPro:Oysterr_246@tabledata.mj8zb3d.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a database schema
const dataSchema = new mongoose.Schema({
  name: String,
  tabledata: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, {versionKey: false});

// Create a model based on the schema
const DataModel = mongoose.model('Data', dataSchema);
////

let reqData;
let compare;

////
let reqData3;
let reqData4;
let reqData5;
////

app.use(express.json())

app.set("Title","Welcome to My Application")

app.get("/", (req,res)=>{

   res.send(app.get('Title'))
   console.log(app.get('Title'))
   
})

app.post("/T1",(req,res)=>{
    reqData = req.body;
    compare = req.body.state;
   
    console.log(compare)
    console.log(reqData)
})
app.get("/T1",(req,res)=>{
    
   // res.send(JSON.stringify(reqData));

     if(compare == "1")
    {
      //  res.send(JSON.stringify({"State": "ON"}));
        res.json({"State": "ON"})
    }
    else(compare == "0")
    {
     //  res.send(JSON.stringify({"State": "OFF"}))
       res.json({"State": "OFF",
	       "ip": ipAddress})

    }
   // console.log(reqData)
})

app.get('/T1State',(req,res)=>{
     
  
    
   
    console.log(compare)
   
})
app.post("/T2",(req,res)=>{

    reqData = req.body;
    console.log(reqData)
})
app.get("/T2",(req,res)=>{

    res.send(JSON.stringify(reqData));
    console.log(reqData)
})
app.post("/T3",(req,res)=>{

    reqData = req.body;
    console.log(reqData)
  
})
app.get("/T3", async (req,res)=>{
    reqData3 = await axios.get('http://192.168.1.18:5000/post');
    const data = reqData3.data;
    res.send(data);
    
})
app.post("/T4",(req,res)=>{
    
    reqData4 = req.body;
    console.log(reqData4)
})
app.get("/T4",(req,res)=>{
    
    res.send(JSON.stringify(reqData4));
    console.log(reqData4)
})

////////////////////////////
// Define a route to save JSON data
app.post('/t5', async (req, res) => {
  try {
    const { name, tabledata } = req.body;

    // Find the existing data based on the name field
    const existingData = await DataModel.findOne({ name });

    if (existingData) {
      // Update the existing data
      existingData.tabledata = tabledata;
      await existingData.save();
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      // Create a new instance of the DataModel with the JSON data
      const newData = new DataModel({ name, tabledata });

      // Save the new data to the database
      await newData.save();
      res.status(201).json({ message: 'Data saved successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the data' });
  }
});

// Define a route to retrieve a specific tabledata by name
app.get('/t5/:name', async (req, res) => {
  try {
    const name = req.params.name;

    // Find the data based on the name
    const data = await DataModel.findOne({ name });

    if (data) {
      res.status(200).json(data.tabledata);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the data' });
  }
});
////////////////////////////

app.post("/T6",(req,res)=>{
    
    reqData = req.body;
    console.log(reqData)
})
app.get("/T6",(req,res)=>{
   
    // res.send(JSON.stringify(reqData));
    const reqData = {
		"T_1": 0,
		"T_2": 1,
		"T_3": 0,
		"T_4": 1,
		"T_5": 0,
		"T_6": 1,
		}
    res.json(reqData)
    // console.log(reqData)
})

// Start

app.get('/home', async (req, res) => {
    try {
	// const response = await axios.get('http://127.0.0.1:8000/post');
		const response = await axios.get('http://3.7.221.183:8000/t5');
	 // const response = await axios.get('https://f7bd-2401-4900-1f2b-5fa1-7566-1e10-d9f-bc01.in.ngrok.io/post');
	 // const response = await axios.get('http://52.41.36.82/post');
      const data = response.data;
  
      res.render('home.html', { data: data });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving data' });
    }
});

const ipAddress = getIPAddress();

app.get (`/${ipAddress}/data`, (req, res) => {
	res.send(JSON.stringify(reqData));
    console.log(reqData)
});

app.get (`/${ipAddress}/data`, (req, res) => {
	reqData = req.body;
    console.log(reqData)
});

function getIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const iface in interfaces) {
      for (const alias of interfaces[iface]) {
        if (alias.family === 'IPv4' && !alias.internal) {
          return alias.address;
        }
      }
    }
    return 'Unknown';
}

// End

app.listen(PORT, function(err){
    if (err) 
    console.log(err);
    console.log("Server listening on Port", PORT)
})
