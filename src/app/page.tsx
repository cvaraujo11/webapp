"use client";

import React from 'react';
// Remova esta importação -> import { Button } from "'components/ui/button'" (see below for file content);
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image"; // Mantenha esta

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12"> {/* Comentário removido daqui */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        {/* Badge */}
        {/* Atualizado com novas variáveis de cor */}
        <div className="animate-appear inline-flex items-center rounded-full border border-[var(--color-border)] px-4 py-1.5 text-sm font-medium mb-8 bg-[var(--color-surface)]/80 text-[var(--color-primary)] shadow-sm">
          <span>Plataforma de Conhecimento</span>
        </div>

        {/* Main Title */}
        {/* Removido gradiente de texto, usando cor foreground e tamanho proeminente */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[var(--color-foreground)]">
          Bem-vindo à Aplicação Web
        </h1>

        {/* Subtitle */}
        {/* Atualizado com nova variável de cor */}
        <p className="text-xl md:text-2xl font-medium text-[var(--color-text-light)] mb-6">
          Seu Guia para Editais e Políticas
        </p>

        {/* Description */}
        {/* Atualizado com nova variável de cor */}
        <p className="text-md md:text-lg text-[var(--color-text-light)] max-w-2xl mb-10">
          Uma plataforma desenvolvida especialmente para jovens e comunidades tradicionais,
          facilitando o acesso a informações essenciais de forma clara e acessível.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          {/* Botão Primário Atualizado */}
          <a
            href="/modulo/ferramentas"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-lg font-medium text-white bg-[var(--color-primary)] rounded-md shadow-md hover:bg-[var(--color-primary-dark)] transition-all duration-300 transform hover:scale-105"
          >
            Acessar Módulo 1: Ferramentas Essenciais
            <ArrowRightIcon className="h-5 w-5" />
          </a>

          {/* Botão Secundário (Outline) Atualizado */}
          <a
            href="/sobre" // Assumindo que existe uma página /sobre
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)]/10 transition-colors duration-200"
          >
            Sobre o Projeto
          </a>
        </div>

        {/* Decorative Image/Card */}
        <div className="relative w-full max-w-2xl mt-4 border border-[var(--color-border)] rounded-xl p-6 bg-[var(--color-surface)] shadow-sm"> {/* Adicionado fundo surface e borda */}
          {/* Removido gradiente de fundo absoluto */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              {/* Círculo do Ícone Atualizado */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                {/* Ícone SVG Atualizado */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-12 h-12 text-[var(--color-primary)]"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              {/* Textos do Card Atualizados */}
              <h3 className="text-lg font-medium text-[var(--color-foreground)]">Conhecimento Acessível</h3>
              <p className="text-sm text-[var(--color-text-light)]">Informações simplificadas para facilitar seu acesso a oportunidades</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* Atualizado com nova variável de cor */}
      <div className="mt-auto pt-12 text-center text-[var(--color-text-light)] text-sm">
        <p>© 2025 Semente de Projeto • Desenvolvido para comunidades</p> {/* Atualizado o ano */}
      </div>
    </div>
  );
}
