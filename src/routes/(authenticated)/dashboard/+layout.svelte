<script lang="ts">
  import { browser } from '$app/environment'
  import { resolve } from '$app/paths'
  import { page } from '$app/state'

  import { Header, ProfileDropdown, ThemeSwitch, TopNav, Search } from '$lib/components/layout'
  import { Button } from '$lib/components/ui/button/index.js'

  import { appStore } from '$lib/stores/app.store'

  let { children } = $props()

  // 在服务端无法存储，只能在layout进行同步
  if (page.data?.token) {
    appStore.update(state => ({
      ...state,
      loggedIn: page.data?.loggedIn,
      token: page.data?.token,
    }))
  }

  const topNav = [
    {
      title: 'Overview',
      href: '/dashboard/overview',
      isActive: true,
      disabled: false,
    },
    {
      title: 'Customers',
      href: '/dashboard/customers',
      isActive: false,
      disabled: false,
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      isActive: false,
      disabled: false,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      isActive: false,
      disabled: false,
    },
  ]
</script>

<svelte:head>
  <title>管理系统</title>
</svelte:head>
{#if browser}
  <Header>
    <TopNav links={topNav} />
    <div class="ms-auto flex items-center space-x-4">
      <Search />
      <ThemeSwitch />
      <ProfileDropdown />
    </div>
  </Header>
{/if}
<div class="mx-auto max-w-3xl">
  <div class="grid grid-cols-5 gap-4">
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href={resolve('/dashboard/accounts')}> accounts </a>
    </Button>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href={resolve('/dashboard/menus')}> menus </a>
    </Button>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href={resolve('/dashboard/permissions')}> permissions </a>
    </Button>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href={resolve('/dashboard/roles')}> roles </a>
    </Button>
    <Button variant="link" class="text-muted-foreground" size="sm">
      <a href={resolve('/dashboard/articles')}> articles </a>
    </Button>
  </div>
</div>

{@render children()}
