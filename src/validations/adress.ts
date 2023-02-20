import { z } from 'zod';

const adressSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'O nome deve ter pelo menos 3 caractere' }),
    street: z
      .string()
      .min(3, { message: 'A rua deve ter pelo menos 3 caractere' }),
    number: z
      .string()
      .min(1, { message: 'O número deve ter pelo menos 1 caractere' }),
    complement: z
      .string()
      .min(3, { message: 'O complemento deve ter pelo menos 3 caractere' }),
    neighborhood: z
      .string()
      .min(3, { message: 'O bairro deve ter pelo menos 3 caractere' }),
    reference: z.string().min(3, {
      message: 'O ponto de referência deve ter pelo menos 3 caractere',
    }),
    formPayment: z.string().min(3, {
      message: 'A forma de pagamento deve ter pelo menos 3 caractere',
    }),
  })
  .required();

export { adressSchema };
