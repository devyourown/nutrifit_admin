import { useState } from 'react';

interface ThumbnailProps {
  images: File[];
  originalImages: string[];
  onOriginalRemove: (url: string) => void;
  onImageAdd: (imageFiles: File[]) => void;
  onImageRemove: (index: number) => void;
}

export default function Thumbnail({ images, originalImages, onOriginalRemove, onImageAdd, onImageRemove }: ThumbnailProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onImageAdd(Array.from(files)); // Pass the array of files back to the parent component
      event.target.value = ''; // Reset the input for new uploads
    }
  };

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        사진은 추가된 순서대로 게재됩니다.
      </p>

      {/* Dropzone and file input */}
      <div className="border-dashed border-2 border-gray-300 py-5 px-4 mb-4 text-center">
        <label className="block mb-2 text-gray-700 cursor-pointer">
          <span>사진을 드래그하여 내려놓거나 <span className="text-blue-500">여기를 클릭하세요.</span></span>
          <input type="file" multiple onChange={handleFileChange} accept="image/*"
                 style={{ display: 'none' }} />
        </label>
        <p className="text-xs text-gray-500">1200 x 1600 (3:4) 형식을 추천합니다, 사진당 10MB까지</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {originalImages && originalImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt="Thumbnail" className="w-full h-24 object-cover rounded" />
            <button
            type='button'
              onClick={() => onOriginalRemove(image)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Thumbnails display */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={URL.createObjectURL(image)} alt="Thumbnail" className="w-full h-24 object-cover rounded" />
            <button
            type='button'
              onClick={() => onImageRemove(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
