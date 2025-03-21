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

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Username is required." })
      .nonempty("Username is required.")
      .min(2, "Username must have 2 or more characters.")
      .max(20, "Username must have atmost 20 characters."),
    email: z
      .string({ required_error: "Email is required." })
      .nonempty("Email is required.")
      .email("Email is not valid."),
    password: z
      .string({ required_error: "Password is required." })
      .nonempty("Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: z
      .string({ required_error: "Confirm password is required." })
      .nonempty("Confirm password is required.")
      .min(6, "Confirm password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password does not match.",
    path: ["confirmPassword"],
  });
