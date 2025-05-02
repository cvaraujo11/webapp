// modulo/[slug]/page.test.tsx
import { render, screen } from '@testing-library/react'
import ModulePage from '../page'

describe('ModulePage (modulo/[slug]/page.tsx)', () => {
  it('renderiza título do módulo e seções para slug válido', () => {
    render(<ModulePage params={{ slug: 'ferramentas' }} />)
    expect(screen.getByRole('heading', { name: /ferramentas essenciais/i })).toBeInTheDocument()
    expect(screen.getByText(/introdução/i)).toBeInTheDocument()
  })

  it('exibe mensagem de erro para slug inválido', () => {
    render(<ModulePage params={{ slug: 'inexistente' }} />)
    expect(screen.getByText(/conteúdo do módulo "inexistente" não encontrado/i)).toBeInTheDocument()
  })
})