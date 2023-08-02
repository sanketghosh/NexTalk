import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

/* register user function */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    /* extract all the info from body */
    const { email, password, name } = body;

    /* if no info exists */
    if (!name || !password || !email) {
      return new NextResponse("Missing info", { status: 400 });
    }

    /* hash password to store in the DB */
    const hashedPassword = await bcrypt.hash(password, 12);

    /* create an user */
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    /* 'new' keyword not required before 'NextResponse' while sending json response */
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "ERROR: Registration error");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
