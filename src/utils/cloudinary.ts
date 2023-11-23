// // Require the cloudinary library
// const cloudinary = require('cloudinary').v2;

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'pc-ova', 
  api_key: '937465778397257', 
  api_secret: '-vq3BALr0y2noipj68rE3-SOOdM' 
});

export default cloudinary;
// Log the configuration
// console.log(cloudinary.config());