import z from "zod"

export const userSchema = z.object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.email(),
    phoneNumber: z.string().length(11,"Phone number must be 11 digits"),
    costOfKey: z.number().nonnegative().nonoptional(),
})