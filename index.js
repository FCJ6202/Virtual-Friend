var express = require('express')
var multer  = require('multer')
const vision = require('@google-cloud/vision')
var port = 3000;

var app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

var Name;
var element;

async function CallFunction(temp){
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './image_converted.json'
  });
  
  // Performs label detection on the image file
  element = client
    .textDetection('./uploads/'+temp)
    .then(results => {
      const labels = results[0].fullTextAnnotation;
  
      console.log(results);
  
      console.log('Labels:');
      return labels.text;
      // labels.forEach(label => console.log(label.description));
      //console.log(results);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
    var hello = "dbjasbcj";
    var temp = await element.then(function(result) {
      console.log("kjashkjdk");
      console.log(hello); // "Some User token"
      hello = result;
      console.log(hello);
      return result;
    })
    return hello;
  }

app.post('/profile-upload-single', upload.single('profile-file'),async function (req, res, next) {
  // req.file is the `profile-file` file
  // req.body will hold the text fields, if there were any
  //console.log(JSON.stringify(req.file.originalname))
  var response = '<a href="/">Home</a><br>'
  response += "Files uploaded successfully.<br>"
  response += `<img src="${req.file.path}" /><br>`
  Name = req.file.originalname;
  response += '<br><div class = "space">';
  response += await CallFunction(Name);
  response += "<div/>";
  
  return res.send(response);
})

app.post('/profile-upload-multiple', upload.array('profile-files', 12), function (req, res, next) {
    // req.files is array of `profile-files` files
    // req.body will contain the text fields, if there were any
    //console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    for(var i=0;i<req.files.length;i++){
        response += `<img src="${req.files[i].path}" /><br>`
    }
    
    return res.send(response);
})


   

app.listen(port,() => console.log(`Server running on port ${port}!\nClick http://localhost:3000/`))