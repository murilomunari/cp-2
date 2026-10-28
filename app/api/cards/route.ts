import { NextResponse } from 'next/server'
import { isAuthenticated } from '../../../lib/auth'
export async function GET(request: Request) {
 if (!(await isAuthenticated())) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
 const term = new URL(request.url).searchParams.get('q')?.trim() || ''
 const query = new URLSearchParams({ page:'1', pageSize:'15', orderBy:'name' })
 if (term) query.set('q', `name:${term.replace(/[^\p{L}\p{N} -]/gu,'').trim().replace(/\s+/g,'*')}*`)
 try { const response = await fetch(`https://api.pokemontcg.io/v2/cards?${query}`,{ headers: process.env.POKEMON_TCG_API_KEY ? { 'X-Api-Key': process.env.POKEMON_TCG_API_KEY } : {}, cache:'no-store' }); if (!response.ok) return NextResponse.json({ message:'Erro na API de cartas' },{status:502}); const data=await response.json(); return NextResponse.json({ data: Array.isArray(data.data)?data.data.slice(0,15):[] }) } catch { return NextResponse.json({ message:'Não foi possível consultar as cartas' },{status:502}) }
}
