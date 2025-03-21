"use server";
import { loginSchema, registerSchema } from "@/utils/authSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";
import bcrypt from "bcryptjs";
import prisma from "@/utils/prisma";

export async function logoutAction() {
  await signOut({ redirectTo: "/auth/sign-in" });
}

export async function credentialsLoginAction(userData) {
  try {
    const result = loginSchema.safeParse(userData);
    if (!result.success) {
      let errors = {};

      result.error.issues.forEach((issue) => {
        errors = { ...errors, [issue.path[0]]: issue.message };
      });

      return {
        success: false,
        errors,
      };
    }
    await signIn("credentials", { ...userData, redirect: false });
    return {
      success: true,
      message: "User Logged In successfully.",
    };
  } catch (error) {
    console.log("error aaya", error);
    // if (error instanceof AuthError) {
    //   return { error: "Invalid Credentials" };
    // } else {
    //   return { error: "An unexpected error occured." };
    // }
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
    console.log("Error occured: ", error.message);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
