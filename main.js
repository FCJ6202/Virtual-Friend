const express = require('express');
const app = express();
const vision = require('@google-cloud/vision');
const multer = require('multer');
// Creates a client

var Callfunction = () => {
  const client = new vision.ImageAnnotatorClient({
    keyFilename: './image_converted.json'
  });
  
  // Performs label detection on the image file
  var element = client
    .textDetection('./uploads/a.png')
    .then(results => {
      const labels = results[0].fullTextAnnotation;
  
      console.log(results);
  
      console.log('Labels:');
      return labels.text;
      //console.log(element);
      //labels.forEach(label => console.log(label.description));
      //console.log(results);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
    var temp = element.then(function(result) {
      console.log(result);
      return result; // "Some User token"
   })

   return temp;
}

//console.log(Callfunction("a.png"));

Callfunction.then(function(result){
  console.log(result);
});

// const client = new vision.ImageAnnotatorClient({
//   keyFilename: './image_converted.json'
// });

// // Performs label detection on the image file
// var element = client
//   .textDetection('./uploads/a.png')
//   .then(results => {
//     const labels = results[0].fullTextAnnotation;

//     console.log(results);

//     console.log('Labels:');
//     return labels.text;
//     //console.log(element);
//     //labels.forEach(label => console.log(label.description));
//     //console.log(results);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

//   element.then(function(result) {
//     console.log(result) // "Some User token"
//  })

// // const carImage = multer({
// //   limits:{

// //   },
// //   dest : 'images',
// //   fileFilter(req, file, cb) {
// //       if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
// //           return cb(new Error('Please upload a jpg, jpeg or png file.'))
// //       }
//       cb(undefined, true)
//   }
// })
// app.post('/upload',carImage.single('photo'),function(req,res){
//   res.send()
// })




//app.listen(5000, '127.0.0.2', () => console.log('Server running'));
