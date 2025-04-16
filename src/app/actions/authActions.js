"use server";
import { loginSchema, registerSchema } from "@/utils/authSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";
import { auth } from "@/auth";

export async function logoutAction() {
  await signOut({ redirectTo: "/auth/sign-in" });
}

export async function credentialsLoginAction(userData) {
  try {
    const result = loginSchema.safeParse(userData);
    if (!result.success) {
      const errors = result.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});

      return {
        success: false,
        errors,
      };
    }

    const findUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!findUser) {
      return { error: "User does not exists. Please register yourself first." };
    }

    await signIn("credentials", { ...userData, redirect: false });
    return {
      success: true,
      message: "User logged in successfully.",
    };
  } catch (error) {
    console.log("Error while logging in: ", error.message);
    if (error instanceof AuthError) {
      return { error: "Invalid credentials." };
    } else {
      return { error: "An unexpected error occured. Please try again later." };
    }
  }
}

export async function registerUserAction(userData) {
  try {
    const result = registerSchema.safeParse(userData);

    if (!result.success) {
      const errors = result.error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});

      return {
        success: false,
        errors,
      };
    }
    const { name, email, password } = userData;
    const findUser = await prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      return {
        error:
          "User already exists. Please log into your account or try with different email.",
      };
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: null,
    };

    const newlyCreatedUser = await prisma.user.create({
      data: newUser,
    });

    if (!newlyCreatedUser) {
      return {
        success: false,
        error: "User registration failed. Please try again later.",
      };
    }

    return { success: true, message: "User registered successfully." };
  } catch (error) {
    console.log("Error in registering user: ", error.message);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function selectUserRoleAction({ role }) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized: No user session found.",
      };
    }

    const email = session.user.email;

    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role },
    });

    if (!updatedUser) {
      return {
        success: false,
        error: "Error in updating role.",
      };
    }

    return {
      success: true,
      message: "Role updated. Please login again.",
    };
  } catch (error) {
    console.log("Error updating role:", error);
    return {
      success: false,
      error: "Something went wrong.",
    };
  }
}
