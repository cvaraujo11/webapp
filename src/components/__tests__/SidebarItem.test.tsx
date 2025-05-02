// SidebarItem.test.tsx
import { render, screen } from '@testing-library/react'
import SidebarItem from '../SidebarItem'

describe('SidebarItem', () => {
  it('renderiza o SidebarItem com label e link', () => {
    render(<SidebarItem href="/teste" label="Item Teste" />)
    const link = screen.getByRole('link', { name: /item teste/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/teste')
  })

  it('aplica classe de ativo quando active=true', () => {
    render(<SidebarItem href="/teste" label="Ativo" active={true} />)
    const link = screen.getByRole('link', { name: /ativo/i })
    expect(link.className).toMatch(/font-bold/)
  })
})