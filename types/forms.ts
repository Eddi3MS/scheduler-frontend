import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres.'),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
})

export type RegisterSchema = z.infer<typeof registerSchema>

// --- Provider Form Schema ---
export const providerSchema = z.object({
  workingHours: z.array(
    z.object({
      start: z.string().min(1, 'Hora de início obrigatória'),
      end: z.string().min(1, 'Hora de fim obrigatória'),
    })
  ),
  closedDates: z
    .array(
      z.string().min(1, 'Data obrigatória') // pode ser refinado para validar ISO ou yyyy-mm-dd
    )
    .optional(),
  weeklyClosedDays: z
    .array(
      z
        .number({
          required_error: 'Dia da semana é obrigatório',
          invalid_type_error: 'Dia da semana deve ser um número',
        })
        .min(0, 'Dia inválido')
        .max(6, 'Dia inválido')
    )
    .optional(),
})

export type ProviderSchema = z.infer<typeof providerSchema>

export const serviceSchema = z.object({
  providerId: z.string().min(1, 'Selecione um profissional'),
  name: z.string().min(2, 'Nome do serviço é obrigatório'),
  price: z.string().min(1, 'Preço obrigatório'),
  duration: z.string().min(1, 'Duração obrigatória'),
})

export type ServiceSchema = z.infer<typeof serviceSchema>

export const fixedClosedDaysSchema = z.object({
  day: z.enum(['0', '1', '2', '3', '4', '5', '6'], {
    required_error: 'Selecione um dia da semana.',
  }),
})

export type FixedClosedDaysSchema = z.infer<typeof fixedClosedDaysSchema>

export const specificClosedDaysSchema = z.object({
  date: z.string().min(1, 'Selecione uma data.'),
})

export type SpecificClosedDaysSchema = z.infer<typeof specificClosedDaysSchema>
