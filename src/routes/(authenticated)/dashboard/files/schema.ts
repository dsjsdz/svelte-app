import { z } from 'zod'

export const formSchema = z.object({
  file: z.instanceof(File, { message: '请选择文件' }),
})

export type FormSchema = z.infer<typeof formSchema>
