<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  middleware: 'guest',
})

const { fetch } = useUserSession()

const route = useRoute()
const redirectedFrom =
  route.redirectedFrom?.fullPath || route.query.redirectedFrom?.toString()

const fields: AuthFormField[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    defaultValue: 'user01@gmail.com',
    placeholder: 'Enter your email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    defaultValue: '12345678',
    placeholder: 'Enter your password',
    required: true,
  },
  {
    name: 'remember',
    label: 'Remember me',
    type: 'checkbox',
  },
]

const schema = z.object({
  email: z.email('Invalid email'),
  password: z
    .string('Password is required')
    .min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const toast = useToast()

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  await $fetch('/api/login', {
    method: 'POST',
    body: {
      email: payload.data.email,
      password: payload.data.password,
    },
  })
    .then(async () => {
      await fetch()
      toast.add({
        title: 'Success',
        description: 'The form has been submitted.',
        color: 'success',
      })

      navigateTo(redirectedFrom)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="mt-10 flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        title="Welcome back!"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          Don't have an account?
          <ULink to="#" class="font-medium text-primary">Sign up</ULink>
          .
        </template>
        <template #password-hint>
          <ULink to="#" class="font-medium text-primary" tabindex="-1">
            Forgot password?
          </ULink>
        </template>
        <!-- <template #validation>
          <UAlert
            color="error"
            icon="i-lucide-info"
            title="Error signing in"
            description="123"
          />
        </template> -->
        <template #footer>
          By signing in, you agree to our
          <ULink to="#" class="font-medium text-primary">
            Terms of Service
          </ULink>
          .
        </template>
      </UAuthForm>
    </UPageCard>
  </div>
</template>
