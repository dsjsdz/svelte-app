<script lang="ts">
  import { toast } from 'svelte-sonner'

  import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '$lib/components/ui/alert-dialog'
  import { Button } from '$lib/components/ui/button'

  let loading = $state<boolean>(false)
  let disabled = $state<boolean>(false)

  let { open, onOpenChange } = $props()

  const handleConfirm = () => {
    toast.success('退出成功，正在跳转...')
  }
</script>

<AlertDialog bind:open>
  <AlertDialogContent>
    <AlertDialogHeader class="text-start">
      <AlertDialogTitle>是否退出登录</AlertDialogTitle>
      <AlertDialogDescription>
        {#snippet child({ props })}
          <div {...props}>确定要退出登录吗?</div>
        {/snippet}
      </AlertDialogDescription>
    </AlertDialogHeader>

    <form method="POST" action="/logout">
      <AlertDialogFooter>
        <AlertDialogCancel disabled={loading} onclick={() => onOpenChange(false)} type="button">取消</AlertDialogCancel>
        <Button onclick={handleConfirm} disabled={disabled || loading} type="submit">
          {#if loading}
            <span class="mr-2 h-4 w-4 animate-spin">⏳</span>
          {/if}
          确认
        </Button>
      </AlertDialogFooter>
    </form>
  </AlertDialogContent>
</AlertDialog>
