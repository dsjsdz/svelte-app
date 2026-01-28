// 根目录 /+layout.server.js
import { redirect } from '@sveltejs/kit'

/**
 * 根布局的服务端加载函数（全局路由守卫）
 * @param {Object} event - SvelteKit 事件对象，包含请求、会话、cookies 等信息
 */
export async function load({ locals, cookies, request }) {
  const loggedIn = !!locals.loggedIn

  // 示例2：从 Cookie 中判断
  const token = cookies.get('auth_token')
  if (token) {
    console.log(token)
  }
  // const isLoggedIn = !!authToken && await verifyToken(authToken); // 需实现 verifyToken 函数

  // 访问根页面时的重定向逻辑
  const pathname = new URL(request.url).pathname
  if (pathname === '/') {
    // 仅对根页面做重定向
    if (!loggedIn) {
      // 未登录 → 跳转到登录页（对应 (auth)/signin 路由）
      throw redirect(307, '/signin')
    } else {
      // 已登录 → 跳转到仪表盘（对应 (authenticated)/dashboard 路由）
      throw redirect(307, '/dashboard')
    }
  }

  // 非根页面时，返回空对象即可（不影响其他路由）
  return {}
}
