'use client';

import React from 'react';
import PageTemplate from '@/components/PageTemplate';
import ContentCard from '@/components/ContentCard';
import FlexGrid from '@/components/FlexGrid';
import ChecklistItem from '@/components/ChecklistItem';
import DownloadButton from '@/components/DownloadButton';
import GlossaryTerm from '@/components/GlossaryTerm';
import AccordionItem from '@/components/AccordionItem';
import ImageGallery from '@/components/ImageGallery';
import { useState } from 'react';

const ExamplePage = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    item1: false,
    item2: false,
    item3: false,
  });

  const handleCheckChange = (id: string, checked: boolean) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  // Dados de exemplo para a galeria de imagens
  const exampleImages = [
    { src: 'https://via.placeholder.com/600x400/3498db/ffffff?text=Imagem+1', alt: 'Imagem de exemplo 1', caption: 'Descrição da imagem 1' },
    { src: 'https://via.placeholder.com/600x400/e74c3c/ffffff?text=Imagem+2', alt: 'Imagem de exemplo 2', caption: 'Descrição da imagem 2' },
    { src: 'https://via.placeholder.com/600x400/2ecc71/ffffff?text=Imagem+3', alt: 'Imagem de exemplo 3', caption: 'Descrição da imagem 3' },
    { src: 'https://via.placeholder.com/600x400/f39c12/ffffff?text=Imagem+4', alt: 'Imagem de exemplo 4', caption: 'Descrição da imagem 4' },
    { src: 'https://via.placeholder.com/600x400/9b59b6/ffffff?text=Imagem+5', alt: 'Imagem de exemplo 5', caption: 'Descrição da imagem 5' },
    { src: 'https://via.placeholder.com/600x400/1abc9c/ffffff?text=Imagem+6', alt: 'Imagem de exemplo 6', caption: 'Descrição da imagem 6' },
  ];

  // Breadcrumbs de exemplo
  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Exemplos', href: '/exemplo' },
  ];

  return (
    <PageTemplate 
      title="Página de Exemplo" 
      description="Esta página demonstra os componentes implementados na Fase 2 do projeto."
      variant="default"
      animate={true}
      breadcrumbs={breadcrumbs}
    >
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Sistema de Grid Flexível</h2>
        <p className="mb-6">Abaixo estão exemplos de diferentes layouts de grid que podem ser usados na aplicação:</p>
        
        <h3 className="text-xl font-semibold mb-3">Grid Padrão (3 colunas)</h3>
        <FlexGrid columns={3} gap="md" className="mb-8">
          <ContentCard title="Card 1">
            <p>Conteúdo do card 1 com texto de exemplo para demonstrar como o conteúdo é exibido.</p>
          </ContentCard>
          <ContentCard title="Card 2">
            <p>Conteúdo do card 2 com texto de exemplo para demonstrar como o conteúdo é exibido.</p>
          </ContentCard>
          <ContentCard title="Card 3">
            <p>Conteúdo do card 3 com texto de exemplo para demonstrar como o conteúdo é exibido.</p>
          </ContentCard>
        </FlexGrid>
        
        <h3 className="text-xl font-semibold mb-3">Grid Bento (Layout Dinâmico)</h3>
        <FlexGrid variant="bento" columns={3} gap="md" className="mb-8">
          <ContentCard title="Card Destaque">
            <p>Este card pode ocupar mais espaço no layout bento, dependendo da sua posição.</p>
          </ContentCard>
          <ContentCard title="Card Normal">
            <p>Card de tamanho normal no layout bento.</p>
          </ContentCard>
          <ContentCard title="Card Normal">
            <p>Card de tamanho normal no layout bento.</p>
          </ContentCard>
          <ContentCard title="Card Normal">
            <p>Card de tamanho normal no layout bento.</p>
          </ContentCard>
          <ContentCard title="Card Destaque">
            <p>Este card pode ocupar mais espaço no layout bento, dependendo da sua posição.</p>
          </ContentCard>
        </FlexGrid>
        
        <h3 className="text-xl font-semibold mb-3">Grid Destaque (Primeiro Item em Destaque)</h3>
        <FlexGrid variant="featured" gap="md" className="mb-8">
          <ContentCard title="Card Principal em Destaque">
            <p>Este é o card principal que ocupa toda a largura no topo do grid.</p>
          </ContentCard>
          <ContentCard title="Card Secundário 1">
            <p>Card secundário que ocupa metade da largura.</p>
          </ContentCard>
          <ContentCard title="Card Secundário 2">
            <p>Card secundário que ocupa metade da largura.</p>
          </ContentCard>
        </FlexGrid>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Componentes Interativos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">ChecklistItem</h3>
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <ChecklistItem 
                id="item1" 
                label="Item de checklist 1" 
                description="Descrição do item 1 com detalhes adicionais."
                checked={checkedItems.item1}
                onChange={(checked) => handleCheckChange('item1', checked)}
              />
              <ChecklistItem 
                id="item2" 
                label="Item de checklist 2" 
                description="Descrição do item 2 com detalhes adicionais."
                checked={checkedItems.item2}
                onChange={(checked) => handleCheckChange('item2', checked)}
              />
              <ChecklistItem 
                id="item3" 
                label="Item de checklist 3" 
                description="Descrição do item 3 com detalhes adicionais."
                checked={checkedItems.item3}
                onChange={(checked) => handleCheckChange('item3', checked)}
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">DownloadButton</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <DownloadButton 
                fileName="exemplo.pdf" 
                label="Download do Arquivo" 
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-3">GlossaryTerm</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <p>
                Este é um exemplo de um texto com um 
                <GlossaryTerm term="Termo do Glossário" definition="Esta é a definição detalhada do termo do glossário que aparece quando o usuário passa o mouse sobre o termo.">
                  termo do glossário
                </GlossaryTerm> 
                incorporado. Passe o mouse sobre o termo para ver sua definição.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-3">AccordionItem</h3>
            <div className="p-4 bg-muted/30 rounded-lg">
              <AccordionItem value="item1" title="Item de Acordeão 1">
                <p>Este é o conteúdo do primeiro item do acordeão. Ele pode conter qualquer tipo de conteúdo, incluindo texto, imagens, e outros componentes.</p>
              </AccordionItem>
              <AccordionItem value="item2" title="Item de Acordeão 2">
                <p>Este é o conteúdo do segundo item do acordeão. Clique no título para expandir ou recolher o conteúdo.</p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Galeria de Imagens</h2>
        <ImageGallery images={exampleImages} columns={3} />
      </section>
    </PageTemplate>
  );
};

export default ExamplePage;
