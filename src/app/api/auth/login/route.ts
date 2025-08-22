import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../../../services/userService";
import { initializeDatabase } from "../../../../config/database";

export async function POST(request: NextRequest) {
  try {
    // Initialize database connection
    await initializeDatabase();

    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await UserService.authenticateUser(email, password);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 401 }
    );
  }
}
