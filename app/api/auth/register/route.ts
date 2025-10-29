import { connectToDataBase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and paswwrd are required" },
        { status: 400 }
      );
    }

    // Check for db connection
    await connectToDataBase();
    const existingUser = await User.findOne();
    if (existingUser) {
      return NextResponse.json(
        { error: "User is already register" },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "User register successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Register Error", error);

    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 400 }
    );
  }
}
