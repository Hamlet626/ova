// // Require the cloudinary library
// const cloudinary = require('cloudinary').v2;

// // Return "https" URLs by setting secure: true
// cloudinary.config({
//   secure: true
// });


import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'cloudinary_project_name', 
  api_key: 'api_key', 
  api_secret: 'secret' 
});

export default cloudinary;
// Log the configuration
// console.log(cloudinary.config());
