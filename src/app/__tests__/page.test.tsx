// page.test.tsx
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home (page.tsx)', () => {
  it('renderiza título, descrição e link principal', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /bem-vindo/i })).toBeInTheDocument()
    expect(screen.getByText(/seu guia para editais/i)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /acessar módulo 1/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/modulo/ferramentas')
  })
})