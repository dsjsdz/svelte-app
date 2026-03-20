<script lang="ts">
  import LoaderIcon from '@lucide/svelte/icons/loader'

  import { cn } from '$lib/utils.js'

  import type { ComponentProps } from 'svelte'

  type Props = ComponentProps<typeof LoaderIcon> & {
    title?: string
  }

  let { class: className, title = '正在请求...', ...restProps }: Props = $props()
</script>

<div class="flex flex-col items-center justify-center space-y-1.5">
  <LoaderIcon role="status" aria-label="Loading" class={cn('size-4 animate-spin', className)} {...restProps} />
  <span class="text-sm">{title}</span>
</div>
