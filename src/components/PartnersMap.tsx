import React, { useState } from 'react';
import { Users, MapPin, Phone, Globe, Mail, Search, Filter } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: 'governo' | 'ong' | 'universidade' | 'movimento' | 'outro';
  description: string;
  location: string;
  region: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  services: string[];
}

interface PartnersMapProps {
  partners: Partner[];
  title?: string;
  description?: string;
}

const TypeColors = {
  governo: {
    bg: 'bg-blue-500',
    light: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  ong: {
    bg: 'bg-green-500',
    light: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  universidade: {
    bg: 'bg-purple-500',
    light: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  movimento: {
    bg: 'bg-amber-500',
    light: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200'
  },
  outro: {
    bg: 'bg-gray-500',
    light: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200'
  }
};

const PartnersMap: React.FC<PartnersMapProps> = ({
  partners,
  title = "Rede de Organizações Parceiras",
  description = "Encontre organizações que podem apoiar o seu projeto"
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  
  // Extrair regiões únicas para filtro
  const regions = Array.from(new Set(partners.map(partner => partner.region)));
  
  // Aplicar filtros
  const filteredPartners = partners.filter(partner => {
    const matchesSearch = searchTerm === '' || 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRegion = selectedRegion === null || partner.region === selectedRegion;
    const matchesType = selectedType === null || partner.type === selectedType;
    
    return matchesSearch && matchesRegion && matchesType;
  });
  
  // Encontrar parceiro selecionado
  const activePartner = selectedPartner 
    ? partners.find(p => p.id === selectedPartner) 
    : null;
  
  return (
    <div className="border border-[var(--color-border)] rounded-lg overflow-hidden bg-white">
      {/* Cabeçalho */}
      <div className="p-4 bg-[var(--color-surface)] border-b border-[var(--color-border)]">
        <div className="flex items-center mb-2">
          <Users className="w-5 h-5 text-[var(--color-primary)] mr-2" />
          <h3 className="text-lg font-medium text-[var(--color-foreground)]">{title}</h3>
        </div>
        <p className="text-sm text-[var(--color-text-light)]">{description}</p>
      </div>
      
      {/* Filtros e Busca */}
      <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-background)]">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Campo de Busca */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Buscar por nome, descrição ou serviço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-sm"
            />
          </div>
          
          {/* Filtro por Região */}
          <div className="w-full md:w-40">
            <select
              value={selectedRegion || ''}
              onChange={(e) => setSelectedRegion(e.target.value || null)}
              className="w-full p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-sm appearance-none bg-no-repeat bg-[right_0.5rem_center]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666' class='h-4 w-4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundSize: "1.5em" }}
            >
              <option value="">Todas as regiões</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          
          {/* Filtro por Tipo */}
          <div className="w-full md:w-40">
            <select
              value={selectedType || ''}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className="w-full p-2 border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] text-sm appearance-none bg-no-repeat bg-[right_0.5rem_center]"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666666' class='h-4 w-4'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundSize: "1.5em" }}
            >
              <option value="">Todos os tipos</option>
              <option value="governo">Órgão Governamental</option>
              <option value="ong">ONG / Organização Social</option>
              <option value="universidade">Universidade / Instituto</option>
              <option value="movimento">Movimento Social</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>
        
        {/* Número de resultados */}
        <div className="mt-3 text-xs text-[var(--color-text-light)]">
          {filteredPartners.length} {filteredPartners.length === 1 ? 'organização encontrada' : 'organizações encontradas'}
        </div>
      </div>
      
      {/* Mapa Visual (representação simplificada) */}
      <div className="border-b border-[var(--color-border)] p-4 bg-gray-50 flex justify-center">
        <div className="relative w-full max-w-3xl h-64 bg-[url('/images/map-brazil.svg')] bg-contain bg-center bg-no-repeat">
          {/* Representação dos pontos no mapa - normalmente seria integrado com uma biblioteca de mapas real */}
          {filteredPartners.map(partner => (
            <button
              key={partner.id}
              className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-150 ${
                partner.id === selectedPartner
                  ? `${TypeColors[partner.type].bg} ring-2 ring-white scale-150`
                  : TypeColors[partner.type].bg
              }`}
              style={{
                // Posições fictícias para demonstração - em um app real, usaríamos coordenadas geográficas
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              onClick={() => setSelectedPartner(partner.id)}
              aria-label={`Ver detalhes de ${partner.name}`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Lista de Parceiros e Detalhes */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
        {/* Lista de Parceiros */}
        <div className="md:col-span-1 h-80 overflow-y-auto border-b md:border-b-0 border-[var(--color-border)]">
          {filteredPartners.length === 0 ? (
            <div className="p-4 text-center text-[var(--color-text-light)]">
              Nenhuma organização encontrada com os filtros atuais.
            </div>
          ) : (
            <ul className="divide-y divide-[var(--color-border)]">
              {filteredPartners.map(partner => (
                <li key={partner.id}>
                  <button
                    onClick={() => setSelectedPartner(partner.id)}
                    className={`w-full text-left p-3 hover:bg-[var(--color-background)] transition-colors ${
                      partner.id === selectedPartner ? 'bg-[var(--color-background)]' : ''
                    }`}
                  >
                    <div className="flex items-start">
                      <span className={`w-3 h-3 rounded-full mt-1 mr-2 ${TypeColors[partner.type].bg}`}></span>
                      <div>
                        <h4 className="font-medium text-[var(--color-foreground)]">{partner.name}</h4>
                        <div className="flex items-center mt-1 text-xs text-[var(--color-text-light)]">
                          <MapPin className="w-3 h-3 mr-1" />
                          {partner.location} ({partner.region})
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Detalhes do Parceiro */}
        <div className="md:col-span-2 p-4 h-80 overflow-y-auto">
          {selectedPartner ? (
            <div className="animate-fadeIn">
              {activePartner && (
                <>
                  <div className="flex items-center mb-3">
                    <div className={`w-4 h-4 rounded-full ${TypeColors[activePartner.type].bg} mr-2`}></div>
                    <h4 className="text-lg font-medium text-[var(--color-foreground)]">{activePartner.name}</h4>
                  </div>
                  
                  <div className="flex items-start mb-3">
                    <MapPin className="w-4 h-4 text-[var(--color-text-light)] mt-0.5 mr-2" />
                    <div>
                      <p className="text-[var(--color-text)]">{activePartner.location}</p>
                      <p className="text-sm text-[var(--color-text-light)]">{activePartner.region}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4 text-[var(--color-text)]">{activePartner.description}</p>
                  
                  <h5 className="font-medium text-[var(--color-foreground)] mb-2">Serviços oferecidos:</h5>
                  <ul className="mb-4 space-y-1 text-sm">
                    {activePartner.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-[var(--color-primary)] mr-2">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {activePartner.contact && (
                    <div className={`p-3 rounded-lg ${TypeColors[activePartner.type].light} ${TypeColors[activePartner.type].border}`}>
                      <h5 className={`font-medium ${TypeColors[activePartner.type].text} mb-2`}>Informações de contato:</h5>
                      <ul className="space-y-2 text-sm">
                        {activePartner.contact.phone && (
                          <li className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>{activePartner.contact.phone}</span>
                          </li>
                        )}
                        {activePartner.contact.email && (
                          <li className="flex items-center">
                            <Mail className="w-4 h-4 mr-2" />
                            <a href={`mailto:${activePartner.contact.email}`} className="text-blue-600 hover:underline">
                              {activePartner.contact.email}
                            </a>
                          </li>
                        )}
                        {activePartner.contact.website && (
                          <li className="flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            <a href={activePartner.contact.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {activePartner.contact.website.replace(/^https?:\/\//, '')}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Users className="w-12 h-12 text-[var(--color-text-light)] mb-3 opacity-50" />
              <h4 className="text-lg font-medium text-[var(--color-foreground)] mb-2">Selecione uma organização</h4>
              <p className="text-sm text-[var(--color-text-light)] max-w-md">
                Clique em uma organização na lista ou no mapa para ver mais detalhes e informações de contato.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnersMap; 