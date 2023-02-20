import { z } from 'zod';

const userSchema = z
  .object({
    email: z.string().email({
      message: 'Digite um email válido',
    }),
    password: z
      .string()
      .min(6, {
        message: 'A senha deve ter no mínimo 6 caracteres',
      })
      .max(26, {
        message: 'A senha deve ter no máximo 26 caracteres',
      }),
  })
  .required();

export { userSchema };
