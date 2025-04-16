"use server";
import { jobSchema } from "@/utils/jobSchema";
import prisma from "@/utils/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
    console.log("Error in posting job: ", error);
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

    return { success: true, jobs: jobsPostedByRecruiter };
  } catch (error) {
    console.log("Error in fetching the jobs: ", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function deleteJobAction(jobId) {
  try {
    await prisma.jobs.delete({
      where: { id: jobId },
    });
    revalidatePath("/");
    return { success: true, message: "Job deleted successfully." };
  } catch (error) {
    console.log("Error in deleting the job: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function editJobAction(jobId, updatedDetails) {
  try {
    const result = jobSchema.safeParse(updatedDetails);
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
    await prisma.jobs.update({
      where: { id: jobId },
      data: {
        jobTitle: updatedDetails.jobTitle,
        companyName: updatedDetails.companyName,
        location: updatedDetails.location,
        salary: updatedDetails.salary,
        minExperience: updatedDetails.minExperience,
        jobType: updatedDetails.jobType,
        jobDescription: updatedDetails.jobDescription,
        skills: updatedDetails.skills,
      },
    });
    revalidatePath("/");
    return { success: true, message: "Job details updated successfully." };
  } catch (error) {
    console.log("Error in updating the job: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function getAllJobsForSeekersAction() {
  try {
    const jobs = await prisma.jobs.findMany();
    return { success: true, message: "Jobs fetched successfully.", jobs };
  } catch (error) {
    console.log("Error in fetching the jobs: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}

export async function getJobDetailsById(jobId) {
  try {
    const job = await prisma.jobs.findUnique({
      where: { id: jobId },
    });
    return { success: true, message: "Job details fetched successfully.", job };
  } catch (error) {
    console.log("Error in fetching the job: ", error);
    return {
      success: false,
      error: "Something went wrong, Please try again later.",
    };
  }
}
