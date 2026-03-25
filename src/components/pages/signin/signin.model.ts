import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("E-mail inválido").nonempty("O e-mail é obrigatório"),
  senha: z.string().min(1, "A senha é obrigatória"),
});

export type ISignInData = z.infer<typeof signinSchema>;
