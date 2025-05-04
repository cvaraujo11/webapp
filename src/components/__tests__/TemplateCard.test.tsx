import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import TemplateCard from '../TemplateCard';

describe('TemplateCard', () => {
  const defaultProps = {
    title: 'Modelo de Ofício',
    format: 'docx' as const,
    description: 'Template para criação de ofícios',
    filename: 'oficio.docx',
  };

  it('renderiza corretamente com props padrão', () => {
    render(<TemplateCard {...defaultProps} />);
    
    expect(screen.getByText('Modelo de Ofício')).toBeInTheDocument();
    expect(screen.getByText('Template para criação de ofícios')).toBeInTheDocument();
    expect(screen.getByText('DOCX')).toBeInTheDocument();
  });

  it('renderiza corretamente com formato xlsx', () => {
    render(
      <TemplateCard
        {...defaultProps}
        title="Planilha de Orçamento"
        format="xlsx"
        filename="orcamento.xlsx"
      />
    );
    
    expect(screen.getByText('Planilha de Orçamento')).toBeInTheDocument();
    expect(screen.getByText('XLSX')).toBeInTheDocument();
  });

  it('renderiza corretamente com formato odt', () => {
    render(
      <TemplateCard
        {...defaultProps}
        title="Declaração Modelo"
        format="odt"
        filename="declaracao.odt"
      />
    );
    
    expect(screen.getByText('Declaração Modelo')).toBeInTheDocument();
    expect(screen.getByText('ODT')).toBeInTheDocument();
  });

  it('renderiza o botão de download com props corretas', () => {
    render(<TemplateCard {...defaultProps} />);
    
    const downloadButton = screen.getByRole('link', { name: /baixar template/i });
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', '/templates/oficio.docx');
    expect(downloadButton).toHaveAttribute('download');
  });

  it('mantém acessibilidade com roles e labels apropriados', () => {
    render(<TemplateCard {...defaultProps} />);
    
    // Verifica se o card tem role="article"
    expect(screen.getByRole('article')).toBeInTheDocument();
    
    // Verifica se o título está associado ao article via aria-labelledby
    const article = screen.getByRole('article');
    const titleId = article.getAttribute('aria-labelledby');
    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId!)).toHaveTextContent('Modelo de Ofício');
    
    // Verifica se o formato tem um aria-label descritivo
    const formatBadge = screen.getByText('DOCX');
    expect(formatBadge).toHaveAccessibleName(/formato: documento word/i);
  });
});