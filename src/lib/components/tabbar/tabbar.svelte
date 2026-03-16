<script lang="ts">
  import House from '@lucide/svelte/icons/house'
  import MessageCircleMore from '@lucide/svelte/icons/message-circle-more'
  import Plus from '@lucide/svelte/icons/plus'
  import Search from '@lucide/svelte/icons/search'
  import User from '@lucide/svelte/icons/user'

  import { resolve } from '$app/paths'
  import { page } from '$app/state'

  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js'

  import type { API } from '$lib/types'
  import { cn } from '$lib/utils'

  type TabbarProps = {
    fixed?: boolean
    class?: string
  }

  const { class: className = '', fixed = true, ...restProps }: TabbarProps = $props()

  const links: API.TabbarLink[] = [
    {
      title: '首页',
      href: '/dashboard' as const,
      icon: House,
    },
    {
      title: '设备',
      href: '/dashboard/roles' as const,
      icon: Search,
    },
    {
      href: '/dashboard/menus' as const,
      icon: Plus,
    },
    {
      title: '消息',
      href: '/dashboard/articles' as const,
      icon: MessageCircleMore,
    },
    {
      title: '我的',
      href: '/dashboard/profile' as const,
      icon: User,
    },
  ]

  const isMobile = $derived.by(() => new IsMobile().current ?? false)

  const currentPath = $derived(page.url.pathname)

  const activeLinks = $derived(
    links.map(link => ({
      ...link,
      isActive: currentPath === link.href,
    }))
  )
</script>

{#if isMobile}
  <div
    {...restProps}
    class={cn(
      'shadow-t flex h-14 w-full items-center justify-around border-t bg-background dark:border-gray-800 dark:bg-gray-950',
      fixed && 'fixed right-0 bottom-0 left-0 z-50 pb-[env(safe-area-inset-bottom)]',
      className
    )}
  >
    {#each activeLinks as { title, href, icon: Icon, isActive }, i (href)}
      {#if i == 2}
        <a
          href={resolve(href)}
          data-active={isActive}
          class="flex items-center justify-center rounded-md bg-gray-950/20 dark:bg-gray-400 px-5 py-2 text-muted-foreground data-[active=true]:text-white dark:text-gray-700 shadow-lg hover:bg-red-500 data-[active=true]:bg-red-500 dark:data-[active=true]:bg-gray-50"
        >
          <Icon />
        </a>
      {:else}
        <a
          href={resolve(href)}
          data-active={isActive}
          class="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-red-500 data-[active=true]:text-red-500 dark:text-gray-400 dark:data-[active=true]:text-gray-50"
        >
          <Icon />
          <span class="text-xs font-medium">{title}</span>
        </a>
      {/if}
    {/each}
  </div>
{/if}
