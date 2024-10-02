import { useState } from 'react';

interface ThumbnailProps {
  handleImageAdd: (url: string) => void;
  handleImageRemove: (url: string) => void;
}

export default function Thumbnail({ handleImageAdd, handleImageRemove }: ThumbnailProps) {
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file =>
        URL.createObjectURL(file)
      );
      setThumbnails([...thumbnails, ...fileArray]);
      fileArray.forEach((fileUrl) => handleImageAdd(fileUrl));
      // Reset the file input for new uploads
      event.target.value = '';
    }
  };

  const handleRemoveThumbnail = (index: number) => {
    const removedUrl = thumbnails[index];
    setThumbnails(thumbnails.filter((_, i) => i !== index));
    
    // Remove the image from the modal's state
    handleImageRemove(removedUrl);
  };

  return (
    <div className="p-6 bg-white rounded shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">썸네일 및 상품 사진</h2>
      <p className="text-sm text-gray-600 mb-4">
        상품을 표현할 수 있는 사진을 추가하세요. 사진은 추가된 순서대로 게재됩니다.
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

      {/* Thumbnails display */}
      <div className="grid grid-cols-4 gap-4">
        {thumbnails.map((src, index) => (
          <div key={index} className="relative">
            <img src={src} alt="Thumbnail" className="w-full h-24 object-cover rounded" />
            <button
              onClick={() => handleRemoveThumbnail(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
