import React, { useState, useEffect } from 'react';
import { Form, Image as BootstrapImage } from 'react-bootstrap';

const MAX_IMAGE_SIZE = 800; // Maximum width or height in pixels

const ImageUploader = ({ onImageSelect, defaultImage }) => {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, [defaultImage]);

  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = document.createElement('img');
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
          if (width > height && width > MAX_IMAGE_SIZE) {
            height = (height * MAX_IMAGE_SIZE) / width;
            width = MAX_IMAGE_SIZE;
          } else if (height > MAX_IMAGE_SIZE) {
            width = (width * MAX_IMAGE_SIZE) / height;
            height = MAX_IMAGE_SIZE;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to Blob
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Check if image needs resizing
      const resizedBlob = await resizeImage(file);
      const resizedFile = new File([resizedBlob], file.name, { type: file.type });
      
      // Create preview
      const previewUrl = URL.createObjectURL(resizedFile);
      setPreview(previewUrl);
      
      // Pass the resized file to parent
      onImageSelect(resizedFile);
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };

  return (
    <div className="image-uploader">
      <Form.Group className="mb-3">
        <Form.Label>Hình đại diện bài viết</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-2"
        />
        {preview && (
          <div className="image-preview mt-2">
            <BootstrapImage
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              thumbnail
              onError={(e) => {
                console.error('Error loading image:', e);
                setPreview('');
              }}
            />
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default ImageUploader; 