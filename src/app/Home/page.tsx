"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/assets/icons/ico.svg"
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
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      name: "Style Transfer",
      icon: Wand2,
      description: "Apply artistic styles to your images",
    },
    {
      name: "Color Enhancement",
      icon: PaintBucket,
      description: "Automatically enhance and adjust image colors",
    },
    {
      name: "Image Upscaling",
      icon: ImagePlus,
      description: "Increase image resolution without losing quality",
    },
    {
      name: "Smart Cropping",
      icon: Scissors,
      description: "Intelligently crop images to focus on the main subject",
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="container mx-auto py-10 px-4 transition-colors duration-200 ease-in-out dark:bg-gray-900">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-center dark:text-white">
            AI Image Editor
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
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
                    <Input id="dropzone-file" type="file" className="hidden" />
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
            <Card
              key={index}
              className="dark:bg-gray-800 dark:text-white transition-all duration-200 ease-in-out hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <feature.icon className="w-6 h-6" />
                  <span>{feature.name}</span>
                </CardTitle>
                <CardDescription className="dark:text-gray-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent >
                <div className="space-y-4 ">
                  <div className="flex space-x-4">
                    <div className="w-1/2 space-y-2">
                      <p className="text-sm font-medium mb-2  dark:text-gray-300">
                        Original
                      </p>
                      <Icon
                        alt="Placeholder"
                        className="w-1/2 h-auto p-5  dark:text-gray-300 space-x-2"
                      />
                    </div>
                    <div className="w-1/2 space-x-2">
                      <p className="text-sm font-medium mb-2 space-x-2 dark:text-gray-300">
                        Processed
                      </p>
                      <Icon
                        alt="Placeholder"
                      className="w-1/2 h-auto p-5 space-x-2 dark:text-gray-300"
                      />
                    </div>
                  </div>
                  <Button className="w-full">Apply {feature.name}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
