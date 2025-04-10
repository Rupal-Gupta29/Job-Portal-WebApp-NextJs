"use server";
import prisma from "@/utils/prisma";
import { auth } from "@/auth";
import { basicInfoSchema } from "@/utils/userSchema";
import { revalidatePath } from "next/cache";

export async function getUserDetailsAction() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized: No user session found.",
      };
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        otherDetails: true,
      },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found.",
      };
    }

    return {
      success: true,
      user,
    };
  } catch (error) {
    console.log("Error in getting user's details: ", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function saveUserBasicInfoAction(updatedbasicInfo) {
  try {
    const result = basicInfoSchema.safeParse(updatedbasicInfo);
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

    const session = await auth();
    const email = session.user.email;

    if (!session?.user?.email) {
      return {
        success: false,
        error: "Unauthorized: No user session found.",
      };
    }

    await prisma.user.update({
      where: { email },
      data: {
        otherDetails: result.data,
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "User details updated successfully." };
  } catch (error) {
    console.log("Error in updating user details: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}
