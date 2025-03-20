"use server";
import { loginSchema } from "@/utils/authSchema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { signOut } from "@/auth";

export async function logoutAction() {
  await signOut({ redirectTo: "/auth/sign-in" });
}

export async function credentialsLoginAction(userData) {
  const result = loginSchema.safeParse(userData);
  console.log("result from safe parse", result);
  console.log("userdata", userData);
  if (!result.success) {
    console.log("issues", result.error.issues);
    let errors = {};

    result.error.issues.forEach((issue) => {
      errors = { ...errors, [issue.path[0]]: issue.message };
    });

    return {
      success: false,
      errors,
    };
  }
  try {
    await signIn("credentials", { ...userData, redirect: false });
    return {
      success: true,
      message: "User Logged In successfully.",
    };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      return { error: "Invalid Credentials" };
    } else {
      return { error: "An unexpected error occured." };
    }
  }
}
