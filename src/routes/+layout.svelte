<script lang="ts">
  import { Toaster } from 'svelte-sonner'

  import './layout.css'
  import favicon from '$lib/assets/favicon.svg'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>首 页</title>
</svelte:head>

<Toaster position="top-center" richColors />
{@render children()}
