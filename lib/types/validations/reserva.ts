import { z } from "zod";

export const reservaSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo."),

  telefone: z
    .string()
    .min(15, "Informe um telefone válido."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido."),

  cpf: z
    .string()
    .min(14, "Informe um CPF válido."),

  observacoes: z
    .string()
    .max(500, "Máximo de 500 caracteres.")
    .optional(),
});

export type ReservaFormData = z.infer<typeof reservaSchema>;