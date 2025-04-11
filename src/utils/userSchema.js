import { z } from "zod";

export const userOtherDetailsSchema = z.object({
  currentLocation: z.string().min(1, "Current location is required"),
  experienceLevel: z.enum(["Fresher", "Experienced"]),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  country: z.string().min(1, "Country is required"),
  resume: z.string().url("Invalid resume URL"),
  keySkills: z
    .array(z.string().min(1, "Skill cannot be empty"))
    .min(1, "At least one skill required"),
  profileSummary: z.string().min(10, "Profile summary is too short"),
  linkedIn: z.string().url("Invalid LinkedIn URL"),
  github: z.string().url("Invalid GitHub URL"),
  preferredLocation: z.string(),
  gender: z.enum(["Male", "Female", "Other"]),
  dob: z.date(),
  permanentAddress: z.string().min(5, "Address too short"),
  languageSpoken: z
    .array(z.string().min(1, "Language cannot be empty"))
    .min(1, "At least one language required"),
});

export const basicInfoSchema = userOtherDetailsSchema.pick({
  currentLocation: true,
  experienceLevel: true,
  country: true,
  preferredLocation: true,
  phone: true,
});

export const profileSummarySchema = userOtherDetailsSchema.pick({
  // resume: true,
  profileSummary: true,
  keySkills: true,
});

export const personalDetailsSchema = userOtherDetailsSchema.pick({
  dob: true,
  gender: true,
  permanentAddress: true,
  languageSpoken: true,
});

export const linksSchema = userOtherDetailsSchema.pick({
  linkedIn: true,
  github: true,
});
