import { z } from "zod";

export const jobSchema = z.object({
  jobTitle: z.string().nonempty("Job title is required."),
  companyName: z.string().nonempty("Company name is required."),
  location: z.string().nonempty("Location is required."),
  salary: z.string().nonempty("Salary is required."),
  minExperience: z
    .number({
      required_error: "Minimum experience is required.",
      invalid_type_error: "Experience must be a number.",
    })
    .int("Experience must be an integer.")
    .positive("Experience must be greater than 0."),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP"]),
  jobDescription: z
    .string()
    .nonempty("Job description is required.")
    .min(10, "Job description should be at least 10 characters long."),
  skills: z.array(z.string()).min(1, "At least one skill is required."),
});
