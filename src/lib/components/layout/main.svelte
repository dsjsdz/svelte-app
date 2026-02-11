<script lang="ts">
  import { cn } from '$lib/utils'

  import type { Component } from 'svelte'

  type LayoutProps = {
    fixed?: boolean
    fluid?: boolean
    className?: string
    children?: Component | null
  }

  const { fixed, fluid, className = '', children = null, ...props } = $props<LayoutProps>()
</script>

<main
  data-layout={fixed ? 'fixed' : 'auto'}
  class={cn(
    'px-4 py-6',
    fixed && 'flex grow flex-col overflow-hidden',
    !fluid && '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
    className
  )}
  {...props}
>
  {@render children()}
</main>
