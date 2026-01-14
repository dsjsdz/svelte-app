// import { goto } from '$app/navigation'; // SvelteKit 跳转
// import { appid } from '$lib/config'; // 你的售卖机 appid
// import { handleServerError } from '$lib/utils/handle-server-error'; // 你的优化版，无 Axios
// import { useAuthStore } from '$stores/auth-store'; // 你的 Pinia/Zustand store
// import { GraphQLClient } from 'graphql-request';
// import toast from 'react-hot-toast'; // 或 svelte-sonner（移动友好）

// const client = new GraphQLClient(import.meta.env.VITE_API_URL!, {
//   headers: () => {
//     const token = useAuthStore.getState().token
//     return {
//       Authorization: token ? `Bearer ${token}` : '',
//       'X-App-ID': appid,
//       'Content-Type': 'application/json',
//     }
//   },
//   // 错误处理（优化你的版本：GraphQL errors + HTTP status）
//   errorHandler: (error: unknown) => {
//     console.error('GraphQL Error:', error)
//     if (error instanceof Error && 'response' in error) {
//       const gqlError = error as any
//       // GraphQL errors（你的 errors[0].message）
//       if (gqlError?.response?.errors?.length) {
//         toast.error(gqlError.response.errors[0].message || 'GraphQL 查询失败')
//         return
//       }
//       // HTTP 401/403（设备权限/登录）
//       if (gqlError.response?.status === 401 || gqlError.response?.status === 403) {
//         toast.error('权限不足或登录过期')
//         useAuthStore.getState().toDestroy() // 你的 logout
//         goto('/signin')
//         return
//       }
//       if (gqlError.response?.status === 500) {
//         toast.error('服务器内部错误')
//         goto('/500')
//       }
//     }
//     handleServerError(error) // 你的通用 fallback
//   },
// })

// export { client };
