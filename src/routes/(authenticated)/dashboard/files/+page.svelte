<script lang="ts">
  import { superForm, fileProxy } from 'sveltekit-superforms'
  import { zod4Client } from 'sveltekit-superforms/adapters'

  import * as Form from '$lib/components/ui/form/index.js'
  import { Input } from '$lib/components/ui/input/index.js'

  import { formSchema } from './schema'

  import type { PageData } from './$types'

  const props = $props<{ data: PageData }>()

  const form = superForm(props.data.form, {
    validators: zod4Client(formSchema),
  })

  const { form: params, enhance } = form
  const files = fileProxy(params, 'file')
</script>

<!-- <form method="POST" enctype="multipart/form-data" use:enhance>
  <Form.Field {form} name="file">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>选择附件</Form.Label>
        <Input type="file" accept="*" bind:files={$files} {...props} />
      {/snippet}
    </Form.Control>
    <Form.Description>请选择附件</Form.Description>
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form> -->
<form method="POST" enctype="multipart/form-data" use:enhance>
  <div>
    <label for="file-input">选择文件:</label>
    <Input id="file-input" name="file" type="file" accept="*" bind:files={$files} required />
  </div>

  {#if $files.length > 0}
    <p>已选择文件: {$files[0].name}</p>
  {/if}

  <button type="submit">上传</button>
</form>
