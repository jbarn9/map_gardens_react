import { z } from 'zod';

export const gardenSchema = z.object({
  name: z.string()
    .min(3, 'Le nom doit contenir au moins 3 caractères')
    .max(50, 'Le nom ne doit pas dépasser 50 caractères'),
  description: z.string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(500, 'La description ne doit pas dépasser 500 caractères'),
  type: z.enum(['private', 'familyGarden', 'sharedGarden', 'insertionGarden', 'otherCategory'], {
    errorMap: () => ({ message: 'Le type choisi n\'est pas valide' })
  }),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email invalide'),
  phone: z.string()
    .regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Numéro de téléphone invalide'),
  president: z.string()
    .min(2, 'Le nom du président doit contenir au moins 2 caractères'),
  trainer: z.string()
    .min(2, 'Le nom du formateur doit contenir au moins 2 caractères'),
  founded_At: z.date({
    required_error: "La date de création est requise",
  }),
  networksId: z.string().optional(),
  adresseId: z.string().optional(),
  gardenCategoryId: z.string().optional(),
}); 