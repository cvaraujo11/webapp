import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormatGuide from '../FormatGuide';

// Mock do componente BeforeAfterExample
jest.mock('../BeforeAfterExample', () => {
  return function MockBeforeAfterExample({ examples, title }: any) {
    return <div data-testid="before-after-example">{title}</div>;
  };
});

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('FormatGuide', () => {
  const baseTextExample = {
    title: 'Formatação de Parágrafos',
    description: 'Use espaçamento adequado entre parágrafos para melhorar a legibilidade.',
  };

  const imageExample = {
    title: 'Redimensionamento de Imagens',
    description: 'Mantenha as proporções originais ao redimensionar.',
    image: '/example-image.jpg',
  };

  const beforeAfterExample = {
    title: 'Estrutura de Texto',
    description: 'Texto sem estrutura||Texto bem estruturado||Melhorou a organização e legibilidade',
  };

  it('renderiza corretamente para tipo texto', () => {
    render(<FormatGuide type="texto" examples={[baseTextExample]} />);
    
    expect(screen.getByText('Guia de Formatação de Texto')).toBeInTheDocument();
    expect(screen.getByText(baseTextExample.title)).toBeInTheDocument();
    expect(screen.getByText(baseTextExample.description)).toBeInTheDocument();
  });

  it('renderiza corretamente para tipo imagem', () => {
    render(<FormatGuide type="imagem" examples={[imageExample]} />);
    
    expect(screen.getByText('Guia de Formatação de Imagens')).toBeInTheDocument();
    expect(screen.getByText(imageExample.title)).toBeInTheDocument();
    expect(screen.getByText(imageExample.description)).toBeInTheDocument();
    expect(screen.getByAltText(`Ilustração para ${imageExample.title}`)).toBeInTheDocument();
  });

  it('utiliza BeforeAfterExample quando há exemplos com formato antes/depois', () => {
    render(<FormatGuide type="texto" examples={[beforeAfterExample]} />);
    
    const beforeAfterComponent = screen.getByTestId('before-after-example');
    expect(beforeAfterComponent).toBeInTheDocument();
    expect(beforeAfterComponent).toHaveTextContent('Exemplos de Formatação de Texto');
  });

  it('renderiza grid de cards para exemplos simples', () => {
    const multipleExamples = [baseTextExample, { ...baseTextExample, title: 'Exemplo 2' }];
    render(<FormatGuide type="texto" examples={multipleExamples} />);
    
    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(2);
  });

  it('mantém acessibilidade com landmarks e labels apropriados', () => {
    render(<FormatGuide type="texto" examples={[baseTextExample]} />);
    
    // Verifica seção principal
    expect(screen.getByRole('region')).toBeInTheDocument();
    
    // Verifica heading hierarquia
    const mainHeading = screen.getByRole('heading', { level: 2 });
    expect(mainHeading).toHaveAttribute('id', 'format-guide-title');
    
    // Verifica relação aria-labelledby
    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('aria-labelledby', 'format-guide-title');
    
    // Verifica cards individuais
    const card = screen.getByRole('article');
    const cardTitle = screen.getByRole('heading', { level: 3 });
    expect(cardTitle).toHaveAttribute('id', 'example-0-title');
    expect(card).toHaveAttribute('aria-labelledby', 'example-0-title');
  });
});