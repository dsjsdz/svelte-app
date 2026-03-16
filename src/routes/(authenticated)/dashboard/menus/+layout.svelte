<script lang="ts">
  import { Main } from '$lib/components/layout'

  let { children } = $props()
</script>

<svelte:head>
  <title>菜单管理</title>
</svelte:head>

<Main>
  {@render children()}
</Main>
