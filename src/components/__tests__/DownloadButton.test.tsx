// DownloadButton.test.tsx
import { render, screen } from '@testing-library/react'
import DownloadButton from '../DownloadButton'

describe('DownloadButton', () => {
  it('renderiza o botão de download com label e href correto', () => {
    render(<DownloadButton fileName="arquivo.pdf" label="Baixar PDF" />)
    const link = screen.getByRole('link', { name: /baixar pdf/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/templates/arquivo.pdf')
    expect(link).toHaveAttribute('download')
  })
})