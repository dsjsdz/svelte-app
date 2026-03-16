<script lang="ts">
  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js'

  import type { Snippet } from 'svelte'

  const isMobile = $derived.by(() => new IsMobile().current)

  type NavbarProps = {
    fixed?: boolean
    title: Snippet
    left?: Snippet | null
    right?: Snippet | null
    onBackClick?: () => void
  }

  const {
    title: Title,
    left: Left,
    right: Right,
    fixed = false,
    onBackClick = () => {},
    ...restProps
  }: NavbarProps = $props()
</script>

{#if isMobile}
  <div
    {...restProps}
    class="relative z-50 flex h-12 w-full items-center border-b bg-white p-2 dark:bg-gray-950"
    class:fixed
    class:top-0={fixed}
    class:right-0={fixed}
  >
    {#if Left}
      <button
        class="flex touch-manipulation items-center gap-1 rounded-md p-3 transition
               duration-150
               active:scale-95 active:bg-gray-200
               dark:active:bg-gray-800"
        onclick={onBackClick}
      >
        {@render Left()}
      </button>
    {/if}
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center font-bold">
      {@render Title()}
    </div>
    <div class="ml-auto flex items-center gap-2">
      {#if Right}
        {@render Right()}
      {/if}
    </div>
  </div>
{/if}
