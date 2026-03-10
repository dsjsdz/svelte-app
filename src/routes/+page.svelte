<script lang="ts">
  import Autoplay from 'embla-carousel-autoplay'
  import { onMount } from 'svelte'

  import { resolve } from '$app/paths'

  import { Badge } from '$lib/components/ui/badge/index.js'
  import * as Carousel from '$lib/components/ui/carousel/index.js'
  import { Spinner } from '$lib/components/ui/spinner/index.js'

  const plugin = Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true, jump: false })

  const images = [
    'https://picsum.photos/id/1018/700/1280',
    'https://picsum.photos/id/1015/700/1280',
    'https://picsum.photos/id/1016/700/1280',
  ]

  let loading = $state<boolean>(false)
  onMount(() => {
    loading = true
    setTimeout(() => {
      loading = false
    }, 2000)
  })
</script>

<div class={`relative h-screen w-screen overflow-hidden ${loading ? 'flex items-center justify-center' : ''} `}>
  {#if loading}
    <Spinner class="size-8" />
  {:else}
    <Carousel.Root
      plugins={[plugin]}
      opts={{
        align: 'start',
        loop: true,
        containScroll: 'trimSnaps',
        slidesToScroll: 1,
      }}
      onmouseenter={plugin.stop}
      onmouseleave={plugin.reset}
      class="w-full overflow-hidden"
    >
      <Carousel.Content class="">
        {#each images as medium (medium)}
          <Carousel.Item class="ps-0">
            <img src={medium} alt="" class="h-screen w-full object-cover" />
          </Carousel.Item>
        {/each}
      </Carousel.Content>
      <Carousel.Previous />
      <Carousel.Next />
    </Carousel.Root>
    <div class="pointer-events-none absolute inset-0">
      <Badge class="pointer-events-auto absolute top-safe right-2" variant="secondary">广 告</Badge>
      <div
        class="pointer-events-auto absolute right-4 bottom-4 left-4 mx-auto mt-6 flex items-center justify-center gap-4"
      >
        <a
          href={resolve('/signin')}
          class="rounded-full bg-gray-800 px-7 py-2.5 text-white transition-all hover:bg-black active:scale-95"
        >
          前往登录
        </a>
        <a
          href={resolve('/')}
          class="rounded-full border border-gray-300 bg-white px-7 py-2.5 text-gray-800 transition-all active:scale-95"
        >
          联系客服
        </a>
      </div>
    </div>
  {/if}
</div>
