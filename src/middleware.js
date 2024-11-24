import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const token = (await cookies(request)).get("next-auth.session-token");
  console.log(token);
  
if (!token) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
}

  return NextResponse.next();
};

export const config = {
  matcher: ["/Dash", "/Services"],
};
