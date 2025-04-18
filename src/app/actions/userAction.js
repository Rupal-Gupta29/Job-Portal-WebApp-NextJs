"use server";
import prisma from "@/utils/prisma";
import { auth } from "@/auth";
import {
  basicInfoSchema,
  profileSummarySchema,
  linksSchema,
  personalDetailsSchema,
} from "@/utils/userSchema";
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

    const findUser = await prisma.user.findUnique({
      where: { email },
      select: { otherDetails: true },
    });

    const otherDetails = findUser?.otherDetails || {};

    await prisma.user.update({
      where: { email },
      data: {
        otherDetails: { otherDetails, ...result.data },
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.log("Error in updating user details: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function saveUserProfileSummaryAction(updatedProfileInfo) {
  try {
    const result = profileSummarySchema.safeParse(updatedProfileInfo);
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

    const findUser = await prisma.user.findUnique({
      where: { email },
      select: { otherDetails: true },
    });

    const otherDetails = findUser?.otherDetails || {};

    await prisma.user.update({
      where: { email },
      data: {
        otherDetails: { ...otherDetails, ...result.data },
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.log("Error in updating user details: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function saveUserLinksAction(updatedLinksInfo) {
  try {
    const result = linksSchema.safeParse(updatedLinksInfo);
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

    const findUser = await prisma.user.findUnique({
      where: { email },
      select: { otherDetails: true },
    });

    const otherDetails = findUser?.otherDetails || {};

    await prisma.user.update({
      where: { email },
      data: {
        otherDetails: { ...otherDetails, ...result.data },
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.log("Error in updating user details: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function saveUserPersonalInfoAction(updatedPersonalInfo) {
  try {
    const result = personalDetailsSchema.safeParse(updatedPersonalInfo);
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

    const findUser = await prisma.user.findUnique({
      where: { email },
      select: { otherDetails: true },
    });

    const otherDetails = findUser?.otherDetails || {};

    await prisma.user.update({
      where: { email },
      data: {
        otherDetails: { ...otherDetails, ...result.data },
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.log("Error in updating user details: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}
