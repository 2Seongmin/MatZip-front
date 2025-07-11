import React from "react";

const ImageUploader = ({
  images,
  setImages,
  setError,
  deletedImagePaths,
  setDeletedImagePaths,
  initialImages = [],
}) => {
  const handleChange = (e) => {
    const selected = Array.from(e.target.files);
    const total = [...images, ...selected];
    if (total.length + initialImages.length > 5) {
      setError("이미지는 최대 5장까지 등록 가능합니다.");
      return;
    }
    setImages(total);
    setError(null);
    e.target.value = null;
  };

  const handleRemoveNew = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
  };

  const handleRemoveInitial = (imagePath) => {
    setDeletedImagePaths((prev) => [...prev, imagePath]);
  };

  return (
    <div className="space-y-2">
      <span className="font-bold">
        매장 이미지 <em className="text-red-500">*</em>
      </span>
      <label
        htmlFor="images"
        className="block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md cursor-pointer w-fit mt-3"
      >
        업로드
      </label>
      <input
        id="images"
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {/* 기존 이미지 */}
      {initialImages.length > 0 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {initialImages
            .filter((img) => !deletedImagePaths.includes(img))
            .map((img, idx) => (
              <div
                key={`init-${idx}`}
                className="relative border-gray-100 rounded overflow-hidden w-full aspect-square"
              >
                <img
                  src={`${img}`}
                  alt={`기존 이미지 ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveInitial(img)}
                  className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      )}

      {/* 새로 업로드한 이미지 */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2 mt-2">
          {images.map((file, index) => (
            <div
              key={`new-${index}`}
              className="relative border-gray-100 rounded overflow-hidden w-full aspect-square"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`미리보기 ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveNew(index)}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
