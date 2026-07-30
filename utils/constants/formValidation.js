import {object, string, number} from "yup"

export const userSchema = object({
    firstName: string().strict().required("First Name is required"),
    lastName: string().required(),
    email: string().email().required(),
    phoneNumber: string().required()
})