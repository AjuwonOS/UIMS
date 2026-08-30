import z from "zod";

export const userSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.email(),
  numberOfKeys: z
    .number().gt(0, "Number of access keys must be greater than zero")
    .nonnegative("Number of access keys must be greater than zero")
    .nonoptional(),
  costOfKey: z.number().nonnegative().nonoptional(),
});
