import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname == "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}
