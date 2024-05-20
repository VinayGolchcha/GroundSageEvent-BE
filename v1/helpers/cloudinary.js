import { config } from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dgxsbazvx', 
    api_key: '367566542868935', 
    api_secret: 'mtVbCzGPRaHfF_oJR74baWgymX0' 
  });

export const uploadImageToCloud = (imageBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "groundsage" }, 
            (error, result) => {
                if (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                    reject(error);
                    return;
                }
                const { secure_url, public_id } = result;

                resolve({ secure_url, public_id });
            }
        ).end(imageBuffer);
    });
};

export const deleteImageFromCloud = (public_id) =>{
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(public_id, (error, result) =>{
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };