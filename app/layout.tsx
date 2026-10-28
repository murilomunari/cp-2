import type { ReactNode } from 'react'
export const metadata = { title: 'Pokémon TCG - CP2', description: 'Busca de cartas Pokémon' }
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="pt-BR"><body><header><h1>Pokémon TCG</h1></header><main>{children}</main></body></html> }
