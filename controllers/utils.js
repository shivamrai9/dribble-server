import { v2 as cloudinary } from 'cloudinary';

// Utility functions like image upload function

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dyovnm7le',
    api_key: '254196154512784',
    api_secret: 'q_rir9SZffAYeiqk8AD4guoBtC8',
  });
  
  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  }
  

const uploadImg = (image) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(image, opts, (error, result) => {
        if (result && result.secure_url) {
          console.log(result.secure_url);
          return resolve(result.secure_url);
        }
        console.log(error.message);
        return reject({ message: error.message });
      });
    });
  };

export default uploadImg;