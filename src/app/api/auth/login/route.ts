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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _unused, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Login successful",
      user: userWithoutPassword,
    });
      } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Internal server error";
      return NextResponse.json(
        { error: errorMessage },
        { status: 401 }
      );
    }
}
