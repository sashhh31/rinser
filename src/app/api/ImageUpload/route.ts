import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';


cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});



export async function POST(request: NextRequest) {
    const {userId} = auth();

    if (!userId) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if(!file){
            return NextResponse.json({error: "File not found"}, {status: 400})
        }
        
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const base64Image = `data:${file.type};base64,${base64}`;

        const result= await cloudinary.uploader
        .upload(base64Image,{
          asset_folder: 'ImageStore',
          resource_type: 'image'})          
          return NextResponse.json({ publicId: result.public_id }, { status: 200 });
   
    

    } catch (error) {
        console.log("Upload image failed", error)
        return NextResponse.json({error: "Upload image failed"}, {status: 500})
    }

}
