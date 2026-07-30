import z from "zod"

export const userSchema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.email(),
    phoneNumber: z.string().nonempty("Phone number is required"),
    costOfKey: z.number().nonnegative().nonoptional(),
})