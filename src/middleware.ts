import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const ProtectedRoutes = createRouteMatcher([
//     "/api/ImageUpload",
//     "/Home"
// ])

// const PublicRoutes = createRouteMatcher([
//     "/sign-in",
//     "/sign-up",
//     "/",
// ])


export default clerkMiddleware((auth,req)=>{
    const {userId}= auth();
    const Url= new URL(req.url);
    //  const IsAccessingHome=Url.pathname==="/api/BlurFace"

    //  if (userId && PublicRoutes(req) && !IsAccessingHome){
    //     return NextResponse.redirect(new URL("/", req.url))
    //  }

    //  if (!userId && ProtectedRoutes(req)){
    //     return NextResponse.redirect(new URL("/sign-up", req.url))

    //  }

     return NextResponse.next()

});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};