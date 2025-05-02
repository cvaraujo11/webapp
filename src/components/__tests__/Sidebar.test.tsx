// Sidebar.test.tsx
import { render, screen } from '@testing-library/react'
import Sidebar from '../Sidebar'

describe('Sidebar', () => {
  it('renderiza o Sidebar', () => {
    render(<Sidebar isOpen={true} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('possui elementos acessíveis', () => {
    render(<Sidebar isOpen={true} />)
    expect(screen.getByRole('navigation')).toBeTruthy()
    // Adicione verificações de labels/contraste conforme necessário
  })
})