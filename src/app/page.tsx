"use client";

import React from 'react';
import { ArrowRightIcon, InfoIcon, BookOpenIcon, SearchIcon, FileTextIcon, HeartIcon } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      {/* Hero Section com ilustração culturalmente relevante */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center mb-12">
        {/* Badge */}
        <div className="animate-appear inline-flex items-center rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium mb-8 bg-[var(--color-surface)]/80 text-[var(--color-primary)] shadow-sm">
          <span>Plataforma de Conhecimento</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-foreground)]">
          Bem-vindo à Aplicação Web
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-medium text-[var(--color-text-light)] mb-6">
          Seu Guia para Editais e Políticas
        </p>

        {/* Description */}
        <p className="text-md md:text-lg text-[var(--color-text-light)] max-w-2xl mb-10">
          Uma plataforma desenvolvida especialmente para jovens e comunidades tradicionais,
          facilitando o acesso a informações essenciais de forma clara e acessível.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {/* Botão Primário */}
          <a
            href="/modulo/ferramentas"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-white bg-[var(--color-primary)] rounded-md shadow-md hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105"
          >
            Acessar Módulo 1: Ferramentas Essenciais
            <ArrowRightIcon className="h-5 w-5" />
          </a>

          {/* Botão Secundário (Outline) */}
          <a
            href="#sobre"
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)]/10 transition-colors duration-200"
          >
            Sobre o Projeto
          </a>
        </div>

        {/* Ilustração Culturalmente Relevante */}
        <div className="relative w-full max-w-3xl rounded-lg overflow-hidden border border-[var(--color-border)] shadow-md">
          <div className="aspect-[16/9] bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 flex items-center justify-center">
            {/* Placeholder para a ilustração - a ser substituída por uma imagem real culturalmente relevante */}
            <div className="p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-16 h-16 text-[var(--color-primary)]"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">Ilustração Comunidade</h3>
              <p className="text-[var(--color-text-light)]">Representação visual da diversidade e riqueza cultural das comunidades tradicionais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Acesso Rápido aos Módulos */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 text-center">Acesso Rápido aos Módulos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card Módulo 1 */}
          <a href="/modulo/ferramentas" className="flex flex-col p-6 rounded-lg border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <FileTextIcon className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Ferramentas Essenciais</h3>
            <p className="text-[var(--color-text-light)] text-sm flex-grow">Aprenda a criar e formatar documentos simples e utilize templates prontos.</p>
            <div className="mt-4 flex items-center text-[var(--color-primary)] text-sm font-medium">
              Acessar
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </div>
          </a>

          {/* Card Módulo 2 */}
          <a href="/modulo/pesquisa" className="flex flex-col p-6 rounded-lg border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <SearchIcon className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Pesquisa de Editais</h3>
            <p className="text-[var(--color-text-light)] text-sm flex-grow">Descubra onde encontrar oportunidades e como usar tecnologia para não perdê-las.</p>
            <div className="mt-4 flex items-center text-[var(--color-primary)] text-sm font-medium">
              Acessar
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </div>
          </a>

          {/* Card Módulo 3 */}
          <a href="/modulo/decifrando" className="flex flex-col p-6 rounded-lg border border-[var(--color-border)] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
              <BookOpenIcon className="h-6 w-6 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Decifrando Editais</h3>
            <p className="text-[var(--color-text-light)] text-sm flex-grow">Entenda como ler editais, conheça seus direitos e políticas públicas específicas.</p>
            <div className="mt-4 flex items-center text-[var(--color-primary)] text-sm font-medium">
              Acessar
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </div>
          </a>
        </div>
      </div>

      {/* Seção "Sobre o Projeto" */}
      <div id="sobre" className="w-full max-w-4xl mb-16 px-4 py-8 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface)] shadow-sm">
        <div className="flex items-center mb-4">
          <InfoIcon className="h-6 w-6 text-[var(--color-primary)] mr-2" />
          <h2 className="text-2xl font-bold text-[var(--color-foreground)]">Sobre o Projeto</h2>
        </div>
        
        <div className="prose prose-sm max-w-none text-[var(--color-text)]">
          <p>
            A Aplicação Web "Semente de Projeto" foi desenvolvida para auxiliar jovens e comunidades tradicionais
            a acessar oportunidades de editais, entender seus direitos e elaborar propostas de projetos de forma simples e direta.
          </p>
          
          <p>
            Nosso objetivo é democratizar o acesso a recursos e políticas públicas, fornecendo ferramentas práticas
            e conhecimento acessível para fortalecer a autonomia das comunidades na elaboração e gestão de seus próprios projetos.
          </p>
          
          <h3 className="text-lg font-semibold mt-4 mb-2">Para quem é essa plataforma?</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Jovens de comunidades tradicionais que desejam elaborar propostas para editais</li>
            <li>Lideranças comunitárias em busca de informações sobre políticas públicas</li>
            <li>Organizações locais que apoiam comunidades no acesso a recursos e oportunidades</li>
            <li>Qualquer pessoa interessada em aprender sobre elaboração de projetos comunitários</li>
          </ul>
        </div>
        
        <div className="mt-6 flex items-center text-[var(--color-primary-dark)]">
          <HeartIcon className="h-5 w-5 mr-2" />
          <p className="text-sm font-medium">Desenvolvido com dedicação para comunidades</p>
        </div>
      </div>

      {/* Seção de Destaques/Notícias */}
      <div className="w-full max-w-4xl mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 text-center">Destaques</h2>
        
        <div className="bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/20 rounded-lg p-4">
          <p className="text-center text-[var(--color-primary)] font-medium">
            Fique atento! Em breve teremos novas funcionalidades e conteúdos.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-12 text-center text-[var(--color-text-light)] text-sm">
        <p>© 2025 Semente de Projeto • Desenvolvido para comunidades</p>
      </div>
    </div>
  );
}
