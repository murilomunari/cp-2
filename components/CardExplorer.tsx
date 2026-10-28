'use client'
import { useEffect, useState } from 'react'
import type { PokemonCard } from '../types/card'
const KEY='cp2_favorites'
function readFavorites(): PokemonCard[] { try { const data=JSON.parse(localStorage.getItem(KEY)||'[]'); return Array.isArray(data)?data:[] } catch { return [] } }
export default function CardExplorer() {
 const [query,setQuery]=useState(''); const [cards,setCards]=useState<PokemonCard[]>([]); const [favorites,setFavorites]=useState<PokemonCard[]>([]); const [showFavorites,setShowFavorites]=useState(false); const [error,setError]=useState(''); const [loading,setLoading]=useState(false)
 useEffect(()=>{setFavorites(readFavorites())},[])
 useEffect(()=>{ if(showFavorites)return; const controller=new AbortController(); const timer=setTimeout(async()=>{setLoading(true);setError('');try{const res=await fetch(`/api/cards?q=${encodeURIComponent(query)}`,{signal:controller.signal});const result=await res.json();if(!res.ok)throw new Error(result.message||'Erro ao buscar');setCards(result.data)}catch(e){if(!controller.signal.aborted)setError(e instanceof Error?e.message:'Erro desconhecido')}finally{if(!controller.signal.aborted)setLoading(false)}},300);return()=>{clearTimeout(timer);controller.abort()} },[query,showFavorites])
 function toggle(card:PokemonCard){const next=favorites.some(item=>item.id===card.id)?favorites.filter(item=>item.id!==card.id):[...favorites,card];setFavorites(next);localStorage.setItem(KEY,JSON.stringify(next))}
 async function logout(){localStorage.removeItem(KEY);await fetch('/api/logout',{method:'POST'});window.location.assign('/')}
 const displayed=showFavorites?favorites:cards
 return <><p><button type="button" onClick={()=>setShowFavorites(false)}>Buscar cartas</button> <button type="button" onClick={()=>setShowFavorites(true)}>Favoritos ({favorites.length})</button> <button type="button" onClick={logout}>Logout</button></p>{!showFavorites&&<p><label htmlFor="search">Nome: </label><input id="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Digite o nome" /></p>}{loading&&!showFavorites&&<p>Carregando...</p>}{error&&<p role="alert">{error}</p>}{!loading&&displayed.length===0&&<p>Nenhuma carta encontrada.</p>}<ul>{displayed.map(card=><li key={card.id}><h3>{card.name}</h3>{card.images?.small&&<img src={card.images.small} alt={card.name} width="180" />}<p>Número: {card.nationalPokedexNumbers?.join(', ')||'Não informado'}</p><p>Tipos: {card.types?.join(', ')||'Não informado'}</p><p>HP: {card.hp||'Não informado'}</p><button type="button" onClick={()=>toggle(card)}>{favorites.some(f=>f.id===card.id)?'Remover favorito':'Favoritar'}</button></li>)}</ul></>
}
