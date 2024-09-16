"use client";
import React, { ReactElement, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import html2canvas from "html2canvas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Wand2,
  Eraser,
  Scissors,
  PaintBucket,
  ImagePlus,
  Sun,
  Moon,
} from "lucide-react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [publicId, setPublicId] = useState<string>("");
  const [processedImages, setProcessedImages] = useState<Record<string, ReactElement | null>>({
    "Background Removal": null,
    "Object Extraction": null,
    "Image Blur": null,
    "grayscale": null,
    "Restore Image": null,
    "Smart Cropping": null,
  });
  const imageRef = useRef<HTMLImageElement>(null);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/ImageUpload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPublicId(data.publicId);
    }
  };

  const Transformation = (feature: string): ReactElement | null => {
    switch (feature) {
      case "Background Removal":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            ref={imageRef}
            replaceBackground="Black screen"
            alt="Processed Image"
          />
        );
      case "Object Extraction":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            ref={imageRef}
            extract="Object human animal tree"
            alt="Processed Image"
          />
        );
      case "Image Blur":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            ref={imageRef}
            blur="1200"
            alt="Processed Image"
          />
        );
      case "grayscale":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            ref={imageRef}
            grayscale
            alt="Processed Image"
          />
        );
      case "Restore Image":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            restore
            ref={imageRef}
            alt="Processed Image"
          />
        );
      case "Smart Cropping":
        return (
          <CldImage
            width="960"
            height="600"
            src={publicId}
            sizes="100vw"
            crop="pad"
            fillBackground
            ref={imageRef}
            alt="Processed Image"
          />
        );
      default:
        return null;
    }
  };

 

  const applyTransformation = async (feature: string) => {
    const transformedImage = Transformation(feature);
    
    setProcessedImages((prev) => ({
      ...prev,
      [feature]: transformedImage,
    }));
  };

  const features = [
    {
      name: "Background Removal",
      icon: Eraser,
      description: "Remove the background from your image with AI",
    },
    {
      name: "Object Extraction",
      icon: Scissors,
      description: "Extract specific objects from your image",
    },
    {
      name: "Image Blur",
      icon: Wand2,
      description: "Apply Blur style to your images",
    },
    {
      name: "grayscale",
      icon: PaintBucket,
      description: "Automatically make your image in grayscale in seconds",
    },
    {
      name: "Restore Image",
      icon: ImagePlus,
      description: "Restore Image resolution without losing quality",
    },
    {
      name: "Smart Cropping",
      icon: Scissors,
      description: "Intelligently crop images to focus on the main subject",
    },
  ];
  
  const handleDownload = () => {
    if(!imageRef.current) return;
    fetch(imageRef.current.src)
    .then((response) => response.blob())
    .then((blob) => {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `image.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    })}
  return (
    <div className={`h-full w-full ${isDarkMode ? "dark" : ""}`}>
      <div className="mx-auto py-16 px-24 transition-colors duration-200 ease-in-out dark:bg-gray-900">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl ml-10 font-bold text-center dark:text-white">
            Rinser
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem] dark:text-gray-100" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upload">Upload Image</TabsTrigger>
            <TabsTrigger value="url">Image URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Card className="dark:bg-gray-800 dark:text-white transition-all duration-200 ease-in-out">
              <CardHeader>
                <CardTitle>Upload an Image</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Drag and drop an image or click to browse
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center w-full">
                  <Label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-300">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <Input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="url">
            <Card className="dark:bg-gray-800 dark:text-white transition-all duration-200 ease-in-out">
              <CardHeader>
                <CardTitle>Enter Image URL</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Provide a direct link to the image you want to edit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="dark:bg-gray-700 dark:text-white"
                  />
                  <Button type="submit">Load</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {features.map((feature, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:text-white transition-all duration-200 ease-in-out hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <feature.icon className="w-6 h-6" />
                  <span>{feature.name}</span>
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <div className="w-1/2 space-y-2">
                      <p className="text-sm font-medium mb-2 dark:text-gray-300">
                        Original
                      </p>
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Original"
                          className="mt-4 w-full h-3/4 object-contain rounded-xl"
                        />
                      )}
                    </div>
                    <div className="w-1/2 space-x-2">
                      <p className="text-sm font-medium mb-2 dark:text-gray-300">
                        Processed
                      </p>
                      <div
                        
                        className="mt-4 w-full h-3/4 object-contain rounded-xl"
                      >
                        {processedImages[feature.name]}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 dark:bg-gray-200"
                    onClick={() => applyTransformation(feature.name)}
                  >
                    Apply {feature.name}
                  </Button>
                  <Button
                    className="w-full mt-4 dark:bg-gray-200"
                    onClick={ handleDownload}
                    disabled={!processedImages[feature.name]}
                  >
                    Download {feature.name}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
