<script lang="ts">
  import { cn } from '$lib/utils'

  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js'

  import type { Component } from 'svelte'
  import type { HTMLAttributes } from 'svelte/elements'

  type LayoutProps = HTMLAttributes<HTMLElement> & {
    fixed?: boolean
    fluid?: boolean
    className?: string
    children?: Component | null
  }

  // https://svelte.dev/docs/svelte/$props#Type-safety
  const { fixed = false, fluid = false, className = '', children, ...rest }: LayoutProps = $props()

  const isMobile = $derived.by(() => new IsMobile().current ?? fixed)
</script>

<main
  data-layout={isMobile ? 'fixed' : 'auto'}
  class={cn(
    'px-4 py-6',
    isMobile && 'flex grow flex-col',
    isMobile ? 'overflow-y-scroll' : 'overflow-hidden',
    !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
    className
  )}
  {...rest}
>
  {#if children}
    {@render children()}
  {/if}
</main>
