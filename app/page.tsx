import { redirect } from 'next/navigation'
import { isAuthenticated } from '../lib/auth'
import LoginForm from '../components/LoginForm'
export default async function Home() { if (await isAuthenticated()) redirect('/cards'); return <><h2>Login</h2><LoginForm /></> }
