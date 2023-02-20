import { z } from 'zod';

const productSchema = z
  .object({
    id: z.string().default(() => new Date().toISOString() + Math.random()),
    name: z
      .string()
      .min(3, {
        message: 'O nome do produto deve ter pelo menos 3 caractere',
      })
      .max(20, {
        message: 'O nome do produto deve ter no máximo 20 caractere',
      }),
    price: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, {
        message: 'O preço deve ser um número com até duas casas decimais',
      })
      .transform((value) => Number(value)),
    description: z.string().min(10, {
      message: 'A descrição do produto deve ter pelo menos 10 caractere',
    }),
    image: z.string().url({
      message: 'A imagem do produto deve ser uma URL válida',
    }),
    category: z
      .enum(['bebidas', 'carnes', 'pizzas', 'lanches', 'sobremesas', 'outros'])
      .default('outros'),
    measure: z
      .string()
      .min(1, {
        message: 'A medida do produto deve ter pelo menos 1 caractere',
      })
      .max(10, {
        message: 'A medida do produto deve ter no máximo 10 caractere',
      }),
    promotion: z.number().default(0),
    oldPrice: z.number().default(0),
  })
  .required();

export { productSchema };
