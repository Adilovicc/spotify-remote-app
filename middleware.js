import {getToken} from "next-auth/jwt"
import {NextResponse} from "next/server"


export async function middleware(req){
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    
    const {pathname} = req.nextUrl;
    const url = req.nextUrl.clone();
    url.pathname='/login';
    // Allow the request if the following is true...
    // 1) the token exist
    if(pathname.includes('/api/auth') || token){
         return NextResponse.next();
    }
    if (!token && pathname !== url.pathname) {
        return NextResponse.rewrite(url);
    }
} 

export const config = {
    matcher: "/",
    };