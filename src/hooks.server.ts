// src/hooks.server.ts
import { redirect, type Handle } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

export const handle: Handle = sequence(
  // 1. 打印请求时长
  async ({ event, resolve }) => {
    const start = Date.now()
    console.log(`→ ${event.request.method} ${event.url.pathname}`)

    const response = await resolve(event)

    console.log(`← ${event.request.method} ${event.url.pathname} ` + `${response.status} in ${Date.now() - start}ms`)

    return response
  },

  // 2. 设置请求头部信息
  async ({ event, resolve }) => {
    const response = await resolve(event)

    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')

    return response
  },

  // 3. 应用场景： 身份验证
  async ({ event, resolve }) => {
    // 尝试从 cookies 中获取 auth_token 字段值
    const token = event.cookies.get('auth_token')
    if (token) {
      console.log(token, 'hooks.server')
    }

    // ✅ 受保护路由列表
    const protectedRoutes = ['/dashboard']
    const isProtected = protectedRoutes.some(path => event.url.pathname.startsWith(path))

    // ✅ 未登录访问受保护页面 → 跳转
    if (!token && isProtected) {
      throw redirect(302, `/signin?redirectTo=${event.url.pathname}`)
    }

    return resolve(event)
  },

  // 4. Last — actually render the page / call the endpoint
  async ({ event, resolve }) => {
    // You can also short-circuit requests here
    // if (event.url.pathname.startsWith('/admin') && !event.locals.user?.role?.includes('admin')) {
    //   return new Response('Forbidden', { status: 403 })
    // }

    return resolve(event)
  }
)
