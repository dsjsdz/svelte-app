// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { API } from '$lib/types/api'

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      loggedIn: boolean
      token: string | null
      profile: API.Profile | null
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
