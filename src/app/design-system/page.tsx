'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ProgressiveImage from '@/components/ui/ProgressiveImage';
import DescriptiveImage from '@/components/ui/DescriptiveImage';
import AccessibilityMenu from '@/components/ui/AccessibilityMenu';
import { getLowQualityImageUrl } from '@/lib/image-utils';
import { useHighContrast } from '@/lib/hooks/useHighContrast';

export default function DesignSystemPage() {
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Design System</h1>
        <p className="text-muted-foreground">
          Documentação de componentes, cores e estilos para o projeto Semente
        </p>
      </div>
      
      <Tabs defaultValue="colors">
        <TabsList className="mb-6">
          <TabsTrigger value="colors">Cores</TabsTrigger>
          <TabsTrigger value="typography">Tipografia</TabsTrigger>
          <TabsTrigger value="components">Componentes</TabsTrigger>
          <TabsTrigger value="accessibility">Acessibilidade</TabsTrigger>
        </TabsList>
        
        {/* Cores */}
        <TabsContent value="colors" className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Paleta de Cores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Cores Primárias</h3>
                <div className="space-y-3">
                  <ColorSwatch color="#2E7D32" name="Primary" variable="--color-primary" />
                  <ColorSwatch color="#388E3C" name="Primary Dark" variable="--color-primary-dark" />
                  <ColorSwatch color="#4CAF50" name="Primary Light" variable="--color-primary-light" />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Cores de Destaque</h3>
                <div className="space-y-3">
                  <ColorSwatch color="#FFC107" name="Accent" variable="--color-accent" />
                  <ColorSwatch color="#FFD54F" name="Accent Light" variable="--color-accent-light" />
                  <ColorSwatch color="#FFA000" name="Accent Dark" variable="--color-accent-dark" />
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Tons Neutros</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ColorSwatch color="#F5F5F5" name="Neutral 50" variable="--color-neutral-50" />
                <ColorSwatch color="#EEEEEE" name="Neutral 100" variable="--color-neutral-100" />
                <ColorSwatch color="#E0E0E0" name="Neutral 200" variable="--color-neutral-200" />
                <ColorSwatch color="#BDBDBD" name="Neutral 300" variable="--color-neutral-300" />
                <ColorSwatch color="#9E9E9E" name="Neutral 400" variable="--color-neutral-400" />
                <ColorSwatch color="#757575" name="Neutral 500" variable="--color-neutral-500" />
                <ColorSwatch color="#616161" name="Neutral 600" variable="--color-neutral-600" />
                <ColorSwatch color="#424242" name="Neutral 700" variable="--color-neutral-700" />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Status e Feedback</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <ColorSwatch color="#28a745" name="Success" variable="--color-success" />
                <ColorSwatch color="#dc3545" name="Error" variable="--color-error" />
                <ColorSwatch color="#ffc107" name="Warning" variable="--color-warning" />
                <ColorSwatch color="#17a2b8" name="Info" variable="--color-info" />
              </div>
            </div>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Uso das Cores</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Diretrizes</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Use a cor primária para elementos principais de navegação e ações.</li>
                  <li>A cor de destaque (accent) deve ser usada para chamar atenção para elementos importantes.</li>
                  <li>Mantenha um bom contraste entre texto e fundo (mínimo 4.5:1 para texto normal).</li>
                  <li>Cores de status devem ser usadas consistentemente em todo o aplicativo.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Modo de Alto Contraste</h3>
                <p className="text-sm mb-3">
                  O sistema suporta um modo de alto contraste para melhorar a acessibilidade.
                  Ative o modo de alto contraste para ver as cores adaptadas:
                </p>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={toggleHighContrast}
                    className="px-3 py-1.5 bg-primary text-white rounded-md text-sm"
                  >
                    {isHighContrast ? 'Desativar' : 'Ativar'} Alto Contraste
                  </button>
                  
                  <div className="text-sm text-neutral-500">
                    Status: {isHighContrast ? 'Ativado' : 'Desativado'}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
        
        {/* Tipografia */}
        <TabsContent value="typography" className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Tipografia</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Fonte Principal</h3>
                <p className="mb-2">Inter (sans-serif)</p>
                
                <div className="space-y-3 mt-4">
                  <div>
                    <div className="text-4xl font-normal">Aa</div>
                    <div className="text-sm text-neutral-500 mt-1">Normal (400)</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-medium">Aa</div>
                    <div className="text-sm text-neutral-500 mt-1">Medium (500)</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-semibold">Aa</div>
                    <div className="text-sm text-neutral-500 mt-1">Semibold (600)</div>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold">Aa</div>
                    <div className="text-sm text-neutral-500 mt-1">Bold (700)</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Hierarquia</h3>
                
                <div className="space-y-4">
                  <div>
                    <h1 className="text-4xl font-bold">Título H1</h1>
                    <div className="text-sm text-neutral-500 mt-1">4xl (2.5rem/40px)</div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-semibold">Título H2</h2>
                    <div className="text-sm text-neutral-500 mt-1">3xl (1.875rem/30px)</div>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold">Título H3</h3>
                    <div className="text-sm text-neutral-500 mt-1">2xl (1.5rem/24px)</div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium">Título H4</h4>
                    <div className="text-sm text-neutral-500 mt-1">xl (1.25rem/20px)</div>
                  </div>
                  
                  <div>
                    <h5 className="text-lg font-medium">Título H5</h5>
                    <div className="text-sm text-neutral-500 mt-1">lg (1.125rem/18px)</div>
                  </div>
                  
                  <div>
                    <h6 className="text-base font-medium">Título H6</h6>
                    <div className="text-sm text-neutral-500 mt-1">base (1rem/16px)</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-3">Texto</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-base">Texto base (1rem/16px)</p>
                  <div className="text-sm text-neutral-500 mt-1">Para a maioria do conteúdo</div>
                </div>
                
                <div>
                  <p className="text-sm">Texto pequeno (0.875rem/14px)</p>
                  <div className="text-sm text-neutral-500 mt-1">Para informações secundárias</div>
                </div>
                
                <div>
                  <p className="text-xs">Texto extra pequeno (0.75rem/12px)</p>
                  <div className="text-sm text-neutral-500 mt-1">Para legendas e informações auxiliares</div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
        
        {/* Componentes */}
        <TabsContent value="components" className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Componentes</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Imagens</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-2">ProgressiveImage</h4>
                    <ProgressiveImage
                      src="/design-system/sample-image.jpg"
                      lowQualitySrc={getLowQualityImageUrl("/design-system/sample-image.jpg")}
                      alt="Exemplo de imagem progressiva"
                      width={400}
                      height={250}
                      className="rounded-md"
                    />
                    <p className="text-sm text-neutral-500 mt-2">
                      Componente que carrega uma versão de baixa qualidade primeiro e faz transição para a versão completa.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">DescriptiveImage</h4>
                    <DescriptiveImage
                      src="/design-system/sample-image.jpg"
                      alt="Exemplo de imagem com descrição"
                      detailedDescription="Esta é uma descrição detalhada da imagem para melhor acessibilidade e compreensão por usuários com leitores de tela."
                      caption="Imagem com descrição detalhada acessível"
                      width={400}
                      height={250}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Controles de Interface</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-medium mb-2">AccessibilityMenu</h4>
                    <div className="p-4 border rounded-md bg-neutral-50">
                      <AccessibilityMenu className="inline-block" />
                      <p className="text-sm text-neutral-500 mt-2">
                        Menu de acessibilidade para configurações como alto contraste e tamanho da fonte.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium mb-2">Botões</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-primary text-white rounded-md">
                        Primário
                      </button>
                      <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md">
                        Secundário
                      </button>
                      <button className="px-4 py-2 border border-input bg-background rounded-md">
                        Terciário
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
        
        {/* Acessibilidade */}
        <TabsContent value="accessibility" className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Diretrizes de Acessibilidade</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Requisitos Mínimos</h3>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Contraste:</strong> Todo o texto atende ao nível AA do WCAG 2.1 
                    (contraste mínimo de 4.5:1 para texto normal, 3:1 para texto grande)
                  </li>
                  <li>
                    <strong>Navegação por teclado:</strong> Todos os componentes interativos 
                    são navegáveis via teclado
                  </li>
                  <li>
                    <strong>Alternativas em texto:</strong> Todas as imagens têm texto alternativo
                  </li>
                  <li>
                    <strong>Redução de movimento:</strong> Animações respeitam a 
                    preferência "prefers-reduced-motion"
                  </li>
                  <li>
                    <strong>Tamanho de texto:</strong> O texto pode ser redimensionado em até 200% 
                    sem perda de funcionalidade
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Recursos Implementados</h3>
                
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Modo de alto contraste:</strong> Cores adaptadas para maior visibilidade
                  </li>
                  <li>
                    <strong>Skip links:</strong> Permitem pular para o conteúdo principal
                  </li>
                  <li>
                    <strong>Carregamento progressivo:</strong> Redução de distrações visuais
                  </li>
                  <li>
                    <strong>Descrições detalhadas:</strong> Para imagens e elementos visuais
                  </li>
                  <li>
                    <strong>Navegação por teclado aprimorada:</strong> Hooks personalizados para 
                    navegação por teclado
                  </li>
                  <li>
                    <strong>Anúncios live region:</strong> Para notificar usuários de leitores 
                    de tela sobre mudanças
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de Amostra de Cor
function ColorSwatch({ color, name, variable }: { color: string; name: string; variable: string }) {
  return (
    <div className="flex items-center">
      <div 
        className="w-12 h-12 rounded mr-3 border border-gray-300 flex-shrink-0"
        style={{ backgroundColor: color }}
        role="img"
        aria-label={`Cor ${name}: ${color}`}
      />
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-xs text-neutral-500">{color}</div>
        <div className="text-xs text-neutral-500">{variable}</div>
      </div>
    </div>
  );
} 