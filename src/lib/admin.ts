const PASSWORD_KEY = 'bn-associates:admin-password'
const SESSION_KEY = 'bn-associates:admin-session'

async function hashPassword(password: string) {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Secure password storage is unavailable in this browser.')
  }

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export function hasAccount() {
  return localStorage.getItem(PASSWORD_KEY) !== null
}

export function hasSession() {
  return sessionStorage.getItem(SESSION_KEY) === 'active'
}

export async function register(password: string) {
  if (hasAccount()) throw new Error('An admin password has already been set in this browser.')
  if (password.length < 8) throw new Error('Choose a password with at least 8 characters.')
  localStorage.setItem(PASSWORD_KEY, await hashPassword(password))
}

export async function login(password: string) {
  const savedHash = localStorage.getItem(PASSWORD_KEY)
  if (!savedHash) return false
  const valid = savedHash === (await hashPassword(password))
  if (valid) sessionStorage.setItem(SESSION_KEY, 'active')
  return valid
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY)
}
