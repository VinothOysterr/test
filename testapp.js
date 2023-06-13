// app.set() Demo Example

// Importing the express module
var express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer')

// var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, "public/uploads");
//    },
//    filename: function (req, file, cb) {
//      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
//    },
//  });

//var upload = multer({ storage: storage }).single('file');
 

var fs = require("fs");
let ImageData;
let RawFileData;
let myFile;
let rawFile;
let buffer ;
let mhdReqBody;
let bufferForRawFile ;
// Initializing the express and port number
var app = express();
//app.use(express.urlencoded({extended: true}))
//app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.urlencoded({extended: true, parameterLimit: 50000,  limit: "50mb"}));
app.use(express.json({limit: "50mb"}));
var PORTNO = 4000;


// Setting the value to name
app.set('title', 'Welcome to TutorialsPoint');

// Creating an endpoint
app.get('/', (req, res) => {
   res.send(app.get('title'));
   console.log(app.get('title'));
})
app.get('/imageupload',(req,res)=>{
   res.json(mhdReqBody);
   
   
})
 app.post('/imageupload',(req,res) => {
      const title = req.body;
   mhdReqBody = req.body;
   ImageData = req.body.ImageData;
   RawFileData = req.body.RawFileData;
     const Json = JSON.parse(title);
   ImageData = JSON.stringify(title);
  const image = ImageData;
   const buffer = Buffer.from(ImageData,"base64")
   const bufferForRawFile = Buffer.from(RawFileData,"base64")
  
  
   myFile = fs.writeFileSync("./mhdfiles/MR-Abdomen.mhd" ,buffer)
   rawFile = fs.writeFileSync("./mhdfiles/MR-Abdomen.zraw",bufferForRawFile)
  //console.log("File is downloaded in C:\\Users\\techo\\OneDrive\\Pictures\\Screenshots\\Nature3.jpg");
  console.log(ImageData);
  console.log(RawFileData);
   res.end(JSON.stringify({"status" : true}));
   
  res.end(ImageData);
   
 })

  app.get("/mhdfiles",(req,res,err)=>{
       res.end(ImageData);
   })
 

app.listen(PORTNO, function(err){
   if (err) console.log(err);
   console.log("Server listening on PORT", PORTNO);
});
