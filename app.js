// app.set() Demo Example

// Importing the express module
var express = require('express');
var bodyParser = require('body-parser');
const multer = require('multer')



var fs = require("fs");
const { btoa } = require('buffer');
let ImageData;
let RawFileData;
let myFile;
let rawFile;
let buffer ;
let mhdReqBody;
let bufferForRawFile ;
var findStr;
let fbxReqBody;
let fbxData;
let fbxFile;

var app = express();
//app.use(express.urlencoded({extended: true}))
//app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
app.use(express.json({limit: "50mb"}));
var PORT = 8080;


// Setting the value to name
app.set('title', 'Welcome to TutorialsPoint');

// Creating an endpoint
app.get('/', (req, res) => {
   res.send(app.get('title'));
   console.log(app.get('title'));
})

/*app.get("/findServerOrClient",(req,res)=>{
  // res.json(findStr);
   res.json(findStr);
})
app.post("/findServerOrClient",(req,res)=>{
   var isServer = req.body;
   findStr = req.body;
   console.log(findStr);
})
 */

app.get('/fileupload',(req,res) => {
     
     //res.json(fbxReqBody);
     res.send(JSON.stringify(fbxReqBody));
     console.log(fbxReqBody);
})

var myStr;
let bool
app.post('/fileupload',(req,res) => {
  
 fbxReqBody = req.body;
 fbxData = req.body.FbxData;

 if(!req == null){
  bool = "true";
}
else{
  bool = "false";
}
  
  /*const bufferForFbx = Buffer.from(fbxData,"base64");
  fbxFile = fs.writeFileSync("./FbxFile/NewFbxFile.fbx",bufferForFbx)
  res.end(fbxData);*/
   
 })

app.get("/fbxfile",(req,res,err)=>{
    
    const base64EncForFbx = (filepath)=>{
      return fs.readFileSync(filepath,"base64");};
    
   const encdedfbxData = base64EncForFbx("./FbxFile/NewFbxFile.fbx")
   res.json({"fbxData" : encdedfbxData });

    }

    
)
app.get('/second', (req, res) => {
  res.send('This is the second page');
});




app.listen(PORT, function(err){
   if (err) 
   console.log(err);
   console.log("Server listening on PORT", PORT);
});
