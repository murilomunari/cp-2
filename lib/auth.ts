import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

const cookieName = 'cp2_session'
function secret() { return process.env.SESSION_SECRET || '' }
export function sessionCookieName() { return cookieName }
export function makeSession() {
  if (!secret()) throw new Error('SESSION_SECRET não configurado')
  const expiry = String(Date.now() + 24 * 60 * 60 * 1000)
  const signature = createHmac('sha256', secret()).update(expiry).digest('hex')
  return `${expiry}.${signature}`
}
export async function isAuthenticated() {
  if (!secret()) return false
  const value = (await cookies()).get(cookieName)?.value
  if (!value) return false
  const [expiry, signature] = value.split('.')
  if (!expiry || !signature || !/^\d+$/.test(expiry) || Number(expiry) < Date.now()) return false
  const expected = createHmac('sha256', secret()).update(expiry).digest('hex')
  if (signature.length !== expected.length) return false
  return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
}
