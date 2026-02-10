import { fail, isRedirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

import graffle from '$lib/graphql-client'

import { formSchema } from './schema'

import type { Actions, PageServerLoad } from './$types.js'

import { UploadFileDocument } from '@/generated/graphql.js'

export const load: PageServerLoad = async () => {
  return {
    form: await superValidate(zod4(formSchema)),
  }
}

export const actions: Actions = {
  default: async event => {
    const form = await superValidate(event, zod4(formSchema))
    if (!form.valid) {
      return fail(400, { form })
    }

    try {
      const files = form.data.file as unknown as File[]
      if (!files || files.length === 0) {
        return fail(400, { form: {
          ...form,
          data: {
            ...form.data,
            file: undefined, // 或者返回 file.name 等信息
          },
        }, error: '请选择文件' })
      }

      const file = files[0]

      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', file.name, file.size, file.type)

      const data = await graffle.gql(UploadFileDocument).$send({
        file,
      })

      console.log(data, 'data')

      // ✅ 返回可序列化信息，不返回 File 对象
      return {
        form: {
          ...form,
          data: {
            ...form.data,
            file: undefined, // 或者返回 file.name 等信息
          },
        },
        success: `文件上传成功: ${file.name}`,
      }
    } catch (err: any) {
      // Redirect { status: 303, location: '/dashboard' }
      if (isRedirect(err)) throw err

      const message = err?.errors?.[0]?.message || err?.cause?.message || err?.message || '未知错误'

      return fail(500, {
        form,
        error: message,
      })
    }
  },
}
