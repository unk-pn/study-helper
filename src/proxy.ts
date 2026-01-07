import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  if (token && pathname.startsWith("/auth"))
    return NextResponse.redirect(new URL("/", request.url));

  if (!token && pathname.startsWith("/subjects"))
    return NextResponse.redirect(new URL("/auth/signIn", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/subjects/:path*", "/auth/:path*"],
};
