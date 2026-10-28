import { redirect } from 'next/navigation'
import { isAuthenticated } from '../../lib/auth'
import CardExplorer from '../../components/CardExplorer'
export default async function CardsPage() { if (!(await isAuthenticated())) redirect('/'); return <><h2>Buscar cartas</h2><CardExplorer /></> }
