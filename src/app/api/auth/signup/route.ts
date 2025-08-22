import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../../../services/userService";
import { initializeDatabase } from "../../../../config/database";

export async function POST(request: NextRequest) {
  try {
    // Initialize database connection
    await initializeDatabase();

    const body = await request.json();
    const { email, password, firstName, lastName } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Create user
    const user = await UserService.createUser({
      email,
      password,
      firstName,
      lastName,
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
