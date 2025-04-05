"use server";
import { jobSchema } from "@/utils/jobSchema";
import prisma from "@/utils/prisma";
import { auth } from "@/auth";

export async function postJobAction(jobData) {
  try {
    const session = await auth();
    const email = session?.user?.email;
    const result = jobSchema.safeParse(jobData);
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

    const findRecruiter = await prisma.user.findUnique({
      where: { email },
    });

    if (!findRecruiter) {
      return { success: false, error: "Recruiter not found." };
    }

    const newJob = {
      ...jobData,
      recruiterId: findRecruiter.id,
    };

    const newlyCreatedJob = await prisma.jobs.create({
      data: newJob,
    });

    if (!newlyCreatedJob) {
      return {
        success: false,
        error: "Something went wrong. Please try again later.",
      };
    }

    return { success: true, message: "Job posted successfully." };
  } catch (error) {
    console.log("error in posting job: ", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function getPostedJobsByRecruiter() {
  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return { success: false, error: "Unauthorized" };
    }

    const findRecruiter = await prisma.user.findUnique({
      where: { email },
    });

    if (!findRecruiter) {
      return { success: false, error: "Recruiter not found." };
    }

    const recruiterId = findRecruiter.id;

    const jobsPostedByRecruiter = await prisma.jobs.findMany({
      where: { recruiterId },
    });

    console.log("jobss posted", jobsPostedByRecruiter);
    return { success: true, jobs: jobsPostedByRecruiter };
  } catch (error) {
    console.log("error in fetching the jobs: ", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}
