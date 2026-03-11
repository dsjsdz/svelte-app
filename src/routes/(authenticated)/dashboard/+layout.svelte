<script lang="ts">
  import { ConfigDrawer } from '$lib/components/config-drawer'
  import {
    AuthenticatedLayout,
    LocaleSwitch,
    Header,
    ProfileDropdown,
    ThemeSwitch,
    TopNav,
    Search,
  } from '$lib/components/layout'
  import { TabBar } from '$lib/components/tabbar'

  let { children } = $props()

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

<AuthenticatedLayout>
  <Header>
    <TopNav links={topNav} />
    <div class="ms-auto flex items-center space-x-4">
      <Search />
      <LocaleSwitch />
      <ThemeSwitch />
      <ProfileDropdown />
      <ConfigDrawer />
    </div>
  </Header>
  {@render children()}

  <!-- 底部菜单导航 仅有移动端显示 -->
  <TabBar />
  <!-- 显示结束 -->
</AuthenticatedLayout>
