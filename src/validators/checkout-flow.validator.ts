import { z } from 'zod'

export const step1Schema = z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(1).max(255),
    type: z.string().min(1).max(255),
    email: z.string().email().max(255),
    phone: z.string().min(1).max(11),
    president: z.string().min(1).max(255),
});

export const step2Schema = z.object({
    address: z.string().min(1).max(255),
    zipCode: z.string().min(1).max(11),
    city: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
});

export const CombinedCheckoutSchema= step1Schema
  .merge(step1Schema)
  .merge(step2Schema)

export type CombinedCheckoutType = z.infer<typeof CombinedCheckoutSchema>


