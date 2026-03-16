<script lang="ts">
  import ChevronLeft from '@lucide/svelte/icons/chevron-left'

  import { goto } from '$app/navigation'
  import { resolve } from '$app/paths'

  import { Main } from '$lib/components/layout'
  import { Navbar } from '$lib/components/navbar'

  let { children } = $props()

  const onBackClick = () => {
    goto(resolve('/dashboard'))
  }
</script>

<svelte:head>
  <title>文章管理</title>
</svelte:head>

<Navbar {onBackClick}>
  {#snippet title()}
    <span>首 页</span>
  {/snippet}
  {#snippet left()}
    <ChevronLeft />
  {/snippet}
</Navbar>

<Main>
  {@render children()}
</Main>
