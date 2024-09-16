"use client"

import React, { useState, useEffect, useRef } from 'react';
import { CldImage } from 'next-cloudinary';

const BlurFace = () => {
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const FileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/ImageUpload", {
      method: "POST",
      body: formData
  })
      const data = await response.json();
console.log(data)
    // const blurredImage = new CloudinaryImage(data).effect(
    //   blur()
    //     .strength(800)
    //     .region(faces())
    // );
      setUploadedImage(data.publicId)
  };

  return (
    <div>
      <input type="file" onChange={FileUpload} />
      <CldImage
  width="960"
  height="600"
  src={uploadedImage}
  sizes="100vw"
  remove="person"
  background="blueviolet"
  alt=""
/>


    </div>
  );
};

export default BlurFace;