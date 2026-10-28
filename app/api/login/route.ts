import { NextResponse } from 'next/server'
import { makeSession, sessionCookieName } from '../../../lib/auth'

export async function POST(request: Request) {
  let body: unknown
  try { body = await request.json() } catch { return NextResponse.json({ message: 'Dados inválidos' }, { status: 400 }) }
  const password = typeof body === 'object' && body !== null && 'password' in body ? (body as { password?: unknown }).password : undefined
  if (!process.env.LOGIN_PASSWORD || !process.env.SESSION_SECRET) return NextResponse.json({ message: 'Configure LOGIN_PASSWORD e SESSION_SECRET no servidor' }, { status: 503 })
  if (typeof password !== 'string' || password !== process.env.LOGIN_PASSWORD) return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 })
  const response = NextResponse.json({ ok: true })
  response.cookies.set(sessionCookieName(), makeSession(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 86400 })
  return response
}
