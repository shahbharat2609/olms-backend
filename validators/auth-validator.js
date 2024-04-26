import z from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(50, { message: "Name must be less than 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Invalid email address" })
    .max(50, { message: "Name must be less than 50 characters" }),

  phone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  // .max(10, { message: "Phone number must be a maximum of 10 digits" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least 8 characters" })
    .max(255, { message: "Password can't be greater than 32 characters" }),

  address: z
    .string({ required_error: "Company name is required" })
    .trim()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(50, { message: "Company name must be less than 50 characters" }),

  roles: z.string({ required_error: "Role is required" }).trim(),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "Password must be at least 8 characters" })
    .max(255, { message: "Password can't be greater than 32 characters" }),
});

export { signupSchema, loginSchema };
