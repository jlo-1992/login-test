<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

const { fetch, user, session } = useUserSession()

const schema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters'),
})

const form = useTemplateRef('form')
type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: 'user01@gmail.com',
  password: '12345678',
})

const toast = useToast()

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch('/api/login', {
    method: 'POST',
    body: {
      email: event.data.email,
      password: event.data.password,
    },
  })
    .then(async () => {
      await fetch()
      toast.add({
        title: 'Success',
        description: 'The form has been submitted.',
        color: 'success',
      })
      setTimeout(() => {
        navigateTo('/')
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
      form.value?.setErrors([
        {
          name: 'email',
          message: '帳號或密碼錯誤',
        },
      ])
    })
}
</script>

<template>
  <div class="flex h-150 flex-col items-center justify-center gap-y-3">
    <div>
      {{ user?.role }}
    </div>
    <div>
      {{ session?.token?.accessToken_time }}
    </div>
    <div>
      {{ session?.token?.refreshToken_time }}
    </div>

    <UForm
      ref="form"
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="state.password" type="password" />
      </UFormField>

      <UButton type="submit">Submit</UButton>
    </UForm>
  </div>
</template>
