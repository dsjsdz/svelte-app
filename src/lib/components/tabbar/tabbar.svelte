<script lang="ts">
  import House from '@lucide/svelte/icons/house'
  import MessageCircleMore from '@lucide/svelte/icons/message-circle-more'
  import Search from '@lucide/svelte/icons/search'
  import User from '@lucide/svelte/icons/user'

  import { resolve } from '$app/paths'
  import { page } from '$app/state'

  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js'

  import type { Component } from 'svelte'

  const links: {
    title: string
    href: '/dashboard' | '/dashboard/roles' | '/dashboard/articles' | '/dashboard/profile'
    disabled?: boolean
    icon: Component
  }[] = [
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
    class="shadow-t fixed right-0 bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t bg-white dark:border-gray-800 dark:bg-gray-950"
  >
    {#each activeLinks as { title, href, icon: Icon, isActive } (href)}
      <a
        href={resolve(href)}
        data-active={isActive}
        class="flex flex-col items-center justify-center gap-1 text-gray-500 transition-colors hover:text-red-500 data-[active=true]:text-red-500 dark:text-gray-400 dark:data-[active=true]:text-gray-50"
      >
        <Icon />
        <span class="text-xs font-medium">{title}</span>
      </a>
    {/each}
  </div>
{/if}
