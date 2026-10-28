'use client'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
export default function LoginForm() {
 const [password,setPassword] = useState(''); const [error,setError] = useState(''); const [busy,setBusy] = useState(false); const router=useRouter()
 async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setBusy(true); setError(''); try { const res=await fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password})}); const data=await res.json(); if(!res.ok) { setError(data.message || 'Erro no login'); return } router.replace('/cards'); router.refresh() } catch { setError('Não foi possível entrar') } finally { setBusy(false) } }
 return <form onSubmit={submit}><label htmlFor="password">Senha: </label><input id="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required /> <button type="submit" disabled={busy}>{busy?'Entrando...':'Entrar'}</button>{error && <p role="alert">{error}</p>}</form>
}
