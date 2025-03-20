import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .nonempty("Email is required.")
    .email("Please enter a valid email."),
  password: z
    .string({ required_error: "Password is required." })
    .nonempty("Password is required.")
    .min(6, "Password should have at least 6 characters."),
});
