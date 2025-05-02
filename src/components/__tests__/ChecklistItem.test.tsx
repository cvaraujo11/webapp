// ChecklistItem.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import ChecklistItem from '../ChecklistItem'

describe('ChecklistItem', () => {
  it('renderiza o ChecklistItem com label', () => {
    render(<ChecklistItem label="Tarefa 1" />)
    expect(screen.getByLabelText(/tarefa 1/i)).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('altera o estado ao clicar no checkbox', () => {
    render(<ChecklistItem label="Tarefa 2" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })
})