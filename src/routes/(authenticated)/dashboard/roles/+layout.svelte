<script lang="ts">
  import { Main } from '$lib/components/layout'

  let { children } = $props()
</script>

<svelte:head>
  <title>角色管理</title>
</svelte:head>

<Main>
  {@render children()}
</Main>
