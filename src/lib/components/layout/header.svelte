<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  import { browser } from '$app/environment'

  import { Separator } from '$lib/components/ui/separator'
  import { SidebarTrigger } from '$lib/components/ui/sidebar'

  import { cn } from '$lib/utils'

  export let fixed = false
  export let className = ''

  let offset = 0

  const onScroll = () => {
    if (!browser) return
    offset = window.scrollY
  }

  onMount(() => {
    if (browser) {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
    }
  })

  onDestroy(() => {
    if (browser) {
      window.removeEventListener('scroll', onScroll)
    }
  })
</script>

<header
  class={cn(
    'z-50 h-[calc(4rem+env(safe-area-inset-top))] bg-background pt-[env(safe-area-inset-top)] text-muted-foreground',
    fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
    offset > 10 && fixed ? 'shadow' : 'shadow-none',
    className
  )}
  {...$$restProps}
>
  <div
    class={cn(
      'relative flex h-full items-center gap-3 p-4 sm:gap-4',
      offset > 10 && fixed && 'after:absolute after:inset-0 after:-z-10 after:bg-background/20 after:backdrop-blur-lg'
    )}
  >
    <SidebarTrigger variant="outline" class="max-md:scale-125" />
    <Separator orientation="vertical" class="h-6" />
    <slot />
  </div>
</header>
