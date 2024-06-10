import * as z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'The email field is required' })
    .email({ message: 'The email format is not valid' }),
  password: z
    .string()
    .min(1, { message: 'The password field is required' })
    .regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, { message: 'The password must contain at least 8 characters, one upper case letter, one number and one special character' }),
})